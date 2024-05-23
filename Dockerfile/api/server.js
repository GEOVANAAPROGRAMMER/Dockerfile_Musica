const express = require('express');
const oracledb = require('oracledb');

// Configurações do banco de dados Oracle
const dbConfig = {
  user: process.env.DATABASE_USER || 'rm99646',
  password: process.env.DATABASE_PASSWORD || '120104',
  connectString: process.env.DATABASE_HOST || '//oracle.fiap.com.br:1521/orcl'
};

// Conectar ao banco de dados
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Conexão com Oracle Database');
  } catch (err) {
    console.error('Erro ao conectar ao Oracle Database: ', err);
  }
}

initialize();

const app = express();
app.use(express.json());

// Rota para testar a conexão com a API
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rota para listar todos os itens
app.get('/items', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao executar a consulta: ', err);
    res.status(500).send('Erro ao buscar dados do banco de dados');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão: ', err);
      }
    }
  }
});

// Rota para criar um item
app.post('/items', async (req, res) => {
  let connection;
  const { nm_musica, nm_banda, nm_genero } = req.body;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      'INSERT INTO items (nm_musica, nm_banda, nm_genero) VALUES (:nm_musica, :nm_banda, :nm_genero)',
      [nm_musica, nm_banda, nm_genero],
      { autoCommit: true }
    );
    res.status(201).send('Música adicionada à playlist com sucesso!');
  } catch (err) {
    console.error('Erro ao executar a consulta: ', err);
    res.status(500).send('Erro ao criar o item');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão: ', err);
      }
    }
  }
});

// Rota para atualizar um item
app.put('/items/:id', async (req, res) => {
  let connection;
  const { id } = req.params;
  const { nm_musica } = req.body;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      'UPDATE items SET nm_musica = :nm_musica WHERE id = :id',
      [nm_musica, id],
      { autoCommit: true }
    );
    res.send('Música atualizada com sucesso!');
  } catch (err) {
    console.error('Erro ao executar a consulta: ', err);
    res.status(500).send('Erro ao atualizar o item');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão: ', err);
      }
    }
  }
});

// Rota para deletar um item
app.delete('/items/:id', async (req, res) => {
  let connection;
  const { id } = req.params;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      'DELETE FROM items WHERE id = :id',
      [id],
      { autoCommit: true }
    );
    res.send('Item deletado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar a consulta: ', err);
    res.status(500).send('Erro ao deletar o item');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão: ', err);
      }
    }
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
