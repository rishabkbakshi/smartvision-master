const handleLogin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json("Incomplete login details")
    }

    db.select('email', 'hash').from('login')
    .where({
        'email': email
    })
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                console.log("[LOGIN_API_RES]: ",user[0])
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong password')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleLogin: handleLogin
}