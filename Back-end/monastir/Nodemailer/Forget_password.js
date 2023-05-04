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
function sendkeymail(email,id){
 var mailOptions = {
    from: 'Teamify',
    to:email,
    attachments: [{
      filename: 'stadium.png',
      path: 'Nodemailer/stadium.png',
      cid: 'unique@cid'
  }],
    subject: 'Password Key',
html:`<h2 style='text-align: center;'>Teamify</h2> 
<img style="width:100px; text-align:center;display:block; margin-left:auto; margin-right:auto"  src='cid:unique@cid'>
<hr/>
<div style='text-align: center;'>
<h4>We received a request to reset your Teamify password.</h4>
<h4>Enter the following reset code:</h4>
 <h3 style='border:1px solid black;background-color:grey;padding:5px;width:100px;display:block; margin-left:auto; margin-right:auto'>${id}  </h3> 
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

module.exports = { sendkeymail }
 