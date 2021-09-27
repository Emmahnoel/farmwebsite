var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const app = express();




/* GET contact page. */
router.get('/', function(req, res, next) {
  // res.render('contact');
  res.render('contact', {msg:''});
});

router.post('/', (req, res,) => {
  //send email here
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.full_name}</li>
      <li>Email: ${req.body.user_email}</li>
      <li>Phone Number: ${req.body.phoneNumber}</li> 
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'fe4fef4bfb901a', // generated ethereal user
      pass: 'a8fab7f8b66424', // generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer Contact" <emmanuelnoeleshiebor@gmail.com>', // sender address
    to: "emmanuel.eshiebor@stu.cu.edu.ng", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  //send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info)=>{
    if(error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render('contact', {msg:'Email has been sent'});
  });

});

module.exports = router;