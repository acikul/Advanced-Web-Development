var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, function(err) {
    if (err) {
        // cannot establish connection to database
        console.log(err.message) 
        throw err
    } else {
        //console.log('connection to sqlite database established')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            CONSTRAINT email_unique UNIQUE(email)
        )`, (err) => {
            if (err) {
                // table already exists
            } else {
                // table successfully created, proceed with inserting rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin", "admin@email.com", md5("adminko123")])
                db.run(insert, ["user1", "user1@email.com", md5("user1_pass")])
                db.run(insert, ["user2", "user2@email.com", md5("user2_pass")])
            }
        })
        //console.log('created table')
    }
});

module.exports = db