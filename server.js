const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');
const profileId = require('./controllers/profileId');

const db = knex({
  client: 'pg',
  connection: {
    connectionString :  process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: false
  	}
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data)
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Root is working!')})

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profileId.handleProfileId(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 2000, () => {
	console.log(`App Launched on Port ${process.env.PORT}`)
})