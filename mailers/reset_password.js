const nodemailer=require('../config/nodemailers');

exports.newComment=(accessToken)=>{
    let htmlString=nodemailer.renderTemplate({accessToken:accessToken,hostURL:'localhost:8000'},'/resetPassword.ejs')
    nodemailer.transporter.sendMail({
        from:process.env.smartConnect_smtp_auth_userName+'@gmail.com',
        to:accessToken.user.email, 
        subject:'Reset the Password',
        html:htmlString,
        // text:'Regards'
    },function(err,info){
        if (err){console.log('error while sending the email : ',err);return}
        // console.log('Email Sent',info)
    })
}