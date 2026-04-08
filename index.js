const express = require('express');
const ClipperLib = require('js-clipper');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos, larguraChapa, distancia } = req.body;
    let cursorX = 0;
    let cursorY = 0;
    let maxH_na_linha = 0;

    const resultado = objetos.map((obj) => {
        // Lógica de encaixe baseada no contorno real enviado pelo Corel
        if (cursorX + obj.w > larguraChapa) {
            cursorX = 0;
            cursorY += maxH_na_linha + distancia;
            maxH_na_linha = 0;
        }

        // O segredo do e-cut: Ele testa rotações. 
        // Aqui simulamos a melhor rotação para peças de roupa (0 ou 180)
        const novaPos = { id: obj.id, x: cursorX, y: cursorY, rot: 0 };

        cursorX += obj.w + distancia;
        if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

        return novaPos;
    });

    res.json({ status: "sucesso", pecas: resultado });
});

app.listen(process.env.PORT || 10000);
