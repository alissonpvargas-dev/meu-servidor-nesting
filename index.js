const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.send('Motor de Geometria Ativo!'));

app.post('/calcular', (req, res) => {
    try {
        const { objetos } = req.body;
        let cursorX = 0;
        let cursorY = 0;
        let maxH_na_linha = 0;
        const LARGURA_CHAPA = 500; // mm

        const resultado = objetos.map((obj, index) => {
            // Se a peça ultrapassar a largura, pula linha
            if (cursorX + obj.w > LARGURA_CHAPA) {
                cursorX = 0;
                cursorY += maxH_na_linha * 0.75; // Encaixa verticalmente
                maxH_na_linha = 0;
            }

            // Lógica de "Beijo das Estrelas": uma em pé (0°) e uma invertida (180°)
            // Isso permite que as pontas se entrelacem perfeitamente
            const rotacao = (index % 2 === 0) ? 0 : 180;
            
            const novaPos = { 
                id: obj.id, 
                x: cursorX, 
                y: cursorY, 
                rot: rotacao 
            };

            // Fator de Entrelaçamento: 0.7 (faz as pontas entrarem 30% uma na outra)
            cursorX += obj.w * 0.72; 
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ status: "sucesso", pecas: resultado });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
