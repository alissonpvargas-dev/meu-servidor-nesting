const express = require('express');
const svgNest = require('svg-nest');
const app = express();

app.use(express.text({ type: 'image/svg+xml', limit: '50mb' }));

app.post('/nesting-complexo', (req, res) => {
    const svgData = req.body; // O Corel enviará o SVG aqui
    
    // Configurações do aninhamento
    const config = {
        iterations: 10,
        spacer: 2, // Espaço entre as peças em mm
        curveTolerance: 0.3
    };

    // O motor calcula o encaixe das formas reais
    svgNest.nest(svgData, config, (result) => {
        res.header("Content-Type", "image/svg+xml");
        res.send(result); // Devolve o SVG com as estrelas encaixadas
    });
});

app.listen(process.env.PORT || 10000);
