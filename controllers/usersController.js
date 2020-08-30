const pool = require('../config/connectDB')

module.exports = {
  
  async logon(req, res) {
      
      const { email, senha } = req.body.data;
      
      const user = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]) 
      
      if(!user.rows[0]) {
        return res.status(400).send('User not found');
      }
      return res.json(user.rows[0]);
      },

  async getUsuarios(req, res) {

    const user = await pool.query('SELECT * FROM usuarios ORDER BY id ASC',) 
    if(!user.rows[0]) {
      return res.status(400).send('User not found');
    }
    return res.json(user.rows);
  
    
},

  async createUser(req, res, body){
      const { name, email, password, control } = req.body
      await pool.query('INSERT INTO usuarios (nome, email, senha, controle) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, control], (error, results) => {
        if (error) {
          res.status(500).send(error)
        }
        res.send('A new user has been added added:')
      })
  },

  async deleteUser(req, res){
      const id = parseInt(req.params.id)
      await pool.query('DELETE FROM usuarios WHERE id = $1', [id], (error, results) => {
        if (error) {
          res.status(500).send(error)
        }
        res.send(`User deleted with ID: ${id}`)
      })
  }
  
}