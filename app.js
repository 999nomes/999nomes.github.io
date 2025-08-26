document.addEventListener("DOMContentLoaded", function() {
  // ----------------------------------------------------------------------------------
  // Seletores comuns
  // ----------------------------------------------------------------------------------
  const calculatorPage = document.getElementById("calculator-page");
  const tableBody = document.querySelector("#tabelaprod tbody");
  const addButton = document.getElementById("addButton");
  const savePDFButton = document.getElementById("savePDFButton");
  const totalValueSpan = document.getElementById("totalvalue");
  const calculatorLocalStorageKey = "productCalculatorData";

  const shoppingListPage = document.getElementById("shopping-list-page");
  const newProductNameInput = document.getElementById("new-product-name");
  const newProductPriceInput = document.getElementById("new-product-price");
  const addProductListButton = document.getElementById("add-product-list-button");
  const shoppingListTableBody = document.querySelector("#shopping-list-table tbody");
  const shoppingListLocalStorageKey = "shoppingListData";

  const geminiPromptInput = document.getElementById("gemini-prompt");
  const generateListButton = document.getElementById("generate-list-button");
  const apiKeyModal = document.getElementById("api-key-modal");
  const modalApiKeyInput = document.getElementById("modal-api-key-input");
  const modalContinueButton = document.getElementById("modal-continue-button");
  const modalCancelButton = document.getElementById("modal-cancel-button");
  const apiKeyLocalStorageKey = "geminiApiKey";
  let apiKey = "";

  const navCalculator = document.getElementById("nav-calculator");
  const navShoppingList = document.getElementById("nav-shopping-list");

  const messageBox = document.getElementById("message-box");

  // ----------------------------------------------------------------------------------
  // Funções auxiliares
  // ----------------------------------------------------------------------------------
  function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = 'bg-green-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    if (type === 'error') {
      messageBox.className = 'bg-red-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    } else if (type === 'info') {
      messageBox.className = 'bg-blue-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    }
    messageBox.classList.remove('hidden');
    setTimeout(() => messageBox.classList.add('hidden'), 3000);
  }

  // ----------------------------------------------------------------------------------
  // Calculadora
  // ----------------------------------------------------------------------------------
  function saveDataToCalculatorLocalStorage() {
    const rows = Array.from(tableBody.rows).map(row => {
      return {
        product: row.querySelector('input[name="product"]').value,
        type: row.querySelector('select[name="type"]').value,
        unitprice: row.querySelector('input[name="unitprice"]').value,
        quantity: row.querySelector('input[name="quantity"]').value,
        completed: row.querySelector('input[name="completed"]').checked
      };
    });
    localStorage.setItem(calculatorLocalStorageKey, JSON.stringify(rows));
  }

  function loadDataFromCalculatorLocalStorage() {
    const storedData = localStorage.getItem(calculatorLocalStorageKey);
    if (storedData) {
      JSON.parse(storedData).forEach(data => addCalculatorRow(data));
    } else {
      addCalculatorRow();
    }
    calculateTotalValue();
  }

  function clearCalculatorData() {
    localStorage.removeItem(calculatorLocalStorageKey);
    tableBody.innerHTML = '';
    addCalculatorRow();
    calculateTotalValue();
  }

  function updateTotal(event) {
    const row = event.target.closest('tr');
    const quantity = parseFloat(row.querySelector("input[name='quantity']").value);
    const unitPrice = parseFloat(row.querySelector("input[name='unitprice']").value);
    let total = 0;
    if (!isNaN(quantity) && !isNaN(unitPrice)) total = (quantity * unitPrice).toFixed(2);
    row.querySelector("td[name='total']").textContent = total;
    calculateTotalValue();
    saveDataToCalculatorLocalStorage();
  }

  function calculateTotalValue() {
    const totalCells = document.querySelectorAll("td[name='total']");
    let totalValue = 0;
    totalCells.forEach(cell => {
      const total = parseFloat(cell.textContent);
      if (!isNaN(total)) totalValue += total;
    });
    totalValueSpan.textContent = `Total: R$ ${totalValue.toFixed(2)}`;
  }

  function addCalculatorRow(data = {}) {
    const row = tableBody.insertRow();
    const rowCount = tableBody.rows.length;
    const formattedId = rowCount < 10 ? `0${rowCount}` : rowCount;

    row.innerHTML = `
      <td>${formattedId}</td>
      <td><input type="text" name="product" value="${data.product || ''}" placeholder="Nome do produto" class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 w-32 sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></td>
      <td>
        <select name="type" class="bg-gray-800 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          <option value="unitario" ${data.type === 'unitario' ? 'selected' : ''}>Unitário</option>
          <option value="peso" ${data.type === 'peso' ? 'selected' : ''}>Peso</option>
        </select>
      </td>
      <td><input type="number" name="unitprice" value="${data.unitprice || ''}" placeholder="R$ 0.00" class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 w-24 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></td>
      <td><input type="number" name="quantity" value="${data.quantity || ''}" placeholder="Qtd." class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 w-16 sm:w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></td>
      <td name="total" class="font-medium text-gray-200"></td>
      <td><button class="delete-button text-red-500 hover:text-red-700">Excluir</button></td>
      <td><input type="checkbox" name="completed" class="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 cursor-pointer" ${data.completed ? 'checked' : ''}></td>
    `;

    const productInput = row.querySelector('input[name="product"]');
    const quantityInput = row.querySelector('input[name="quantity"]');
    const unitPriceInput = row.querySelector('input[name="unitprice"]');
    const typeSelect = row.querySelector('select[name="type"]');
    const deleteButton = row.querySelector('.delete-button');
    const completedCheckbox = row.querySelector('input[name="completed"]');

    productInput.addEventListener('input', saveDataToCalculatorLocalStorage);
    quantityInput.addEventListener('input', updateTotal);
    unitPriceInput.addEventListener('input', updateTotal);
    typeSelect.addEventListener('change', updateTotal);

    completedCheckbox.addEventListener('change', (event) => {
      saveDataToCalculatorLocalStorage();
      if (event.target.checked) {
        if (productInput.value.trim() && unitPriceInput.value.trim()) {
          addProductToShoppingListFromCalculator(productInput.value.trim(), unitPriceInput.value.trim());
        } else {
          showMessage("Preencha nome e valor antes de adicionar à lista.", 'error');
          event.target.checked = false;
        }
      }
    });

    deleteButton.addEventListener('click', () => {
      row.remove();
      calculateTotalValue();
      saveDataToCalculatorLocalStorage();
    });

    if (Object.keys(data).length > 0) updateTotal({ target: quantityInput });
  }

  addButton.addEventListener("click", () => { addCalculatorRow(); saveDataToCalculatorLocalStorage(); });

  savePDFButton.addEventListener("click", async () => {
    showMessage("Gerando PDF...", 'info');
    const table = document.getElementById("tabelaprod");
    const canvas = await html2canvas(table, { backgroundColor: '#111827', scale: 2 });
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    doc.save("lista_produtos.pdf");
    clearCalculatorData();
  });

  // ----------------------------------------------------------------------------------
  // Lista de Compras
  // ----------------------------------------------------------------------------------
  function saveDataToShoppingListLocalStorage() {
    const rows = Array.from(shoppingListTableBody.rows).map(row => {
      const nameElement = row.querySelector('.product-name-display');
      const priceElement = row.querySelector('.product-price-display');
      return { name: nameElement ? nameElement.textContent : '', price: priceElement ? priceElement.textContent.replace('R$ ', '') : '' };
    });
    localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(rows));
  }

  function loadDataFromShoppingListLocalStorage() {
    shoppingListTableBody.innerHTML = '';
    const storedData = localStorage.getItem(shoppingListLocalStorageKey);
    if (storedData) JSON.parse(storedData).forEach(data => addProductToList(data.name, data.price));
  }

  function addProductToShoppingListFromCalculator(productName, productPrice) {
    const storedData = JSON.parse(localStorage.getItem(shoppingListLocalStorageKey)) || [];
    const exists = storedData.some(item => item.name.toLowerCase() === productName.toLowerCase());
    if (exists) return;
    storedData.push({ name: productName, price: productPrice });
    localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(storedData));
    loadDataFromShoppingListLocalStorage();
  }

  function addProductToList(productName, productPrice) {
    if (!productName || !productPrice) return;
    const newRow = shoppingListTableBody.insertRow();
    newRow.innerHTML = `
      <td><span class="product-name-display">${productName}</span></td>
      <td><span class="product-price-display">R$ ${parseFloat(productPrice).toFixed(2)}</span></td>
      <td><button class="delete-product-button text-red-500 hover:text-red-700">Excluir</button></td>
    `;
    newRow.querySelector('.delete-product-button').addEventListener('click', () => {
      newRow.remove();
      saveDataToShoppingListLocalStorage();
    });
  }

  addProductListButton.addEventListener("click", () => {
    addProductToList(newProductNameInput.value.trim(), parseFloat(newProductPriceInput.value));
    saveDataToShoppingListLocalStorage();
  });

  // ----------------------------------------------------------------------------------
  // Integração Gemini
  // ----------------------------------------------------------------------------------
  async function generateListWithGemini() {
    const userPrompt = geminiPromptInput.value.trim();
    if (!userPrompt) { showMessage("Digite um tema para gerar a lista.", 'error'); return; }
    showMessage("Gerando lista com IA...", 'info');
    generateListButton.disabled = true;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: `Gere uma lista de compras para: ${userPrompt}. Responda em JSON com [{\"product\":\"...\",\"price\":valor}]` }] }]
    };

    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      const jsonContent = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonContent) throw new Error("Nenhum conteúdo retornado");
      const parsed = JSON.parse(jsonContent);
      parsed.forEach(item => addProductToList(item.product, item.price));
      saveDataToShoppingListLocalStorage();
      showMessage("Lista gerada!");
    } catch (e) {
      console.error(e);
      showMessage("Erro ao gerar lista: " + e.message, 'error');
    } finally {
      generateListButton.disabled = false;
    }
  }

  generateListButton.addEventListener("click", () => {
    apiKey = localStorage.getItem(apiKeyLocalStorageKey) || "";
    if (!apiKey) {
      apiKeyModal.classList.remove('hidden');
    } else {
      generateListWithGemini();
    }
  });

  modalContinueButton.addEventListener('click', () => {
    const inputKey = modalApiKeyInput.value.trim();
    if (inputKey) {
      apiKey = inputKey;
      localStorage.setItem(apiKeyLocalStorageKey, apiKey);
      apiKeyModal.classList.add('hidden');
      generateListWithGemini();
    } else {
      showMessage("Insira uma chave válida.", 'error');
    }
  });

  modalCancelButton.addEventListener('click', () => {
    apiKeyModal.classList.add('hidden');
    showMessage("Funcionalidade de IA ignorada.", 'info');
  });

  // ----------------------------------------------------------------------------------
  // Navegação
  // ----------------------------------------------------------------------------------
  function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
  }

  navCalculator.addEventListener('click', () => showPage('calculator-page'));
  navShoppingList.addEventListener('click', () => showPage('shopping-list-page'));

  // ----------------------------------------------------------------------------------
  // Inicialização
  // ----------------------------------------------------------------------------------
  showPage('calculator-page');
  loadDataFromCalculatorLocalStorage();
  loadDataFromShoppingListLocalStorage();
});
