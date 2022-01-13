const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { connectToMongo } = require('./database');
const { db } = require('./database/index')
const nodemailer = require('nodemailer');

const api = require('./api')

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json());

app.post('/register', async (req, res) => {
    const users = await db.users.insertOne({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        token: '',
        rent: [],
        purchase: [],
    })


})

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.users.find({ email: email, password: password }).toArray()
    if (user.length < 1) {
        res.status(401).send("Wrong email or password");

        return;
    }
    const emailUser = user[0].email

    const token = jwt.sign(
        {
            email: emailUser,
        },
        "MY_SECRET_KEY",
        {
            expiresIn: 6000 * 60,
        }
    );

    db.users.updateOne(
        { email: email },
        {
            $set: {
                token: token
            }
        }
    )

    res.json({
        username: { email: user[0].email, name: user[0].name, password: user[0].password },
        token: token,
    });
});



app.get('/allUser', async (req, res) => {
    const allUser = await db.users.find({}).toArray()
    res.json(allUser)
})

app.put('/user', async (req, res) => {
    const name = req.body.name
    const email = req.body.email

    const newUser = await db.users.updateOne(
        { email: email },
        {
            $set: {
                name: name
            }
        }
    )
    const user = await db.users.find({ email: email }).toArray()
    res.json({
        email: user[0].email,
        name: user[0].name
    })

})


app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send("jwt missing");
        return;
    }
    const jwtStr = token.split(" ")[1];
    jwt.verify(jwtStr, "MY_SECRET_KEY", async (err, decoded) => {
        if (err) {
            res.status(401).send("invalid jwt");
        } else {
            const emailUser = decoded.email;
            const user = await db.users.find({ email: emailUser }).toArray()
            if (user) {
                res.json({ name: user[0].name, email: user[0].email, password: user[0].password });
            } else {
                res.status(401).send("User not found");
            }
        }
    });
});





app.put('/purchase', async (req, res) => {

    const idMovie = req.body.idMovie
    const nameMovie = req.body.nameMovie
    const overview = req.body.overview
    const releaseDate = req.body.releaseDate
    const poster_path = req.body.poster_path
    const category = req.body.category
    const email = req.body.email
    const date = req.body.date
    const time = req.body.time

    console.log(releaseDate);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'quochuy11081999@gmail.com',
            pass: 'bopdz123',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    var mailOptions = {
        from: 'quochuy11081999@gmail.com',
        to: email,
        subject: 'The movie has been purchased',
        text: `
        id: ${idMovie},
        name movie : ${nameMovie},
        date: ${date},
        time: ${time}
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    var new_info = {
        id: idMovie,
        name: nameMovie,
        overview: overview,
        releaseDate: releaseDate,
        poster_path: poster_path,
        category: category,
        email: email,
        date: date,
        time: time
    };

    db.users.updateOne(
        { email: email },
        {
            $push: {
                purchase: new_info
            }
        }
    )



    const newUser = await db.users.find({ email: email }).toArray()
    res.json(newUser[0])



})

app.put('/rent', async (req, res) => {

    const idMovie = req.body.idMovie
    const nameMovie = req.body.nameMovie
    const overview = req.body.overview
    const releaseDate = req.body.releaseDate
    const poster_path = req.body.poster_path
    const category = req.body.category
    const email = req.body.email
    const date = req.body.date
    const time = req.body.time

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'quochuy11081999@gmail.com',
            pass: 'bopdz123',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    var mailOptions = {
        from: 'quochuy11081999@gmail.com',
        to: email,
        subject: 'The movie has been rented',
        text: `
        id: ${idMovie},
        name movie : ${nameMovie},
        date: ${date},
        time: ${time}
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    var new_info = {
        id: idMovie,
        name: nameMovie,
        overview: overview,
        releaseDate: releaseDate,
        poster_path: poster_path,
        category: category,
        email: email,
        date: date,
        time: time
    };

    db.users.updateOne(
        { email: email },
        {
            $push: {
                rent: new_info
            }
        }
    )

    const newUser = await db.users.find({ email: email }).toArray()
    res.json(newUser[0])

})

app.post('/rent', async (req, res) => {
    const idMovie = req.body.idMovie
    const email = req.body.email

    const userDelete = await db.users.updateOne(
        { email: email },
        {
            $pull: {
                rent: { id: idMovie }
            }
        }
    )

    const newUser = await db.users.find({ email: email }).toArray()
    res.json(newUser[0])

})

app.get('/userUpdate', async (req, res) => {
    const token = req.headers.authorization
    const tokenStr = token.split(" ")[1];
    const userUpdate = await db.users.find({ token: tokenStr }).toArray()
    res.json(userUpdate)
})


app.listen(5000, () => {
    console.log("App is running at 5000");
    connectToMongo()
})