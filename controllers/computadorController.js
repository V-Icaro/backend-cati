const pool = require('../config/connectDB')

module.exports = {
      allComputadores(req, res) {
        pool.query('SELECT * FROM computadores ORDER BY id ASC', (error, results) => {
          if (error) {
            res.status(500).send(error)
          }
        return res.json(results.rows);
        })
      },

      getComputadores(req, res) {
        const page = req.params.page
        const limit = req.params.limit
        const offset = (page - 1) * limit
        pool.query('SELECT * FROM computadores ORDER BY id ASC LIMIT $1 OFFSET $2 ', [limit, offset], (error, results) => {
          if (error) {
            res.status(500).send(error)
          }
        return res.json(results.rows);
        })
      },

    async getComputadoresPorId(req, res) {
      const id = req.params.id;
      await pool.query('SELECT * FROM computadores WHERE id = $1 ', [id], (error, results) => {
        if (error) {
          res.status(500).send(error)
        }
        res.json(results.rows[0])
      })
    },

    async createComputador(req, res, body){
    const { patrimonio, marca, modelo, numero_serie, status, unidade, localizacao} = req.body

    await pool.query('SELECT * FROM computadores WHERE patrimonio = $1 ', [patrimonio], (error, results) => {
      if(results.rows[0]){
        return res.status(500).send('Já exite')
      }else{
        pool.query('INSERT INTO computadores (patrimonio, marca, modelo, numero_serie, status, unidade, localizacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [patrimonio, marca, modelo, numero_serie, status, unidade, localizacao], (error, results) => {
          if (results) {
            return res.status(200).send('Cadastrado.com sucesso')
          }
        })
      }
      })    
    },

    async updateComputador(req, res){
    const id = req.params.id
    const { patrimonio, marca, modelo, numero_serie, status, unidade, localizacao } = req.body
      await pool.query('UPDATE computadores SET (patrimonio, marca, modelo, numero_serie, status, unidade, localizacao) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8', [patrimonio, marca, modelo, numero_serie, status, unidade, localizacao, id], (error, results) => {
        if (results) {
          return res.status(200).send('Cadastrado com sucesso')
        }
    })
  },

  async deleteComputador(req, res) {
    const id = req.params.id
    await pool.query('DELETE * FROM computadores WHERE id = $1', [id], (error, results) => {
      if (results) {
        return res.status(200).send('Removido com sucesso')
      }
    })
  }
}