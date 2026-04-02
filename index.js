const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/nesting-complexo', (req, res) => {
    try {
        const { pecas } = req.body;
        // Lógica de encaixe simplificada para evitar erros de biblioteca
        // Aqui o servidor organiza as peças baseando-se nos pontos enviados
        let cursorX = 0;
        let resultado = pecas.map(p => {
            const novaPos = { id: p.id, x: cursorX, y: 0 };
            cursorX += p.w + 2; // Adiciona 2mm de margem
            return novaPos;
        });

        res.json({ status: "sucesso", posicoes: resultado });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(process.env.PORT || 10000);
