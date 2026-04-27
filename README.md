# 🛒 Calculadora de Mercado Inteligente

Uma aplicação web completa e moderna para gerenciamento de compras de supermercado, focada em ajudar o usuário a controlar gastos, comparar preços históricos e otimizar ingredientes através de Inteligência Artificial e Reconhecimento Óptico.

Construída com **100% Front-end (Vanilla HTML, CSS, JS)**, garantindo que seja ultraleve e rápida sem a necessidade de um servidor backend pesado.

---

## ✨ Funcionalidades Principais

* 📊 **Controle de Orçamento em Tempo Real:** Defina um teto de gastos e veja a barra de progresso mudar de cor (Verde -> Amarelo -> Vermelho) conforme os itens são adicionados.
* ⚖️ **Suporte a Pesos e Frações:** Adicione itens por quantidade unitária ou por peso (ex: 0.467 Kg). A calculadora faz as matemáticas perfeitamente.
* 📉 **Histórico e Inteligência de Preços:** Salve suas compras. Ao adicionar um produto comprado anteriormente, a calculadora compara automaticamente os preços e avisa com selos visuais se o item está mais caro ou mais barato.
* 🧑‍🤝‍🧑 **Compras em Grupo:** Divida a conta total entre amigos, ou defina divisores individuais para itens específicos. Acompanhe o total geral e a sua parte (`Sua Parte`) em tempo real.
* 📄 **Exportação de PDF:** Com um clique, gere e baixe um recibo detalhado em PDF com todos os itens, quantidades, valores divididos e a data exata da compra.
* 📷 **Leitor de Código de Barras:** Escaneie produtos físicos usando a câmera do celular. O app se conecta à API pública do *Open Food Facts* para preencher o nome do produto automaticamente.
* 🧠 **Gerador de Receitas com IA:** Conecte sua chave gratuita do **Google Gemini (AI Studio)** com total segurança. A IA lerá seu carrinho de compras e sugerirá receitas criativas em tempo real utilizando o que você já vai comprar.
* 🌓 **Dark Mode / Light Mode:** Alternância nativa de temas com salvamento nas preferências do usuário.
* 🐛 **Debugger On-Screen:** Terminal flutuante nativo para facilitar o rastreamento de logs e erros de API (útil para testes em aparelhos mobile).

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e acessibilidade.
* **CSS3:** Variáveis CSS (`:root`) para temas, Flexbox para layouts responsivos (Mobile-First) e animações suaves.
* **Vanilla JavaScript (ES6+):** Lógica completa de estado, manipulação de DOM e Fetch APIs sem necessidade de frameworks pesados como React ou Vue.
* **html5-qrcode:** Biblioteca Open Source para leitura de códigos de barra.
* **Google Gemini API / Open Food Facts API:** Integrações externas seguras via fetch.
* **LocalStorage:** Persistência de dados nativa do navegador (Carrinho, Histórico e Orçamento não se perdem ao recarregar a página).

---

## 🚀 Como Executar o Projeto

A maior vantagem deste projeto é a sua arquitetura baseada em arquivos estáticos ("Static Site"). Você não precisa instalar Node.js, Python ou qualquer banco de dados.

> **Dica para Mobile:** Para ter a melhor experiência no celular sem perder dados do `localStorage` (devido a restrições de segurança de arquivos locais em Android/iOS), hospede o repositório no **GitHub Pages** ou **Vercel** gratuitamente. O app se comportará como um aplicativo nativo.

---

## 🔒 Segurança

* **Privacidade Total:** Como não há banco de dados centralizado, todas as suas compras e seu orçamento ficam restritos apenas ao dispositivo (celular/PC) do usuário.
* **Segurança de API:** A chave de API do Google Gemini **nunca é embutida ou exposta no código fonte**. O usuário insere a chave voluntariamente através da interface e ela fica armazenada apenas temporariamente (`sessionStorage`) na memória volátil do navegador, garantindo que não haja riscos de vazamentos no repositório.

---
*Projeto desenvolvido como um protótipo avançado e portfólio de engenharia Front-end e UX/UI.*
