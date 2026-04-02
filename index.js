const express = require('express');
const ClipperLib = require('js-clipper');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Servidor de Nesting Corrigido e Ativo!');
});

app.post('/calcular', (req, res) => {
  // Aqui o servidor recebe os pontos do Corel
  const dados = req.body;
  
  // O Clipper será usado aqui no futuro para evitar sobreposição
  console.log("Dados recebidos para processar com Clipper");

  res.json({
    status: "sucesso",
    mensagem: "O servidor processou os dados corretamente",
    resultado: [] 
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
