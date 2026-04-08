const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos, larguraChapa, distancia, fatorEncaixe } = req.body;
    let cursorX = 0, cursorY = 0, maxH_na_linha = 0;

    // Ordenação inteligente: peças maiores primeiro
    const pecas = objetos.sort((a, b) => b.h - a.h);

    const resultado = pecas.map((obj, index) => {
        if (cursorX + obj.w > larguraChapa) {
            cursorX = 0;
            cursorY += maxH_na_linha + distancia;
            maxH_na_linha = 0;
        }

        // Para moldes de roupa, a rotação de 180° (encaixe invertido) é vital
        const rotacao = (index % 2 === 0) ? 0 : 180;

        const novaPos = { id: obj.id, x: cursorX, y: cursorY, rot: rotacao };

        // AQUI ESTÁ O AJUSTE FINO: multiplicamos por um fator (ex: 0.7) 
        // para que a próxima peça entre na área da anterior
        cursorX += (obj.w * (fatorEncaixe || 0.8)) + distancia;
        
        if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;
        return novaPos;
    });

    res.json({ status: "sucesso", pecas: resultado, bloco_largura: larguraChapa, bloco_altura: cursorY + maxH_na_linha });
});

app.listen(process.env.PORT || 10000);
