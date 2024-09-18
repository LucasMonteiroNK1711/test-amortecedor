const express = require('express');
const path = require('path');
const app = express();

// Configurar a pasta de views e a engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Para processar dados do formulário

let successMessage = '';

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para a página de formulário
app.get('/form', (req, res) => {
    res.render('form');
});

// Rota para a lista de formulários
app.get('/form-list', (req, res) => {
    res.render('form-list', { message: successMessage });
});

// Rota para processar o formulário
app.post('/form', (req, res) => {
    // Processamento do formulário (poderia ser uma inserção no banco de dados, etc.)
    successMessage = 'Formulário enviado com sucesso!';
    res.redirect('/form-list');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
