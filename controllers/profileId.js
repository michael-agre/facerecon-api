function handleProfileId(req, res, db) {
	const { id } = req.params;

	db.select('*').from('users').where({id})
	.then(user => {
		if(user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Unable to find profile id')
		}
	})

}

module.exports = {
	handleProfileId: handleProfileId
};