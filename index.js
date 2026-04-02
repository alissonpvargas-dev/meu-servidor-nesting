const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Servidor de Nesting Ativo! Pronto para receber dados do CorelDRAW.');
});

// Aqui o Corel enviará os dados
app.post('/calcular', (req, res) => {
  const dadosDoCorel = req.body;
  
  // LOGICA SIMPLIFICADA: 
  // Aqui o motor SVGNest processaria os dados. 
  // Por enquanto, vamos simular que ele moveu o objeto 100mm para a direita
  console.log("Recebi dados do Corel:", dadosDoCorel);
  
  const resultado = {
    mensagem: "Calculo processado",
    novas_posicoes: [
      { id: 1, x: 100, y: 0, angulo: 90 }
    ]
  };
  
  res.json(resultado);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
