const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Dados dos jogos
let games = [
    { 
        id: 1, 
        title: 'Balatro', 
        price: 94937524.99, 
        discount: 1, 
        genre: 'Cartas', 
        platform: 'PS5', 
        image: 'balatro.png'
    },
    { 
        id: 2, 
        title: 'Hollow Knight', 
        price: 50.00, 
        discount: 25, 
        genre: 'Ação/Aventura', 
        platform: 'PC/SWITCH/PS4/XBOX', 
        image: 'hk.png'
    },
    { 
        id: 3, 
        title: 'Zelda Breath of the Wild', 
        price: 249.90, 
        discount: 10, 
        genre: 'Aventura', 
        platform: 'Switch', 
        image: 'zelda.png'
    }
];

// API Routes
app.get('/api/games', (req, res) => res.json(games));
app.post('/api/games', (req, res) => {
    const newGame = {
        id: games.length + 1,
        ...req.body,
        image: 'default.jpg'
    };
    games.push(newGame);
    res.status(201).json(newGame);
});

// Servir as páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));