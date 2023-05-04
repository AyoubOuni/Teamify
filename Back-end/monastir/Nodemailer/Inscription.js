const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teamify.service@gmail.com',
      pass: 'jbdmrjisvtcqdecb'
    },tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    port: 465,
    host:'smtp.@gmail.com'
  });
function sendmail(email,nom){
 var mailOptions = {
    from: 'teamify.service@gmail.com',
    to:email,
    subject: 'Inscription',
    attachments: [{
      filename: 'stadium.png',
      path: 'Nodemailer/stadium.png',
      cid: 'unique@cid'
  }],
html:
`<h2 style='text-align: center;'>Teamify</h2> 
<img style="width:100px; text-align:center;display:block; margin-left:auto; margin-right:auto"  src='cid:unique@cid'>
<hr/>
<div style='text-align: center;'>
<h4>Hello ${nom} your inscription is validate!</h4>
<h4>You are welcome To Teamify.</h4>
<h1> &#128521;</h1>
 </div>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendmail }
 