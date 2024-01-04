const nodemailer=require('../config/nodemailers');

// Resets Pass settings
exports.resetPass=(accessToken)=>{
    let htmlString=nodemailer.renderTemplate({accessToken:accessToken,hostURL:process.env.NodeJsAuthenTicationHostURL},'/resetPassword.ejs')
    nodemailer.transporter.sendMail({
        from:process.env.smartConnect_smtp_auth_userName+'@gmail.com',
        to:accessToken.user.email, 
        subject:'Reset the Password',
        html:htmlString,
    },function(err,info){
        if (err){console.log('error while sending the email : ',err);return}
    })
}