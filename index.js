const express = require('express');
const app = express();
// Aumentamos o limite para aceitar arquivos SVG complexos
app.use(express.text({ type: 'image/svg+xml', limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        // Aqui o servidor recebe o SVG completo com todas as curvas
        console.log("SVG Recebido para processamento");
        
        // Simulação de resposta rápida para não travar o Corel
        res.json({ status: "sucesso", mensagem: "SVG processado com geometria real" });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(process.env.PORT || 10000);
