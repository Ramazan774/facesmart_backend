const handleSignin = async (req, res, pg, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    try {
        const data = await pg('login')
            .select('email', 'hash')
            .where('email', '=', email);

        if(!data.length) {
            return res.status(400).json('Wrong credentials.');
        }

        const isValid = await bcrypt.compare(password, data[0].hash);

        if(isValid) {
            const user = await pg('users')
                .select('*')
                .where('email', '=', email);

            if(user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Unable to get the user');
            }
        } else {
            res.status(400).json('Wrong credentials');
        }
    } catch(err) {
        console.error(err)
        res.status(400).json('Error signing in');
    }
};

module.exports = {
    handleSignin: handleSignin
};