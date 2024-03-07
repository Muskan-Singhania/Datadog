var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/Muskan');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
    alert('enter the valid phone number');
}

function validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
}

app.post('/sign_up', function(req,res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email =req.body.email;
	var phone =req.body.phone;
	var user = req.body.user;
	var pass = req.body.password;
	var dob =req.body.dob;

	if (!validatePhoneNumber(phone)) {
        return res.status(400).send('Invalid phone number');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    if (!validatePassword(pass)) {
        return res.status(400).send('Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
    }


	var data = {
		"firstName":firstName,
		"lastName":lastName,
		"email":email,
		"phone":phone,
		"username":user,
		"password":pass,
		"date of birth":dob
		
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
        console.log(data);
			
	});	
	return res.json(data);
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3002)


console.log("server listening at port 3002");


/*
var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/Muskan');

var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
}

app.post('/sign_up', function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var user = req.body.user;
    var pass = req.body.password;
    var dob = req.body.dob;

    if (!validatePhoneNumber(phone)) {
        return res.status(400).send('Invalid phone number');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    if (!validatePassword(pass)) {
        return res.status(400).send('Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
    }

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone": phone,
        "username": user,
        "password": pass,
        "date of birth": dob
    }
    db.collection('data').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");
        console.log(data);

    });
    return res.json(data);
})

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
})


app.listen(3001, function () {
    console.log("server listening at port 3001");
});

*/