const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        const { objetos, larguraChapa, distancia } = req.body;
        let cursorX = 0, cursorY = 0, maxH_na_linha = 0;
        let larguraUltima = 0;

        // Ordenar por ALTURA (crucial para o setor têxtil/vestuário)
        const pecas = objetos.sort((a, b) => b.h - a.h);

        const resultado = pecas.map((obj, index) => {
            if (cursorX + obj.w > larguraChapa) {
                cursorX = 0;
                cursorY += maxH_na_linha + distancia;
                maxH_na_linha = 0;
                larguraUltima = 0;
            }

            // Lógica de Encaixe de Curvas:
            // Se a peça atual for menor ou similar à anterior, permite um encaixe de até 40%
            let encaixeEfetivo = 0;
            if (larguraUltima > 0) {
                encaixeEfetivo = Math.min(obj.w, larguraUltima) * 0.42;
            }

            const novaPos = { 
                id: obj.id, 
                x: cursorX - encaixeEfetivo, 
                y: cursorY, 
                rot: (index % 2 === 0) ? 0 : 180 
            };

            cursorX += (obj.w - encaixeEfetivo) + distancia;
            larguraUltima = obj.w;
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ status: "sucesso", pecas: resultado });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
