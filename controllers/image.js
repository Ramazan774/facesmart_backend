const handleImage = (req, res, pg) => {
    const { id } = req.body;
    pg('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    }).catch(err => res.status(400).json('Unable to get entries'))
  }

  module.exports = { handleImage };