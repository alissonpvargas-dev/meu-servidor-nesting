const express = require('express');
const ClipperLib = require('clipper-lib');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        const { objetos, larguraChapa, distancia } = req.body;
        let cursorX = 0;
        let cursorY = 0;
        let maxH_na_linha = 0;

        // O segredo do eCut é a ordenação: maior para menor
        const pecasOrdenadas = objetos.sort((a, b) => (b.w * b.h) - (a.w * a.h));

        const resultado = pecasOrdenadas.map((obj) => {
            if (cursorX + obj.w > larguraChapa) {
                cursorX = 0;
                cursorY += maxH_na_linha + distancia;
                maxH_na_linha = 0;
            }

            const novaPos = {
                id: obj.id,
                x: cursorX,
                y: cursorY,
                rot: 0
            };

            cursorX += obj.w + distancia;
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ status: "sucesso", pecas: resultado });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
