const COLUMNS = [
    "Worker (Full Name)", "Employee ID", "Enterprise ID", "Hire Date",
    "Enterprise ID Status", "Maquina", "Chamado", "Serial bipado", "SERIAL",
    "Nota Fiscal / Declaração", "Analista", "Location", "PC Configuration Location",
    "Status Equipamento", "Refletiu no FNMS?", "Entrega", "Horario Agendamento",
    "DATA Agendamento", "Absorção de contractor", "Home Office", "Transporte",
    "CPF", "Cargo Folha", "E-mail pessoal", "Mobile Phone", "Cost Center Code",
    "Address 1", "City of residence", "State/Province of residence", "CEP"
];

document.addEventListener('DOMContentLoaded', () => {
    const emptyState     = document.getElementById('empty-state');
    const resultsContainer = document.getElementById('results');
    const actionBar      = document.getElementById('action-bar');
    const clearBtn       = document.getElementById('clear-btn');
    const resultsCount   = document.getElementById('results-count');
    const searchInput    = document.getElementById('search-input');
    const noResultsMsg   = document.getElementById('no-results-msg');
    const searchTerm     = document.getElementById('search-term');

    // Modal elements
    const modalOverlay   = document.getElementById('modal-overlay');
    const modalContent   = document.getElementById('modal-content');
    const modalClose     = document.getElementById('modal-close');
    const modalCancel    = document.getElementById('modal-cancel');
    const modalConfirm   = document.getElementById('modal-confirm');

    let pendingTemplate  = '';
    let pendingExcelStr  = '';
    let pendingExcelInput = null;
    let pendingExcelContainer = null;
    let pendingGenerateBtn = null;

    // ── Modal logic ──
    function openModal(template, excelStr, excelInput, excelContainer, generateBtn) {
        pendingTemplate       = template;
        pendingExcelStr       = excelStr;
        pendingExcelInput     = excelInput;
        pendingExcelContainer = excelContainer;
        pendingGenerateBtn    = generateBtn;
        modalContent.textContent = template;
        modalOverlay.classList.remove('hidden');
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        pendingTemplate = '';
    }

    modalClose.onclick  = closeModal;
    modalCancel.onclick = closeModal;
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

    modalConfirm.onclick = () => {
        navigator.clipboard.writeText(pendingTemplate).then(() => {
            if (pendingGenerateBtn) {
                const orig = pendingGenerateBtn.textContent;
                pendingGenerateBtn.textContent = 'Solicitação Copiada! ✓';
                setTimeout(() => pendingGenerateBtn.textContent = orig, 2000);
            }
            if (pendingExcelInput && pendingExcelContainer) {
                pendingExcelInput.value = pendingExcelStr;
                pendingExcelContainer.classList.remove('hidden');
            }
        });
        closeModal();
    };

    // ── Search / filter ──
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        const cards = resultsContainer.querySelectorAll('.row-card');
        let visible = 0;
        cards.forEach(card => {
            const name = card.dataset.name || '';
            const match = !q || name.toLowerCase().includes(q);
            card.classList.toggle('hidden-by-search', !match);
            if (match) visible++;
        });
        noResultsMsg.style.display = (q && visible === 0) ? 'block' : 'none';
        searchTerm.textContent = q;
    });

    // ── Clear ──
    clearBtn.addEventListener('click', () => {
        resultsContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        actionBar.classList.add('hidden');
        searchInput.value = '';
        noResultsMsg.style.display = 'none';
    });

    // ── Paste listener ──
    document.addEventListener('paste', (event) => {
        // Don't intercept if user is typing in the search box
        if (document.activeElement === searchInput) return;
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        if (!pastedText) return;
        processPastedData(pastedText);
    });

    function processPastedData(text) {
        const allRows = text.trim().split(/\r?\n/).filter(row => row.trim() !== '');
        if (allRows.length === 0) return;

        // ── Auto-detect header ──
        let columnOrder = COLUMNS;
        let dataRows = allRows;
        let headerDetected = false;

        const firstRowCells = allRows[0].split('\t').map(c => c.trim());
        const matchCount = firstRowCells.filter(cell => COLUMNS.includes(cell)).length;

        if (matchCount >= 3) {
            columnOrder = firstRowCells;
            dataRows = allRows.slice(1);
            headerDetected = true;
        }

        if (dataRows.length === 0) return;

        // ── Filter by Transporte ──
        const transporteIndex = columnOrder.indexOf('Transporte');
        const filteredRows = dataRows.filter(row => {
            if (transporteIndex === -1) return true;
            const cells = row.split('\t');
            const val = cells[transporteIndex] ? cells[transporteIndex].trim() : '';
            return val !== '';
        });

        const totalRows   = dataRows.length;
        const filteredCount = filteredRows.length;
        const skippedCount  = totalRows - filteredCount;

        emptyState.classList.add('hidden');
        actionBar.classList.remove('hidden');
        resultsContainer.innerHTML = '';
        searchInput.value = '';
        noResultsMsg.style.display = 'none';

        if (filteredCount === 0) {
            emptyState.classList.remove('hidden');
            emptyState.querySelector('h2').textContent = 'Nenhum registro com Transporte';
            emptyState.querySelector('p').textContent =
                `${totalRows} ${totalRows === 1 ? 'linha lida' : 'linhas lidas'}, nenhuma com o campo Transporte preenchido.`;
            actionBar.classList.add('hidden');
            return;
        }

        let countText = `${filteredCount} ${filteredCount === 1 ? 'registro com Transporte' : 'registros com Transporte'}`;
        if (skippedCount > 0) countText += ` · ${skippedCount} ignorado${skippedCount > 1 ? 's' : ''} (sem Transporte)`;
        if (headerDetected) countText += ' · cabeçalho detectado ✓';
        resultsCount.textContent = countText;

        filteredRows.forEach((row, index) => {
            createRowCard(row.split('\t'), index, columnOrder);
        });
    }

    function createRowCard(cells, index, columnOrder) {
        const card = document.createElement('div');
        card.className = 'row-card';
        card.style.animationDelay = `${index * 0.15}s`;

        const dataObj = {};
        columnOrder.forEach((col, i) => {
            dataObj[col] = cells[i] ? cells[i].trim() : '';
        });

        const name = dataObj["Worker (Full Name)"] || `Colaborador ${index + 1}`;
        card.dataset.name = name;

        // ── Card header ──
        const header = document.createElement('div');
        header.className = 'row-header';

        const headerLeft = document.createElement('div');
        headerLeft.className = 'row-header-left';

        const title = document.createElement('h3');
        title.textContent = name;

        // ── Badges ──
        const badgeRow = document.createElement('div');
        badgeRow.className = 'badge-row';

        if (dataObj['Transporte']) {
            const b = document.createElement('span');
            b.className = 'badge badge-transporte';
            b.textContent = '🚚 ' + dataObj['Transporte'];
            badgeRow.appendChild(b);
        }

        if (dataObj['Status Equipamento']) {
            const b = document.createElement('span');
            const isWarning = /pend|aguard|falta/i.test(dataObj['Status Equipamento']);
            b.className = 'badge badge-status' + (isWarning ? ' badge-warning' : '');
            b.textContent = '💻 ' + dataObj['Status Equipamento'];
            badgeRow.appendChild(b);
        }

        if (dataObj['Refletiu no FNMS?']) {
            const val = dataObj['Refletiu no FNMS?'];
            const b = document.createElement('span');
            const isOk = /sim|yes|s|y/i.test(val);
            b.className = 'badge ' + (isOk ? 'badge-fnms-ok' : 'badge-fnms-no');
            b.textContent = (isOk ? '✅' : '❌') + ' FNMS: ' + val;
            badgeRow.appendChild(b);
        }

        // ── CEP loading indicator ──
        const cepLoadingEl = document.createElement('span');
        cepLoadingEl.className = 'cep-loading';
        cepLoadingEl.innerHTML = '<span class="cep-spinner"></span> Buscando bairro...';
        cepLoadingEl.style.display = dataObj['CEP'] ? 'inline-flex' : 'none';

        headerLeft.appendChild(title);
        if (badgeRow.children.length > 0) headerLeft.appendChild(badgeRow);
        headerLeft.appendChild(cepLoadingEl);

        // ── Actions ──
        const actions = document.createElement('div');
        actions.className = 'row-actions';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copiar Dados';
        copyBtn.onclick = () => {
            let textToCopy = `Dados de ${name}:\n\n`;
            columnOrder.forEach(col => {
                textToCopy += `${col}: ${dataObj[col] || 'N/A'}\n`;
            });
            navigator.clipboard.writeText(textToCopy).then(() => {
                const orig = copyBtn.textContent;
                copyBtn.textContent = 'Copiado! ✓';
                setTimeout(() => copyBtn.textContent = orig, 2000);
            });
        };
        actions.appendChild(copyBtn);

        const generateBtn = document.createElement('button');
        generateBtn.textContent = 'Gerar Solicitação';
        generateBtn.className = 'generate-btn';

        // Excel row container
        const excelContainer = document.createElement('div');
        excelContainer.className = 'excel-container hidden';

        const excelInput = document.createElement('input');
        excelInput.type = 'text';
        excelInput.className = 'excel-input';
        excelInput.readOnly = true;

        const excelCopyBtn = document.createElement('button');
        excelCopyBtn.textContent = 'Copiar Linha Excel';
        excelCopyBtn.className = 'excel-copy-btn';
        excelCopyBtn.onclick = () => {
            navigator.clipboard.writeText(excelInput.value).then(() => {
                const orig = excelCopyBtn.textContent;
                excelCopyBtn.textContent = 'Copiado! ✓';
                setTimeout(() => excelCopyBtn.textContent = orig, 2000);
            });
        };
        excelContainer.appendChild(excelInput);
        excelContainer.appendChild(excelCopyBtn);

        generateBtn.onclick = () => {
            const template =
`Item: Laptop
Description: Boa tarde, tudo bem? Precisamos da NF desta maquina para transporte de PE para ${dataObj['State/Province of residence'] || ''}, ${dataObj['Worker (Full Name)'] || ''}
 
Solicitação de nota fiscal para New Hire
 
Nome Completo: ${dataObj['Worker (Full Name)'] || ''}
EID: ${dataObj['Enterprise ID'] || ''}
CPF: ${dataObj['CPF'] || ''}
TELEFONE: ${dataObj['Mobile Phone'] || ''}
 
New Asset
Modelo: Lenovo Thinkpad T14 
S/N: ${dataObj['SERIAL'] || ''}
Asset tag:
 
De: Recife - PE (Armazém 9)
CEP: 50.030-150
Endereço: Av. Alfredo Lisboa , S/N Armazém 9- Bairro Recife_ PE
 
Para: ${dataObj['City of residence'] || ''}-${dataObj['State/Province of residence'] || ''}
Endereço: ${dataObj['Address 1'] || ''}
CEP: ${dataObj['CEP'] || ''}
 
Dados da Transportadora
CNPJ: 55.175.638/0001-55 
Razão Social: INTERNACIONAL TRANSPORTES E SUPPLY CHAIN LTDA
Fantasia: Urus Logistics`;

            const today = new Date().toLocaleDateString('pt-BR');
            const excelStr = `INC\t${dataObj['Worker (Full Name)'] || ''}\t${dataObj['Enterprise ID'] || ''}\tSem ID\t${dataObj['PC Configuration Location'] || ''}\t${today}\tAccenture`;

            openModal(template, excelStr, excelInput, excelContainer, generateBtn);
        };
        actions.appendChild(generateBtn);

        header.appendChild(headerLeft);
        header.appendChild(actions);
        card.appendChild(header);
        card.appendChild(excelContainer);

        // ── Fields ──
        const IMPORTANT_COLUMNS = [
            "Worker (Full Name)", "Enterprise ID", "Maquina", "SERIAL",
            "Location", "PC Configuration Location", "Entrega", "CPF",
            "Cargo Folha", "E-mail pessoal", "Mobile Phone", "Cost Center Code",
            "Address 1", "City of residence", "State/Province of residence", "CEP"
        ];

        const importantGrid = document.createElement('div');
        importantGrid.className = 'fields-grid important-grid';

        const otherGrid = document.createElement('div');
        otherGrid.className = 'fields-grid other-grid';
        otherGrid.style.display = 'none';

        const fieldElements = {};

        columnOrder.forEach(colName => {
            const value = dataObj[colName];
            const fieldItem = document.createElement('div');
            fieldItem.className = 'field-item';
            fieldItem.title = 'Clique para copiar';

            const label = document.createElement('span');
            label.className = 'field-label';
            label.textContent = colName;

            const valSpan = document.createElement('span');
            valSpan.className = `field-value ${!value ? 'empty' : ''}`;
            valSpan.textContent = value || 'Vazio';
            fieldElements[colName] = valSpan;

            fieldItem.appendChild(label);
            fieldItem.appendChild(valSpan);

            fieldItem.onclick = e => {
                e.stopPropagation();
                const currentVal = valSpan.textContent !== 'Vazio' ? valSpan.textContent : '';
                if (!currentVal) return;
                navigator.clipboard.writeText(currentVal).then(() => {
                    fieldItem.classList.add('copied-flash');
                    setTimeout(() => fieldItem.classList.remove('copied-flash'), 500);
                });
            };

            if (IMPORTANT_COLUMNS.includes(colName)) {
                fieldItem.classList.add('important-field');
                importantGrid.appendChild(fieldItem);
            } else {
                otherGrid.appendChild(fieldItem);
            }
        });

        card.appendChild(importantGrid);

        const divider = document.createElement('div');
        divider.className = 'card-divider';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = 'Ver outras informações ▼';
        toggleBtn.onclick = () => {
            const isOpen = otherGrid.style.display !== 'none';
            otherGrid.style.display = isOpen ? 'none' : 'grid';
            toggleBtn.textContent = isOpen ? 'Ver outras informações ▼' : 'Ocultar outras informações ▲';
            divider.classList.toggle('open', !isOpen);
        };

        divider.appendChild(toggleBtn);
        card.appendChild(divider);
        card.appendChild(otherGrid);
        resultsContainer.appendChild(card);

        // ── CEP fetch ──
        fetchCepAndUpdate(dataObj, fieldElements, importantGrid, cepLoadingEl);
    }

    async function fetchCepAndUpdate(dataObj, fieldElements, importantGrid, cepLoadingEl) {
        const cepStr = dataObj['CEP'];
        if (!cepStr) return;

        const cep = cepStr.replace(/\D/g, '');
        if (cep.length !== 8) {
            cepLoadingEl.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
            cepLoadingEl.style.display = 'none';

            if (!response.ok) {
                if (response.status === 404) addInfoField(importantGrid, 'Aviso de CEP', 'CEP não tem bairro', 'warning-field');
                return;
            }

            const data = await response.json();
            const bairro = data.neighborhood;

            if (!bairro) {
                addInfoField(importantGrid, 'Aviso de CEP', 'CEP não tem bairro', 'warning-field');
                return;
            }

            const address1 = dataObj['Address 1'] || '';
            if (address1.toLowerCase().includes(bairro.toLowerCase())) {
                addInfoField(importantGrid, 'Aviso de CEP', 'Bairro já descrito no endereço', 'info-field');
            } else {
                const novoEndereco = address1 ? `${address1}, ${bairro}` : bairro;
                dataObj['Address 1'] = novoEndereco;
                if (fieldElements['Address 1']) {
                    fieldElements['Address 1'].textContent = novoEndereco;
                    fieldElements['Address 1'].classList.remove('empty');
                    fieldElements['Address 1'].parentElement.classList.add('copied-flash');
                    setTimeout(() => fieldElements['Address 1'].parentElement.classList.remove('copied-flash'), 1000);
                }
            }
        } catch (err) {
            cepLoadingEl.style.display = 'none';
            console.error('Erro ao buscar CEP:', err);
        }
    }

    function addInfoField(grid, labelText, valueText, className) {
        const fieldItem = document.createElement('div');
        fieldItem.className = `field-item ${className}`;

        const label = document.createElement('span');
        label.className = 'field-label';
        label.textContent = labelText;

        const valSpan = document.createElement('span');
        valSpan.className = 'field-value';
        valSpan.textContent = valueText;

        fieldItem.appendChild(label);
        fieldItem.appendChild(valSpan);

        if (grid.firstChild) grid.insertBefore(fieldItem, grid.firstChild);
        else grid.appendChild(fieldItem);
    }
});
