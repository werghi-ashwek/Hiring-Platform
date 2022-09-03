const express = require ('express')

const bodyparser = require('body-parser');

const passport = require('passport');

const users = require ('./routes/api/users');
const job = require ('./routes/api/jobs');
const message = require ('./routes/api/message');
const userform = require ('./routes/api/userform');

const mongoose = require ('mongoose');

const cors = require('cors');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;
//connect to the DB
mongoose
.connect(db)
.then(() => console.log("mongodb connected"))
.catch (err => console.log(err));

//passport middlewares
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use(cors());

//for body parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Routes
app.use('/api/users', users);

app.use('/api/jobs', job);

app.use('/api/message', message);

//user form route
app.use('/api/userform', userform);


//to upload the resume file in the front

app.post("/upload", (req, res) => {
    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 200);
});

// to delete the resume file
app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});


app.get('/', (req,res) =>{
    res.send("the back is on again")
    
});

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`server is running on port ${port}`));

