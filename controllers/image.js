const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd5325780f3af48a5a94b56dade63e90c'
});

function handleApiCall(req, res) {
	console.log("am i here?")
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('API failure'))
}

function handleImage(req, res, db) {
	const { id } = req.body;

	db.from('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then (entries => {
		if(entries.length) {
			res.json(entries[0]);
		} else {
			res.status(400).json('User ID not found')
		}
	})
	.catch(err => {
		res.status(400).json('Error in increment fetch')
	})

}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};