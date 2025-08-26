document.addEventListener("DOMContentLoaded", function() {
  // DOM elements for the Calculator
  const calculatorPage = document.getElementById("calculator-page");
  const tableBody = document.querySelector("#tabelaprod tbody");
  const addButton = document.getElementById("addButton");
  const savePDFButton = document.getElementById("savePDFButton");
  const totalValueSpan = document.getElementById("totalvalue");
  const calculatorLocalStorageKey = "productCalculatorData";

  // DOM elements for the Shopping List
  const shoppingListPage = document.getElementById("shopping-list-page");
  const newProductNameInput = document.getElementById("new-product-name");
  const newProductPriceInput = document.getElementById("new-product-price");
  const addProductListButton = document.getElementById("add-product-list-button");
  const shoppingListTableBody = document.querySelector("#shopping-list-table tbody");
  const shoppingListLocalStorageKey = "shoppingListData";

  // New Gemini API related DOM elements
  const geminiPromptInput = document.getElementById("gemini-prompt");
  const generateListButton = document.getElementById("generate-list-button");
  const apiKeyModal = document.getElementById("api-key-modal");
  const modalApiKeyInput = document.getElementById("modal-api-key-input");
  const modalContinueButton = document.getElementById("modal-continue-button");
  const modalCancelButton = document.getElementById("modal-cancel-button");
  const apiKeyLocalStorageKey = "geminiApiKey";
  let apiKey = "";

  // DOM elements for Navigation
  const navCalculator = document.getElementById("nav-calculator");
  const navShoppingList = document.getElementById("nav-shopping-list");
  
  const messageBox = document.getElementById("message-box");

  // Function to show messages on the screen
  function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = 'bg-green-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    if (type === 'error') {
      messageBox.className = 'bg-red-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    } else if (type === 'info') {
      messageBox.className = 'bg-blue-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto';
    }
    messageBox.classList.remove('hidden');
    setTimeout(() => {
      messageBox.classList.add('hidden');
    }, 3000);
  }

  // ----------------------------------------------------------------------------------
  // Lógica da Calculadora
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
      const rows = JSON.parse(storedData);
      rows.forEach(data => addCalculatorRow(data));
      showMessage("Dados da calculadora carregados com sucesso!");
    } else {
      addCalculatorRow();
    }
    calculateTotalValue();
  }

  function clearCalculatorData() {
    localStorage.removeItem(calculatorLocalStorageKey);
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    addCalculatorRow();
    calculateTotalValue();
  }

  function updateTotal(event) {
    const row = event.target.closest('tr');
    const quantity = parseFloat(row.querySelector("input[name='quantity']").value);
    const unitPrice = parseFloat(row.querySelector("input[name='unitprice']").value);
    let total = 0;
    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      total = (quantity * unitPrice).toFixed(2);
    }
    row.querySelector("td[name='total']").textContent = total;
    calculateTotalValue();
    saveDataToCalculatorLocalStorage();
  }

  function calculateTotalValue() {
    const totalCells = document.querySelectorAll("td[name='total']");
    let totalValue = 0;
    totalCells.forEach(cell => {
      const total = parseFloat(cell.textContent);
      if (!isNaN(total)) {
        totalValue += total;
      }
    });
    totalValueSpan.textContent = `Total: R$ ${totalValue.toFixed(2)}`;
  }

  function addCalculatorRow(data = {}) {
    const row = tableBody.insertRow();
    const rowCount = tableBody.rows.length;
    const formattedId = rowCount < 10 ? `0${rowCount}` : rowCount;

    row.innerHTML = `
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">${formattedId}</td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <input type="text" name="product" value="${data.product || ''}" placeholder="Nome do produto" class="input-style w-32 sm:w-48">
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <select name="type" class="input-style">
          <option value="unitario" ${data.type === 'unitario' ? 'selected' : ''}>Unitário</option>
          <option value="peso" ${data.type === 'peso' ? 'selected' : ''}>Peso</option>
        </select>
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <input type="number" name="unitprice" value="${data.unitprice || ''}" placeholder="R$ 0.00" class="input-style w-24 sm:w-28">
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <input type="number" name="quantity" value="${data.quantity || ''}" placeholder="Qtd." class="input-style w-16 sm:w-20">
      </td>
      <td name="total" class="px-3 sm:px-6 py-3 font-medium text-gray-200 whitespace-nowrap"></td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <button class="delete-button text-red-500 hover:text-red-700 transition duration-300">Excluir</button>
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap text-center">
        <input type="checkbox" name="completed" class="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 cursor-pointer" ${data.completed ? 'checked' : ''}>
      </td>
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
        const productName = productInput.value.trim();
        const productPrice = unitPriceInput.value.trim();
        if (productName && productPrice) {
          addProductToShoppingListFromCalculator(productName, productPrice);
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
      showMessage("Linha removida!");
    });

    if (Object.keys(data).length > 0) {
      updateTotal({ target: quantityInput });
    }
  }

  addButton.addEventListener("click", () => {
    addCalculatorRow();
    saveDataToCalculatorLocalStorage();
    showMessage("Nova linha adicionada!");
  });

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
    showMessage("PDF salvo e dados apagados!");
  });

  // ----------------------------------------------------------------------------------
  // Lista de Compras
  // ----------------------------------------------------------------------------------
  function saveDataToShoppingListLocalStorage() {
    const rows = Array.from(shoppingListTableBody.rows).map(row => {
      const nameElement = row.querySelector('.product-name-display');
      const priceElement = row.querySelector('.product-price-display');
      return {
        name: nameElement ? nameElement.textContent : '',
        price: priceElement ? priceElement.textContent.replace('R$ ', '') : ''
      };
    });
    localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(rows));
  }

  function loadDataFromShoppingListLocalStorage() {
    const storedData = localStorage.getItem(shoppingListLocalStorageKey);
    while (shoppingListTableBody.firstChild) {
      shoppingListTableBody.removeChild(shoppingListTableBody.firstChild);
    }
    if (storedData) {
      const rows = JSON.parse(storedData);
      rows.forEach(data => addProductToList(data.name, data.price));
    }
  }

  function addProductToShoppingListFromCalculator(productName, productPrice) {
    const storedData = JSON.parse(localStorage.getItem(shoppingListLocalStorageKey)) || [];
    const productExists = storedData.some(item => item.name.toLowerCase() === productName.toLowerCase());
    if (productExists) {
      showMessage(`O produto "${productName}" já está na lista.`, 'info');
    } else {
      storedData.push({ name: productName, price: productPrice });
      localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(storedData));
      loadDataFromShoppingListLocalStorage();
      showMessage(`"${productName}" adicionado à lista!`);
    }
  }

  function addProductToList(productName, productPrice) {
    if (!productName || !productPrice) {
      showMessage("Por favor, preencha todos os campos.", 'error');
      return;
    }
    const newRow = shoppingListTableBody.insertRow();
    newRow.innerHTML = `
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <span class="product-name-display">${productName}</span>
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <span class="product-price-display">R$ ${parseFloat(productPrice).toFixed(2)}</span>
      </td>
      <td class="px-3 sm:px-6 py-3 whitespace-nowrap">
        <button class="delete-product-button text-red-500 hover:text-red-700 transition duration-300">Excluir</button>
      </td>
    `;
    const deleteButton = newRow.querySelector('.delete-product-button');
    deleteButton.addEventListener('click', () => {
      newRow.remove();
      saveDataToShoppingListLocalStorage();
      showMessage("Produto removido!");
    });
  }

  addProductListButton.addEventListener("click", () => {
    const productName = newProductNameInput.value.trim();
    const productPrice = parseFloat(newProductPriceInput.value);
    addProductToList(productName, productPrice);
    saveDataToShoppingListLocalStorage();
  });

  // ----------------------------------------------------------------------------------
  // Navegação
  // ----------------------------------------------------------------------------------
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('hidden'));
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
