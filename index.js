const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/calcular', (req, res) => {
    try {
        const { objetos, larguraChapa, distancia } = req.body;
        let cursorX = 0;
        let cursorY = 0;
        let maxH_na_linha = 0;
        let ultimaPecaW = 0;

        // Ordenação por Área (Peças grandes primeiro criam a estrutura, pequenas preenchem)
        const pecas = objetos.sort((a, b) => (b.w * b.h) - (a.w * a.h));

        const resultado = pecas.map((obj, index) => {
            // Se a largura estourar, pula linha
            if (cursorX + obj.w > larguraChapa) {
                cursorX = 0;
                cursorY += maxH_na_linha + distancia;
                maxH_na_linha = 0;
                ultimaPecaW = 0;
            }

            // Lógica de Encaixe Dinâmico: 
            // Calcula o recuo baseado na média das larguras para permitir o entrelaçamento
            const recuo = (ultimaPecaW > 0) ? Math.min(ultimaPecaW, obj.w) * 0.35 : 0;
            
            const novaPos = { 
                id: obj.id, 
                x: cursorX - recuo, 
                y: cursorY, 
                rot: (index % 2 === 0) ? 0 : 180 
            };

            // Atualiza cursores
            cursorX += (obj.w - recuo) + distancia;
            ultimaPecaW = obj.w;
            if (obj.h > maxH_na_linha) maxH_na_linha = obj.h;

            return novaPos;
        });

        res.json({ status: "sucesso", pecas: resultado });
    } catch (e) {
        res.status(500).json({ status: "erro", mensagem: e.message });
    }
});

app.listen(process.env.PORT || 10000);
