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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

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
            <input type="text" id="modal-api-key-input" placeholder="Sua Chave de API" 
              class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
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
        <table id="tabelaprod" class="min-w-full text-sm sm:text-base text-left text-gray-400">
          <thead class="text-xs text-gray-200 uppercase bg-gray-800">
            <tr class="bg-gray-800">
              <th class="px-3 sm:px-6 py-3">ID</th>
              <th class="px-3 sm:px-6 py-3">Produto</th>
              <th class="px-3 sm:px-6 py-3">Tipo</th>
              <th class="px-3 sm:px-6 py-3">Valor Unit.</th>
              <th class="px-3 sm:px-6 py-3">Qtd.</th>
              <th class="px-3 sm:px-6 py-3">Valor Total</th>
              <th class="px-3 sm:px-6 py-3">Ações</th>
              <th class="px-3 sm:px-6 py-3">Concluído</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
  
      <!-- Botões -->
      <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <button id="addButton" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          Adicionar Linha
        </button>
        <div class="w-full sm:w-auto text-center sm:text-right">
          <p class="text-lg sm:text-xl font-semibold">
            <span id="totalvalue">Total: R$ 0.00</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <button id="savePDFButton" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300">
          Salvar como PDF
        </button>
      </div>
    </div>

    <!-- Página da Lista de Compras -->
    <div id="shopping-list-page" class="page-content max-w-4xl mx-auto hidden">
      <h1 class="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-400">Lista de Compras</h1>

      <!-- Gerar lista -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-white">Gerar Lista com ✨Gemini</h2>
        <p class="text-gray-400 mb-4">Insira um tema e deixe a IA gerar a lista.</p>
        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input type="text" id="gemini-prompt" placeholder="Ex: Ingredientes para uma feijoada" 
            class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          <button id="generate-list-button" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
            Gerar Lista ✨
          </button>
        </div>
      </div>

      <!-- Cadastro manual -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-white">Cadastrar Produto Manualmente</h2>
        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input type="text" id="new-product-name" placeholder="Nome do Produto" 
            class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          <input type="number" id="new-product-price" placeholder="Valor Unitário (R$)" 
            class="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          <button id="add-product-list-button" class="w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            Cadastrar Produto
          </button>
        </div>
      </div>

      <!-- Tabela lista -->
      <div class="overflow-x-auto shadow-xl rounded-lg">
        <table id="shopping-list-table" class="min-w-full text-sm sm:text-base text-left text-gray-400">
          <thead class="text-xs text-gray-200 uppercase bg-gray-800">
            <tr class="bg-gray-800">
              <th class="px-3 sm:px-6 py-3">Nome do Produto</th>
              <th class="px-3 sm:px-6 py-3">Valor Unitário</th>
              <th class="px-3 sm:px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
