const handleProfileGet = (req, res, pg) => {
    const { id } = req.params;
    pg.select('*').from('users').where({id})
      .then(user => {
        if(user.length){
          res.json(user[0])
        }else {
          res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
  }

  module.exports = {
    handleProfileGet
  }