// create express app
const express = require('express');
const app = express();

//multer middleware
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

var fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'));
app.set('view engine', 'pug')
app.use(express.json())

//sqlite3 database
var db = require("./public/js/database.js")

//xml parsing library
var libxmljs = require("libxmljs");

//za parsirat search name iz body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//______________________________________________________________________________________________________________

//starting up the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("app started running on port: %PORT%".replace("%PORT%", port));
})

//globalni security switch i handler za post kod mijenjanja
global.securitySetting = 0;
app.get('/changesecurity', (req, res) => {
	switch (securitySetting) {
		case 0:
			securitySetting = 1
			break;
		case 1:
			securitySetting = 0
			break;
	}
	res.redirect('back');
})


//______________________________________________________________________________________________________________


// homepage
app.get('/',  function (req, res) {
    res.render('index', {user : "user", title: 'Web2-projekt2', last5users: []});
});


//SQL INJECTION

app.get('/usersearch', (req, res) => {
	res.render('search', {users: null})
})

app.post('/usersearch', (req, res) => {
	//sql incjectable
	if (securitySetting == 0) {
		var sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
		var params = []
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({"error": err.message})
				return;
			}
			console.log("dobavljeni user/i: ", rows)
			res.render('search', {users: rows})
		})
	}
	//prevent sql injection
	if (securitySetting == 1) {
		var sql = "SELECT * FROM user WHERE name = ?";
		var params = [req.body.name]
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({"error": err.message})
				return;
			}
			//console.log("dobavljeni user/i: ", rows)
			res.render('search', {users: rows})
		})
	}
})

	
//BROKEN ACCESS

var currentUserId = 2

app.get('/users', (req, res, next) => {
	// when low security get all users
	// but when high security get user only if id is admin
	if ((securitySetting == 0) || (securitySetting == 1 &&  currentUserId == 1)) {
		var sql = "SELECT * FROM user"
		var params = []
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({"error":err.message});
				return;
			}
			res.render('users', {users: rows})
		})
	} else {
		res.status(403);
		res.render('users', {status: 403, users: null})
	}
})

app.get("/users/:id", (req, res) => {
	// when low security get user
	// but when high security get user only if id is the same as logged in user (scenario where user1 is logged in)
	if ((securitySetting == 0) || (securitySetting == 1 && req.params.id == 2)) {
		var sql = "SELECT * FROM USER WHERE id = ?"
		var params = [req.params.id]
		db.get(sql, params, (err, row) => {
			if (err) {
				res.status(400).json({"error": err.message})
				return;
			}
			//console.log("dobavljeni user/i: ", rows)
			res.render('profile', {status: 200, user: row})
		})
	} else {
		res.status(403);
		res.render('profile', {status: 403, user: null})
	}
})


// XXE

app.get("/complaint", (req, res) => {
	res.render('complaint', {message: null, cmplntname:null, cmplnttxt:null})
})

app.post("/complaint", upload.single('complaint'), (req, res) => {

	if (req.file && req.file.mimetype=='text/xml') {
		var stringed = req.file.buffer.toString()

		if (securitySetting == 0) {
			var parsedFile = libxmljs.parseXmlString(stringed, {noent:true, noblanks:true, nocdata:true})	
		}
		if (securitySetting == 1) {
			var parsedFile = libxmljs.parseXmlString(stringed, {noent:false, noblanks:true, nocdata:true})
		}
		
		var cmplntname = parsedFile.root().childNodes()[0].text();
		var cmplnttxt = parsedFile.root().childNodes()[1].text();

		res.render('complaint', {message: null, cmplntname:cmplntname, cmplnttxt:cmplnttxt})
	} else {
		res.render('complaint', {message: "Invalid file!", cmplntname:null, cmplnttxt:null})
	}
})



//default response for other requests:
app.use(function(req, res) {
	res.status(404);
	res.json({ error: '404 Not found' });
    return;
});