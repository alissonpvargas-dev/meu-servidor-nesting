const express = require('express');
const potpack = require('potpack'); // Motor de nesting
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos } = req.body;
    
    // Prepara as peças para o motor (w = largura, h = altura)
    const pecas = objetos.map(obj => ({
        id: obj.id,
        w: obj.w,
        h: obj.h
    }));

    // EXECUTA O CÁLCULO DE NESTING
    const { w, h } = potpack(pecas);

    // Retorna as peças com as novas posições X e Y
    res.json({
        status: "sucesso",
        largura_total: w,
        altura_total: h,
        pecas_posicionadas: pecas
    });
});

app.listen(port, () => console.log(`Nesting online na porta ${port}`));
