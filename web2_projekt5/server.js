const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fse = require('fs-extra');
const webpush = require('web-push');
const PORT = process.env.PORT || 7070;


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index', {title: 'w2p5'})
})

app.get('/add', (req, res) => {
    res.render('add', {title: 'w2p5'})
})

app.get('/404', (req, res) => {
    res.render('404', {title: 'w2p5'})
})

app.get('/offline', (req, res) => {
    res.render('offline', {title: 'w2p5'})
})

var geocaches = [{latitude: 45.829460, longitude: 16.020974, desc: "Geocache in Maksimir Park."},
                 {latitude: 45.898895, longitude: 15.948885, desc: "Geocache on Sljeme."}
                ]

app.get('/getCaches', (req, res) => {
    res.json(geocaches)
})

app.post('/geocaches', async (req, res) => {
    console.log("stigao geocahche: ", req.body)
    geocaches.push(req.body)

    await sendPushNotifications(req.body.desc)

    res.sendStatus(200)
})

let subscriptions = []

app.post('/subscribe', (req, res) => {
    console.log(req.body)
    let sub = req.body.sub
    subscriptions.push(sub)
    res.sendStatus(200)
})

async function sendPushNotifications(geocacheDesc) {
    webpush.setVapidDetails('mailto:luka.ilic@fer.hr', 
    'BCExywD43JjEzcKG0GNUZYPz3w390STL80MmyQMvxKtFrEuV2-Kqw_eBczqzK-uk7Bs6RgpFLAr5uKJKDq442E0', 
    'Ib2UrmPKzPL8wpC1z9qohko884Hov42O2o3AIoZqHDk');
    subscriptions.forEach(async sub => {
        try {
            console.log("Sending notif to", sub);
            await webpush.sendNotification(sub, JSON.stringify({
                title: 'New geocache!',
                body: 'A new geocache has been added. Description: ' + geocacheDesc,
                redirectUrl: '/'
              }));    
        } catch (error) {
            console.error(error);
        }
    });
}

app.listen(PORT, () => {
	console.log("app started running on port: %PORT%".replace("%PORT%", PORT));
})