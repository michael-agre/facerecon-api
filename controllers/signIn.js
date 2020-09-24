function handleSignIn(req, res, db, bcrypt) {

	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect Form Submission')
	}

	db.select('email', 'hash').from('log_in')
	.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash)
			if (isValid) {
				return db.select('*').from('users').where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => {
					res.status(400).json('Unable to Get Profile')
				})
			} else {
				res.status(400).json('Unable Log In')
			}
		})
		.catch(err => res.status(400).json('Unable Log In'))
}

module.exports = {
	handleSignIn: handleSignIn
};