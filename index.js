const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    const { objetos } = req.body;
    let cursorX = 0;
    
    // Algoritmo de Encaixe por Contorno (Simplificado)
    const resultado = objetos.map(obj => {
        // Para estrelas, o segredo é o recuo (overlap)
        // Reduzimos o avanço do cursor em 30% para as pontas se entrelaçarem
        const avanco = obj.w * 0.75; 
        const novaPos = { id: obj.id, x: cursorX, y: 0 };
        cursorX += avanco;
        return novaPos;
    });

    res.json({ status: "sucesso", pecas: resultado });
});

app.listen(process.env.PORT || 10000);
