const express = require('express');
// Ajuste para a nova versão da biblioteca
const potpack = require('potpack').default || require('potpack');

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.send('Servidor de Nesting Corrigido!'));

app.post('/calcular', (req, res) => {
    try {
        const { objetos } = req.body;
        
        if (!objetos || !Array.isArray(objetos)) {
            return res.status(400).json({ erro: "Dados inválidos" });
        }

        // Executa o cálculo (adiciona x e y em cada objeto da lista)
        potpack(objetos);

        res.json({
            status: "sucesso",
            pecas: objetos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no cálculo", detalhes: error.message });
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
