const pool = require('../config/connectDB')

module.exports = {
      getManutencoes(req, res) {
        const page = req.params.page
        const limit = req.params.limit
        const offset = (page - 1) * limit
        pool.query('SELECT * FROM manutencoes ORDER BY id ASC LIMIT $1 OFFSET $2 ', [limit, offset], (error, results) => {
          if (error) {
            res.status(500).send(error)
          }
        return res.json(results.rows);
        })
      },

      getManutencoesLiberados(req, res) {
        const page = req.params.page
        const limit = req.params.limit
        const offset = (page - 1) * limit
        pool.query('SELECT * FROM manutencoes WHERE status = liberado ORDER BY id ASC LIMIT $1 OFFSET $2 ', [limit, offset], (error, results) => {
          if (error) {
            res.status(500).send(error)
          }
        return res.json(results.rows);
        })
      },

      createManutencao(req, res){
        const { id_equipamento, tipo, aberto, chamado, status, peca_solicitada, data_solicitacao, data_recebimento, defeito, detalhes, responsavel, data_inicio, data_saida} = req.body
        console.log(data_inicio)
            pool.query('INSERT INTO manutencoes (id_equipamento, tipo, aberto, chamado, status, peca_solicitada, data_solicitacao, data_recebimento, defeito, detalhes, responsavel, data_inicio, data_saida) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', [id_equipamento, tipo, aberto, chamado, status, peca_solicitada, data_solicitacao, data_recebimento, defeito, detalhes, responsavel, data_inicio, data_saida], (error, results) => {
              if (error) {
                console.log(error)
                return res.status(500).send(error)
                
              }else{
                return res.status(200).send('Sucesso')
              }
            })
          }   
        }