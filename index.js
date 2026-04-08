const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos } = req.body;
    let cursorX = 0;
    let cursorY = 0;
    let maxH_na_linha = 0;
    const LARGURA_CHAPA = 1570; // mm (ajustável)

    const resultado = objetos.map((obj, index) => {
        // Pula linha se estourar a largura
        if (cursorX + obj.w > LARGURA_CHAPA) {
            cursorX = 0;
            cursorY += maxH_na_linha * 0.92; 
            maxH_na_linha = 0;
        }

        // ALTERNÂNCIA DE ROTAÇÃO (O segredo do PlotCalc para estrelas)
        // 0 graus para as ímpares, 180 graus para as pares
        const rotacao = (index % 2 === 0) ? 0 : 180;

        const novaPos = { 
            id: obj.id, 
            x: cursorX, 
            y: cursorY, 
            rot: rotacao 
        };

        // AVANÇO DINÂMICO (Aproximação das pontas)
        // Usamos 82% da largura para permitir que as pontas se entrelacem
        cursorX += obj.w * 0.82; 
        if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

        return novaPos;
    });

    res.json({ status: "sucesso", pecas: resultado });
});

app.listen(process.env.PORT || 10000);
