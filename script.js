document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const itemForm = document.getElementById('item-form');
    const itemNameInput = document.getElementById('item-name');
    const itemPriceInput = document.getElementById('item-price');
    const itemQtdInput = document.getElementById('item-qtd');
    const itemsList = document.getElementById('items-list');
    const totalPriceEl = document.getElementById('total-price');
    const totalItemsEl = document.getElementById('total-items');
    const budgetInput = document.getElementById('budget');
    const budgetProgress = document.getElementById('budget-progress');
    
    // Group Mode
    const groupModeToggle = document.getElementById('group-mode-toggle');
    const globalDivisorContainer = document.getElementById('global-divisor-container');
    const globalDivisorInput = document.getElementById('global-divisor');
    const myShareContainer = document.getElementById('my-share-container');
    const mySharePriceEl = document.getElementById('my-share-price');
    
    // PDF
    const pdfBtn = document.getElementById('pdf-btn');
    
    // Tema, Abas e Rodapé
    const themeToggleBtn = document.getElementById('theme-toggle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const appFooter = document.getElementById('app-footer');
    const budgetSection = document.getElementById('header-budget-section');

    // Histórico
    const finishBtn = document.getElementById('finish-btn');

    // IA
    const aiConnectBtn = document.getElementById('ai-connect-btn');
    const aiGenerateBtn = document.getElementById('ai-generate-btn');
    const aiHelpBtn = document.getElementById('ai-help-btn');
    const aiHelpContent = document.getElementById('ai-help-content');
    const aiModal = document.getElementById('ai-modal');
    const closeAiModalBtn = document.getElementById('close-ai-modal');
    const saveAiKeyBtn = document.getElementById('save-ai-key');
    const aiKeyInput = document.getElementById('ai-key-input');
    const recipesListEl = document.getElementById('recipes-list');
    const aiStatus = document.getElementById('ai-status');

    // === ESTADO DA APLICAÇÃO ===
    let items = JSON.parse(localStorage.getItem('market_items')) || [];
    let savedBudget = localStorage.getItem('market_budget') || '';
    let purchaseHistory = JSON.parse(localStorage.getItem('purchase_history')) || [];
    let isGroupMode = localStorage.getItem('market_group_mode') === 'true';
    let globalDivisor = parseInt(localStorage.getItem('market_global_divisor')) || 1;
    
    if(savedBudget) budgetInput.value = savedBudget;

    // === INICIALIZAÇÃO MODO GRUPO ===
    groupModeToggle.checked = isGroupMode;
    globalDivisorInput.value = globalDivisor;
    if (isGroupMode) globalDivisorContainer.style.display = 'flex';
    
    groupModeToggle.addEventListener('change', (e) => {
        isGroupMode = e.target.checked;
        localStorage.setItem('market_group_mode', isGroupMode);
        globalDivisorContainer.style.display = isGroupMode ? 'flex' : 'none';
        updateUI();
    });
    
    globalDivisorInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        globalDivisor = val;
        localStorage.setItem('market_global_divisor', globalDivisor);
        updateUI();
    });
    
    window.updateItemDivisor = (id, value) => {
        let val = parseInt(value);
        if (isNaN(val) || val < 1) val = 1;
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index].customDivisor = val;
            updateUI();
        }
    };

    // === GERENCIAMENTO DE TEMA ===
    const iconMoon = themeToggleBtn.querySelector('.icon-moon');
    const iconSun = themeToggleBtn.querySelector('.icon-sun');
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        iconMoon.style.display = 'none';
        iconSun.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        iconMoon.style.display = isDark ? 'block' : 'none';
        iconSun.style.display = isDark ? 'none' : 'block';
    });

    // === GERENCIAMENTO DE ABAS ===
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            
            if (targetId === 'tab-recipes') {
                appFooter.style.display = 'none';
                budgetSection.style.display = 'none';
            } else {
                appFooter.style.display = 'block';
                budgetSection.style.display = 'block';
            }
        });
    });

    // === HELPERS DE FORMATAÇÃO ===
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    // === FUNÇÕES DE HISTÓRICO ===
    const getHistoricalPriceInfo = (productName, currentPrice) => {
        if (!purchaseHistory.length) return null;
        
        const normalizedName = normalizeString(productName);
        let lastPrice = null;
        let lastDate = null;

        // Procura no histórico, do mais recente para o mais antigo
        for (let i = purchaseHistory.length - 1; i >= 0; i--) {
            const histList = purchaseHistory[i].items;
            const itemMatch = histList.find(hi => normalizeString(hi.name) === normalizedName);
            if (itemMatch) {
                lastPrice = itemMatch.price;
                lastDate = new Date(purchaseHistory[i].date).toLocaleDateString('pt-BR');
                break;
            }
        }

        if (!lastPrice || lastPrice === currentPrice) return null;

        const diff = currentPrice - lastPrice;
        if (diff > 0) {
            return { class: 'expensive', text: `📈 +${formatCurrency(diff)} desde ${lastDate}` };
        } else {
            return { class: 'cheaper', text: `📉 ${formatCurrency(diff)} desde ${lastDate}` }; // diff já é negativo
        }
    };

    finishBtn.addEventListener('click', () => {
        if (items.length === 0) {
            alert('Adicione itens ao carrinho antes de salvar.');
            return;
        }
        if(confirm('Isso salvará os preços atuais no Histórico e limpará o carrinho. Confirmar?')) {
            purchaseHistory.push({ date: new Date().toISOString(), items: [...items] });
            localStorage.setItem('purchase_history', JSON.stringify(purchaseHistory));
            items = [];
            updateUI();
            alert('Compra salva no histórico com sucesso!');
        }
    });

    // === INTERFACE DO CARRINHO ===
    const updateBudgetStatus = (amountToCompare) => {
        const budget = parseFloat(budgetInput.value);
        const targetEl = isGroupMode ? mySharePriceEl : totalPriceEl;
        
        totalPriceEl.classList.remove('over-budget');
        mySharePriceEl.classList.remove('over-budget');

        if (isNaN(budget) || budget <= 0) {
            budgetProgress.style.width = '0%';
            return;
        }
        const percentage = Math.min((amountToCompare / budget) * 100, 100);
        budgetProgress.style.width = `${percentage}%`;

        if (amountToCompare > budget) {
            budgetProgress.style.backgroundColor = 'var(--danger)';
            targetEl.classList.add('over-budget');
        } else if (amountToCompare > budget * 0.8) {
            budgetProgress.style.backgroundColor = 'var(--warning)';
        } else {
            budgetProgress.style.backgroundColor = 'var(--success)';
        }
    };

    const updateUI = () => {
        itemsList.innerHTML = '';
        let totalAmount = 0;
        let myShareAmount = 0;
        let totalQtd = 0;

        items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            totalQtd += Number.isInteger(item.quantity) ? item.quantity : 1;
            
            const currentDivisor = item.customDivisor || globalDivisor;
            const itemShare = itemTotal / currentDivisor;
            myShareAmount += itemShare;

            const li = document.createElement('li');
            li.className = 'list-item';
            
            const displayQtd = Number.isInteger(item.quantity) ? item.quantity : item.quantity.toFixed(3).replace(/\.?0+$/, '');
            
            // Lógica de badge de histórico
            const histInfo = getHistoricalPriceInfo(item.name, item.price);
            const badgeHTML = histInfo ? `<span class="price-badge ${histInfo.class}">${histInfo.text}</span>` : '';

            let divisorHTML = '';
            let shareInfoHTML = '';
            
            if (isGroupMode) {
                divisorHTML = `
                    <div class="item-divisor-wrapper">
                        <label>Dividir por:</label>
                        <input type="number" min="1" step="1" value="${currentDivisor}" onchange="updateItemDivisor('${item.id}', this.value)">
                    </div>
                `;
                shareInfoHTML = `<span class="item-total-share">Sua parte: ${formatCurrency(itemShare)}</span>`;
            }

            li.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">${displayQtd}x ${formatCurrency(item.price)} ${badgeHTML}</div>
                    ${divisorHTML}
                </div>
                <div style="text-align: right;">
                    <div class="item-total">${formatCurrency(itemTotal)}</div>
                    ${shareInfoHTML}
                </div>
                <button class="btn-delete" onclick="removeItem('${item.id}')" aria-label="Remover">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            `;
            itemsList.appendChild(li);
        });

        totalPriceEl.textContent = formatCurrency(totalAmount);
        totalItemsEl.textContent = totalQtd;
        
        if (isGroupMode) {
            myShareContainer.style.display = 'flex';
            mySharePriceEl.textContent = formatCurrency(myShareAmount);
            updateBudgetStatus(myShareAmount);
        } else {
            myShareContainer.style.display = 'none';
            updateBudgetStatus(totalAmount);
        }
        
        localStorage.setItem('market_items', JSON.stringify(items));
    };

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = itemNameInput.value.trim();
        const price = parseFloat(itemPriceInput.value);
        const quantity = parseFloat(itemQtdInput.value);

        if (name && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
            items.push({ id: Date.now().toString(), name, price, quantity });
            updateUI();
            itemNameInput.value = ''; itemPriceInput.value = ''; itemQtdInput.value = '1';
            itemNameInput.focus();
        }
    });

    window.removeItem = (id) => {
        items = items.filter(item => item.id !== id);
        updateUI();
    };

    budgetInput.addEventListener('input', () => {
        updateUI();
        localStorage.setItem('market_budget', budgetInput.value);
    });
    
    // === GERAÇÃO DE PDF ===
    if(pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            if (items.length === 0) {
                alert('O carrinho está vazio.');
                return;
            }

            const dateStr = new Date().toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            let rows = '';
            let totalAmount = 0;
            let myShareAmount = 0;

            items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                
                const currentDivisor = item.customDivisor || globalDivisor;
                const itemShare = itemTotal / currentDivisor;
                myShareAmount += itemShare;

                const displayQtd = Number.isInteger(item.quantity) ? item.quantity : item.quantity.toFixed(3).replace(/\.?0+$/, '');
                
                let divisorText = isGroupMode ? `<td>÷ ${currentDivisor}</td><td class="number">${formatCurrency(itemShare)}</td>` : '';

                rows += `
                    <tr>
                        <td>${item.name}</td>
                        <td class="number">${displayQtd}</td>
                        <td class="number">${formatCurrency(item.price)}</td>
                        <td class="number">${formatCurrency(itemTotal)}</td>
                        ${divisorText}
                    </tr>
                `;
            });
            
            const groupHeaders = isGroupMode ? `<th>Divisão</th><th class="number">Sua Parte</th>` : '';
            const groupTotals = isGroupMode ? `<p>Total Geral: ${formatCurrency(totalAmount)}</p><p class="highlight">Sua Parte: ${formatCurrency(myShareAmount)}</p>` : `<p class="highlight">Total: ${formatCurrency(totalAmount)}</p>`;

            const htmlContent = `
                <div class="pdf-export-container">
                    <div class="pdf-header">
                        <h1>🛒 Calc Mercado</h1>
                        <p>Comprovante de Compra - ${dateStr}</p>
                    </div>
                    <table class="pdf-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th class="number">Qtd</th>
                                <th class="number">Preço Un.</th>
                                <th class="number">Subtotal</th>
                                ${groupHeaders}
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    <div class="pdf-totals">
                        ${groupTotals}
                    </div>
                </div>
            `;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            
            const opt = {
                margin:       10,
                filename:     `compra_mercado_${new Date().getTime()}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(tempDiv).save();
        });
    }

    // === INTELIGÊNCIA ARTIFICIAL (Google Gemini) ===
    const checkApiKey = () => {
        const key = sessionStorage.getItem('gemini_api_key');
        if (key) {
            aiConnectBtn.style.display = 'none';
            if (aiHelpBtn) aiHelpBtn.style.display = 'none';
            if (aiHelpContent) aiHelpContent.style.display = 'none';
            aiGenerateBtn.style.display = 'inline-block';
            aiStatus.textContent = 'Gemini Conectado ✅';
        } else {
            aiConnectBtn.style.display = 'inline-block';
            if (aiHelpBtn) aiHelpBtn.style.display = 'inline-block';
            aiGenerateBtn.style.display = 'none';
            aiStatus.textContent = '';
        }
    };

    if (aiHelpBtn && aiHelpContent) {
        aiHelpBtn.addEventListener('click', () => {
            if (aiHelpContent.style.display === 'none') {
                aiHelpContent.style.display = 'block';
            } else {
                aiHelpContent.style.display = 'none';
            }
        });
    }

    aiConnectBtn.addEventListener('click', () => { aiModal.style.display = 'flex'; });
    closeAiModalBtn.addEventListener('click', () => { aiModal.style.display = 'none'; });
    
    saveAiKeyBtn.addEventListener('click', () => {
        const val = aiKeyInput.value.trim();
        if (val) {
            sessionStorage.setItem('gemini_api_key', val);
            aiKeyInput.value = '';
            aiModal.style.display = 'none';
            checkApiKey();
        }
    });

    aiGenerateBtn.addEventListener('click', async () => {
        const key = sessionStorage.getItem('gemini_api_key');
        if (!key) return;
        
        if (items.length === 0) {
            alert("Adicione alguns itens no carrinho primeiro!");
            return;
        }

        const ingredientsList = items.map(i => i.name).join(", ");
        aiGenerateBtn.disabled = true;
        aiGenerateBtn.textContent = 'Pensando... 🧠';
        recipesListEl.innerHTML = ''; // Clear previous

        console.log(`Solicitando receita com Gemini para: ${ingredientsList}`);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Você é um mestre cuca criativo. Aqui estão os ingredientes que tenho no carrinho: ${ingredientsList}. Sugira uma receita criativa e deliciosa usando a maioria deles. Responda em texto simples com Nome da Receita, Ingredientes necessários e o Modo de Preparo. Separe as seções de forma visualmente limpa.`
                        }]
                    }]
                })
            });

            console.log(`Resposta Gemini Status: ${response.status}`);
            if(!response.ok) throw new Error(`Falha na API: ${response.status} - ${response.statusText}`);
            const data = await response.json();
            
            const recipeText = data.candidates[0].content.parts[0].text;
            console.log("Receita recebida com sucesso!");
            
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.textContent = recipeText; 
            recipesListEl.appendChild(card);

        } catch (error) {
            console.error(`Erro ao conectar com a IA: ${error}`);
            alert("Erro ao conectar com a IA. Verifique o Debugger.");
            sessionStorage.removeItem('gemini_api_key');
            checkApiKey();
        } finally {
            aiGenerateBtn.disabled = false;
            aiGenerateBtn.textContent = '🧠 Gerar Outra Receita';
        }
    });

    // Inicia a aplicação
    updateUI();
    checkApiKey();
});
