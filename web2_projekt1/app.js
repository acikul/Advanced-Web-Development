const express = require('express');
var fs = require('fs')
var https = require('https')
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'));
app.set('view engine', 'pug')

app.use(express.json())

// app.set('trust proxy', true)

const { auth, requiresAuth } = require('express-openid-connect'); 
const port = process.env.PORT || 3000;

const config = { 
  authRequired : false,
  auth0Logout : true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_URL,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code' ,
    //scope: "openid profile email"   
   }
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

var last5users = []

app.get('/',  function (req, res) {
    req.user = {
        isAuthenticated : req.oidc.isAuthenticated()
    };
    if (req.user.isAuthenticated) {
        req.user.name = req.oidc.user.name;
    }
    res.render('index', {user : req.oidc.user, title: 'Web2-projekt1', last5users: last5users});
});

app.get('/profile', requiresAuth(), function (req, res) {            
    res.render('profile', {user: req.oidc.user}); 
});

app.post('/locatedUser', requiresAuth(), (req, res) => {
    //console.log(req.body)
    var listItem = {
        name: req.oidc.user.name,
        time: req.oidc.user.updated_at,
        lat: req.body.lat,
        long: req.body.long
    }
    addToList(listItem)
    console.log(last5users)

    res.json({name: listItem.name, time: listItem.time})
})

app.get('/last5', requiresAuth(), (req, res) => {
    res.json(last5users)
})

function addToList(listItem) {
    for (let i = 0; i < last5users.length; i++) {
        const current = last5users[i];
        if (current.name === listItem.name) {
            last5users.splice(i, 1)
        }
    }
    last5users.push(listItem)

    while (last5users.length > 5) {
        last5users.splice(0,1)
    }
    
}




if (process.env.PORT) {
  app.listen(process.env.PORT)
} else {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Server running at https://localhost:${port}/`);
  });
}
//
//  openssl req -nodes -new -x509 -keyout server.key -out server.cert

