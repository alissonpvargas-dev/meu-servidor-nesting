const express = require('express');
// Forma mais segura de importar a biblioteca potpack
const potpack = require('potpack');

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.send('Servidor de Nesting Ativo!'));

app.post('/calcular', (req, res) => {
    try {
        const { objetos } = req.body;
        
        if (!objetos || !Array.isArray(objetos)) {
            return res.status(400).json({ erro: "Dados inválidos" });
        }

        // O potpack precisa que as propriedades sejam exatamente 'w' e 'h'
        // Ele altera o objeto original adicionando 'x' e 'y'
        const { w, h } = potpack(objetos);

        res.json({
            status: "sucesso",
            largura_total: w,
            altura_total: h,
            pecas: objetos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no cálculo", detalhes: error.message });
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
