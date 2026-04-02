const express = require('express');
const app = express();
const port = process.env.PORT || 10000; // Porta padrão do Render

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('O SERVIDOR ESTÁ VIVO! Pronto para a Macro do Corel.');
});

app.post('/calcular', (req, res) => {
  console.log("Recebendo dados do CorelDRAW...");
  res.json({
    status: "ok",
    mensagem: "Conexão com o servidor estabelecida com sucesso!"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
