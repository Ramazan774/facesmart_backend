const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await db.transaction(async (trx) => {
      const loginEmail = await trx('login')
        .insert({
          hash: hash,
          email: email
        })
        .returning('email');

      const newUser = await trx('users')
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: new Date()
        })
        .returning('*');

      return newUser[0];
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json('Unable to register');
  }
}

module.exports = {
  handleRegister: handleRegister
};