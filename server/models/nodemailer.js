var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {
    sendeMail:async (req) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.NEW_FAKE_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
       });

        var mailOptions = {
            from: process.env.USER,
            to: req.to,
            subject: req.subject,
            html:await req.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(info.response)
               
            }
        });
        return req

    },   
}