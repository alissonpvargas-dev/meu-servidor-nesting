const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        const { objetos, larguraChapa, distancia, fatorEncaixe } = req.body;
        let cursorX = 0;
        let cursorY = 0;
        let maxH_na_linha = 0;
        let larguraMaximaAtingida = 0;

        // Ordenação: Peças mais altas primeiro (estratégia "Shelf First Fit")
        const pecas = objetos.sort((a, b) => b.h - a.h);

        const resultado = pecas.map((obj, index) => {
            // Se a peça ultrapassar a largura da chapa, pula para a linha de baixo
            if (cursorX + obj.w > larguraChapa) {
                cursorX = 0;
                cursorY += maxH_na_linha + distancia;
                maxH_na_linha = 0;
            }

            const novaPos = { 
                id: obj.id, 
                x: cursorX, 
                y: cursorY, 
                rot: (index % 2 === 0) ? 0 : 180 // Inverte para melhor encaixe
            };

            // Avanço X com fator de encaixe (ex: 0.8 para estrelas/roupas)
            cursorX += (obj.w * (fatorEncaixe || 1)) + distancia;
            
            if (cursorX > larguraMaximaAtingida) larguraMaximaAtingida = cursorX;
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ 
            status: "sucesso", 
            bloco_largura: larguraMaximaAtingida,
            bloco_altura: cursorY + maxH_na_linha,
            pecas: resultado 
        });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
