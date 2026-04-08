const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        const { objetos, larguraChapa, distancia, encaixe } = req.body;
        let cursorX = 0;
        let cursorY = 0;
        let maxH_na_linha = 0;

        const resultado = objetos.map((obj, index) => {
            // Se estourar a largura da chapa enviada pelo Corel, pula linha
            if (cursorX + obj.w > larguraChapa) {
                cursorX = 0;
                cursorY += maxH_na_linha + distancia;
                maxH_na_linha = 0;
            }

            const rotacao = (index % 2 === 0) ? 0 : 180;
            const novaPos = { id: obj.id, x: cursorX, y: cursorY, rot: rotacao };

            // O avanço agora considera a largura + distância - o fator de encaixe (ex: 0.8)
            cursorX += (obj.w * encaixe) + distancia;
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ status: "sucesso", pecas: resultado });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
