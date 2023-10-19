const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path');

var api_key = '3a2b294f51ed13e1c1efcda1dc1a670d-3750a53b-95bea6df';
var domain = 'sandboxa5846046c38a41ba9577ae65ca867b4a.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.Email

    const to_say = {
        from: 'BK <brahamjot7979@gmail.com>',
        to: Email,
        subject: "Welcome",
        text: "Welcome, Thanks to Subscribing to our product, you will recieve daily updates here."
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('Their was an error');
        }

        console.log(body);
        res.send(__dirname + '/index.html');
    });

});

application.listen(4500, () => {
    console.log("Server is running at port 4500")
})