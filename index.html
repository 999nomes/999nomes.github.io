<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora e Lista de Compras</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts - Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- html2canvas and jspdf CDNs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.0/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>

  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    /* Estilo geral para inputs e selects */
    .input-style {
      @apply bg-gray-700 text-gray-200 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300;
    }
    /* Estilo específico para garantir a cor do texto */
    input, select {
        color: #FFFFFF; /* Força a cor do texto para branco */
    }

    .modal {
      @apply fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50;
    }

    .modal-content {
      @apply bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm;
    }
  </style>
</head>

<body class="bg-gray-900 text-white min-h-screen">

  <!-- Navegação -->
  <nav class="bg-gray-800 p-4 sticky top-0 z-50 shadow-lg">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <div class="text-xl font-bold text-blue-400">App de Compras</div>
      <div class="flex space-x-4">
        <button id="nav-calculator" class="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition duration-300">
          Calculadora
        </button>
        <button id="nav-shopping-list" class="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition duration-300">
          Lista de Compras
        </button>
      </div>
    </div>
  </nav>

  <div class="p-4 sm:p-8">
    <div id="message-box" class="hidden bg-green-500 text-white p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto"></div>

    <!-- Modal para a API Key -->
    <div id="api-key-modal" class="modal hidden">
        <div class="modal-content">
            <h3 class="text-xl font-semibold mb-4 text-white text-center">API Key Necessária</h3>
            <p class="text-gray-400 mb-4 text-center">Para usar a função de IA, por favor, insira sua chave da API do Google Gemini abaixo.</p>
            <input type="text" id="modal-api-key-input" placeholder="Sua Chave de API" class="input-style w-full mb-4">
            <div class="flex justify-between space-x-4">
                <button id="modal-continue-button" class="w-1/2 px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                    Continuar
                </button>
                <button id="modal-cancel-button" class="w-1/2 px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300">
                    Ignorar
                </button>
            </div>
        </div>
    </div>

    <!-- Página da Calculadora -->
    <div id="calculator-page" class="page-content max-w-4xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-400">Calculadora</h1>
      
      <!-- Tabela principal dos produtos -->
      <div class="overflow-x-auto shadow-xl rounded-lg mb-6">
        <table id="tabelaprod" class="w-full text-sm sm:text-base text-left text-gray-400">
          <thead class="text-xs text-gray-200 uppercase bg-gray-800">
            <tr class="bg-gray-800">
              <th scope="col" class="px-3 sm:px-6 py-3">ID</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Produto</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Tipo</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Valor Unit.</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Qtd.</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Valor Total</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Ações</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Concluído</th> <!-- Nova coluna para a checkbox -->
            </tr>
          </thead>
          <tbody>
            <!-- As linhas serão adicionadas aqui pelo JavaScript -->
          </tbody>
        </table>
      </div>
  
      <!-- Botões de ação da calculadora -->
      <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <button id="addButton" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
          Adicionar Linha
        </button>
  
        <div class="w-full sm:w-auto text-center sm:text-right">
          <p class="text-lg sm:text-xl font-semibold">
            <span id="totalvalue">Total: R$ 0.00</span>
          </p>
        </div>
      </div>
  
      <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <button id="savePDFButton" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300">
          Salvar como PDF
        </button>
      </div>
    </div>

    <!-- Página da Lista de Compras -->
    <div id="shopping-list-page" class="page-content max-w-4xl mx-auto hidden">
      <h1 class="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-400">Lista de Compras</h1>
      
      <!-- Seção para gerar lista com Gemini API -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-white">Gerar Lista com ✨Gemini</h2>
        <p class="text-gray-400 mb-4">Insira um tema (ex: "ingredientes para bolo de cenoura" ou "lista de material escolar") e deixe a IA gerar a lista para você.</p>
        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input type="text" id="gemini-prompt" placeholder="Ex: Ingredientes para uma feijoada" class="input-style flex-grow">
          <button id="generate-list-button" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300">
            Gerar Lista ✨
          </button>
        </div>
      </div>

      <!-- Formulário para cadastrar produtos -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-white">Cadastrar Produto Manualmente</h2>
        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input type="text" id="new-product-name" placeholder="Nome do Produto" class="input-style flex-grow">
          <input type="number" id="new-product-price" placeholder="Valor Unitário (R$)" class="input-style w-full sm:w-auto">
          <button id="add-product-list-button" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
            Cadastrar Produto
          </button>
        </div>
      </div>

      <!-- Tabela da lista de compras -->
      <div class="overflow-x-auto shadow-xl rounded-lg">
        <table id="shopping-list-table" class="w-full text-sm sm:text-base text-left text-gray-400">
          <thead class="text-xs text-gray-200 uppercase bg-gray-800">
            <tr class="bg-gray-800">
              <th scope="col" class="px-3 sm:px-6 py-3">Nome do Produto</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Valor Unitário</th>
              <th scope="col" class="px-3 sm:px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <!-- Produtos serão adicionados aqui -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
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

      // Função para salvar os dados no localStorage
      function saveDataToCalculatorLocalStorage() {
        const rows = Array.from(tableBody.rows).map(row => {
          return {
            product: row.querySelector('input[name="product"]').value,
            type: row.querySelector('select[name="type"]').value,
            unitprice: row.querySelector('input[name="unitprice"]').value,
            quantity: row.querySelector('input[name="quantity"]').value,
            completed: row.querySelector('input[name="completed"]').checked // Salva o estado da checkbox
          };
        });
        localStorage.setItem(calculatorLocalStorageKey, JSON.stringify(rows));
      }

      // Função para carregar os dados do localStorage
      function loadDataFromCalculatorLocalStorage() {
        const storedData = localStorage.getItem(calculatorLocalStorageKey);
        if (storedData) {
          const rows = JSON.parse(storedData);
          rows.forEach(data => addCalculatorRow(data));
          showMessage("Dados da calculadora carregados com sucesso!");
        } else {
          // Adiciona uma linha padrão se não houver dados salvos
          addCalculatorRow();
        }
        calculateTotalValue();
      }

      // Função para limpar os dados do localStorage e a tabela
      function clearCalculatorData() {
        localStorage.removeItem(calculatorLocalStorageKey);
        while (tableBody.firstChild) {
          tableBody.removeChild(tableBody.firstChild);
        }
        addCalculatorRow(); // Adiciona uma nova linha vazia para começar
        calculateTotalValue();
      }

      // Função para calcular o total de uma linha e o total geral
      function updateTotal(event) {
        const row = event.target.closest('tr');
        const quantity = parseFloat(row.querySelector("input[name='quantity']").value);
        const unitPrice = parseFloat(row.querySelector("input[name='unitprice']").value);
        const type = row.querySelector("select[name='type']").value;

        let total = 0;
        if (!isNaN(quantity) && !isNaN(unitPrice)) {
          total = (quantity * unitPrice).toFixed(2);
        }

        row.querySelector("td[name='total']").textContent = total;
        calculateTotalValue();
        saveDataToCalculatorLocalStorage();
      }

      // Função para calcular o valor total de todos os produtos
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

      // Função para criar uma nova linha na tabela
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
            <button class="delete-button text-red-500 hover:text-red-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
          <td class="px-3 sm:px-6 py-3 whitespace-nowrap text-center">
            <input type="checkbox" name="completed" class="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 cursor-pointer" ${data.completed ? 'checked' : ''}>
          </td>
        `;

        // Adiciona event listeners para a nova linha
        const productInput = row.querySelector('input[name="product"]');
        const quantityInput = row.querySelector('input[name="quantity"]');
        const unitPriceInput = row.querySelector('input[name="unitprice"]');
        const typeSelect = row.querySelector('select[name="type"]');
        const deleteButton = row.querySelector('.delete-button');
        const completedCheckbox = row.querySelector('input[name="completed"]'); // Nova checkbox

        // Adiciona event listeners para todos os inputs que afetam o total e salvam os dados
        productInput.addEventListener('input', saveDataToCalculatorLocalStorage);
        quantityInput.addEventListener('input', updateTotal);
        unitPriceInput.addEventListener('input', updateTotal);
        typeSelect.addEventListener('change', updateTotal);

        // Evento para a checkbox: salva o estado e, se marcada, adiciona à lista de compras
        completedCheckbox.addEventListener('change', (event) => {
            saveDataToCalculatorLocalStorage();
            if (event.target.checked) {
                const productName = productInput.value.trim();
                const productPrice = unitPriceInput.value.trim();
                
                if (productName && productPrice) {
                    addProductToShoppingListFromCalculator(productName, productPrice);
                } else {
                    showMessage("Nome e valor do produto precisam ser preenchidos para adicionar à lista.", 'error');
                    event.target.checked = false; // Desmarca a checkbox se os campos estiverem vazios
                }
            }
        });

        // Evento para excluir a linha
        deleteButton.addEventListener('click', () => {
          row.remove();
          calculateTotalValue();
          saveDataToCalculatorLocalStorage();
          showMessage("Linha removida com sucesso!");
        });

        // Atualiza o total inicial da linha
        if (Object.keys(data).length > 0) {
          updateTotal({ target: quantityInput });
        }
      }

      // Evento para adicionar uma nova linha
      addButton.addEventListener("click", () => {
        addCalculatorRow();
        saveDataToCalculatorLocalStorage();
        showMessage("Nova linha adicionada!");
      });

      // Evento para salvar como PDF
      savePDFButton.addEventListener("click", () => {
        showMessage("Gerando PDF, por favor aguarde...", 'info');
        const table = document.getElementById("tabelaprod");
        html2canvas(table, {
          backgroundColor: '#111827', // Cor de fundo do tema escuro
          scale: 2 // Aumenta a resolução para melhor qualidade no PDF
        }).then(function(canvas) {
          const doc = new jsPDF('p', 'mm', 'a4');
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          const imgProps = doc.getImageProperties(imgData);
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
          doc.save("lista_produtos.pdf");
          
          clearCalculatorData(); // Limpa os dados após salvar o PDF
          showMessage("PDF salvo com sucesso e dados apagados!");
        });
      });

      // ----------------------------------------------------------------------------------
      // Lógica da Lista de Compras
      // ----------------------------------------------------------------------------------
      
      // Função para salvar os dados da lista de compras
      function saveDataToShoppingListLocalStorage() {
        const rows = Array.from(shoppingListTableBody.rows).map(row => {
          // Procura pelos elementos de texto, não inputs, para salvar o estado atual
          const nameElement = row.querySelector('.product-name-display');
          const priceElement = row.querySelector('.product-price-display');
          return {
            name: nameElement ? nameElement.textContent : '',
            price: priceElement ? priceElement.textContent.replace('R$ ', '') : ''
          };
        });
        localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(rows));
      }

      // Função para carregar os dados da lista de compras
      function loadDataFromShoppingListLocalStorage() {
        const storedData = localStorage.getItem(shoppingListLocalStorageKey);
        // Limpa a tabela antes de carregar os novos dados
        while (shoppingListTableBody.firstChild) {
          shoppingListTableBody.removeChild(shoppingListTableBody.firstChild);
        }
        if (storedData) {
          const rows = JSON.parse(storedData);
          rows.forEach(data => addProductToList(data.name, data.price));
        }
      }

      // NOVA FUNÇÃO: Adiciona produto à lista de compras a partir da calculadora
      function addProductToShoppingListFromCalculator(productName, productPrice) {
          const storedData = JSON.parse(localStorage.getItem(shoppingListLocalStorageKey)) || [];
          const productExists = storedData.some(item => item.name.toLowerCase() === productName.toLowerCase());
          
          if (productExists) {
              showMessage(`O produto "${productName}" já existe na sua lista de compras.`, 'info');
          } else {
              const newProduct = { name: productName, price: productPrice };
              storedData.push(newProduct);
              localStorage.setItem(shoppingListLocalStorageKey, JSON.stringify(storedData));
              loadDataFromShoppingListLocalStorage(); // Atualiza a tabela da lista de compras
              showMessage(`"${productName}" adicionado à lista de compras!`);
          }
      }

      // Função para adicionar um novo produto à lista de compras (manualmente ou via IA)
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
          <td class="px-3 sm:px-6 py-3 whitespace-nowrap space-x-2">
            <button class="edit-product-button text-yellow-500 hover:text-yellow-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </button>
            <button class="delete-product-button text-red-500 hover:text-red-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
        `;

        // Adiciona evento de exclusão para o novo botão
        const deleteButton = newRow.querySelector('.delete-product-button');
        deleteButton.addEventListener('click', () => {
            newRow.remove();
            saveDataToShoppingListLocalStorage();
            showMessage("Produto removido!");
        });

        // Adiciona evento de edição para o novo botão
        const editButton = newRow.querySelector('.edit-product-button');
        editButton.addEventListener('click', () => {
          const isEditing = newRow.classList.toggle('editing');
          
          const productNameDisplay = newRow.querySelector('.product-name-display');
          const productPriceDisplay = newRow.querySelector('.product-price-display');
          
          if (isEditing) {
            // Mudar para o modo de edição
            const currentName = productNameDisplay.textContent;
            const currentPrice = parseFloat(productPriceDisplay.textContent.replace('R$ ', ''));
            
            productNameDisplay.innerHTML = `<input type="text" value="${currentName}" class="input-style w-32 sm:w-48">`;
            productPriceDisplay.innerHTML = `<input type="number" value="${currentPrice}" class="input-style w-24 sm:w-28">`;
            
            // Muda o ícone do botão para salvar
            editButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 010-1.414L10.586 6l-2.879-2.879a1 1 0 111.414-1.414l3.5 3.5a1 1 0 010 1.414l-3.5 3.5a1 1 0 01-1.414 0zM12 17a1 1 0 11-2 0v-2.586L6.5 12l-1.414 1.414L9.586 17H5a1 1 0 110-2h4a1 1 0 011 1v1z" />
              </svg>
            `;
            showMessage("Modo de edição ativado.", 'info');
            
          } else {
            // Mudar para o modo de visualização e salvar
            const newNameInput = productNameDisplay.querySelector('input');
            const newPriceInput = productPriceDisplay.querySelector('input');
            
            const newName = newNameInput.value.trim();
            const newPrice = newPriceInput.value.trim();

            if (newName && newPrice) {
              productNameDisplay.textContent = newName;
              productPriceDisplay.textContent = `R$ ${parseFloat(newPrice).toFixed(2)}`;
              
              saveDataToShoppingListLocalStorage();
              showMessage("Produto editado com sucesso!");
            } else {
              // Se os campos ficarem vazios, reverte
              showMessage("Nome ou preço não podem ser vazios. Revertendo...", 'error');
            }
            
            // Muda o ícone do botão de volta para editar
            editButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block align-middle" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            `;
          }
        });
      }

      // Evento para o botão de cadastrar produto na lista de compras
      addProductListButton.addEventListener("click", () => {
        const productName = newProductNameInput.value.trim();
        const productPrice = parseFloat(newProductPriceInput.value);
        addProductToList(productName, productPrice);
        saveDataToShoppingListLocalStorage();
      });

      // ----------------------------------------------------------------------------------
      // Lógica da Integração com a API do Gemini
      // ----------------------------------------------------------------------------------
      
      // Função para gerar a lista com a API, isolando a lógica de fetch
      async function generateListWithGemini() {
        const userPrompt = geminiPromptInput.value.trim();
        if (!userPrompt) {
          showMessage("Por favor, insira um tema para gerar a lista.", 'error');
          return;
        }

        showMessage("Gerando lista com IA, por favor aguarde...", 'info');
        generateListButton.disabled = true;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Prompt para o LLM, pedindo uma resposta estruturada em JSON
        const prompt = `Gere uma lista de compras para "${userPrompt}". A resposta deve ser um array JSON de objetos, onde cada objeto tem as chaves "product" e "price". Use valores de preço realistas para Portugal.`;

        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: "ARRAY",
                  items: {
                      type: "OBJECT",
                      properties: {
                          "product": { "type": "STRING" },
                          "price": { "type": "NUMBER" }
                      }
                  }
              }
          }
        };

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
            throw new Error(`Erro de rede: ${response.statusText}`);
          }

          const result = await response.json();
          const jsonContent = result.candidates[0]?.content?.parts[0]?.text;

          if (jsonContent) {
            const parsedList = JSON.parse(jsonContent);
            if (Array.isArray(parsedList) && parsedList.length > 0) {
              // Adiciona os produtos gerados à lista de compras
              parsedList.forEach(item => {
                if (item.product && item.price) {
                  addProductToList(item.product, item.price);
                }
              });
              showMessage("Lista gerada com sucesso!");
            } else {
              showMessage("Ocorreu um erro ao processar a lista gerada.", 'error');
            }
          } else {
            showMessage("Nenhum conteúdo gerado pela IA.", 'error');
          }
        } catch (error) {
          console.error('Erro ao chamar a API Gemini:', error);
          showMessage(`Erro: ${error.message}`, 'error');
        } finally {
          generateListButton.disabled = false;
        }
      }

      // Evento para o botão de gerar lista com Gemini
      generateListButton.addEventListener("click", () => {
        // Verifica se a chave da API está disponível
        apiKey = localStorage.getItem(apiKeyLocalStorageKey) || "";
        
        if (apiKey === "") {
          // Se não tiver a chave, mostra o modal
          apiKeyModal.classList.remove('hidden');
        } else {
          // Se tiver, executa a função de geração
          generateListWithGemini();
        }
      });

      // Evento para o botão "Continuar" do modal
      modalContinueButton.addEventListener('click', () => {
        const inputKey = modalApiKeyInput.value.trim();
        if (inputKey) {
          apiKey = inputKey;
          localStorage.setItem(apiKeyLocalStorageKey, apiKey);
          apiKeyModal.classList.add('hidden');
          generateListWithGemini();
        } else {
          showMessage("Por favor, insira uma chave de API válida.", 'error');
        }
      });

      // Evento para o botão "Ignorar" do modal
      modalCancelButton.addEventListener('click', () => {
        apiKeyModal.classList.add('hidden');
        showMessage("Funcionalidade de IA ignorada. Continue a usar o aplicativo normalmente.", 'info');
      });

      // ----------------------------------------------------------------------------------
      // Lógica da Navegação
      // ----------------------------------------------------------------------------------
      function showPage(pageId) {
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
          page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');
      }

      navCalculator.addEventListener('click', () => showPage('calculator-page'));
      navShoppingList.addEventListener('click', () => showPage('shopping-list-page'));

      // Inicia a aplicação na página da calculadora e carrega os dados
      showPage('calculator-page');
      loadDataFromCalculatorLocalStorage();
      loadDataFromShoppingListLocalStorage();
    });
  </script>
</body>
</html>
