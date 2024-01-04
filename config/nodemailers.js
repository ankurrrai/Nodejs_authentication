const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

// Give the transporter details
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.smartConnect_smtp_auth_userName, //Add the User name
        pass:process.env.smartConnect_smtp_auth_pass //Add the user password
    }
})

// To give mailers views path which need to share over mail
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if (err){console.log('Error while render the ejs file as HTML',err);return;}
            mailHTML=template
        }
    )
    return mailHTML
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}