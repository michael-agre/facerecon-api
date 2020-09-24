function handleRegister(req, res, db, bcrypt) {
	const { email, name , password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('Incorrect Form Submission')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('log_in')
		.returning('email')
		.then(regEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email: regEmail[0],
					name: name,
					joined: new Date()
				})
			   .then(user => {
			  		res.status(200).json(user[0]);
			   })
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(403).json("Unable to Register"))
}

module.exports = {
	handleRegister: handleRegister
};