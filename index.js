const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos } = req.body;
    let cursorX = 0;
    let cursorY = 0;
    let maxH_na_linha = 0;

    const resultado = objetos.map((obj, index) => {
        // Lógica de "Linha e Coluna" com encaixe de pontas
        // Se a próxima peça ultrapassar 300mm (largura da chapa), pula linha
        if (cursorX + obj.w > 300) {
            cursorX = 0;
            cursorY += maxH_na_linha * 0.85; // Recuo vertical para encaixar pontas
            maxH_na_linha = 0;
        }

        const novaPos = { 
            id: obj.id, 
            x: cursorX, 
            y: cursorY,
            rot: (index % 2 === 0) ? 0 : 180 // Alterna rotação para as estrelas se "beijarem"
        };

        cursorX += obj.w * 0.78; // Recuo horizontal (entrelaçamento)
        if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;
        
        return novaPos;
    });

    res.json({ status: "sucesso", pecas: resultado });
});

app.listen(process.env.PORT || 10000);
