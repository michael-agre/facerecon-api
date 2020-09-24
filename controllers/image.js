const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI_KEY
});

function handleApiCall(req, res) {
	
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