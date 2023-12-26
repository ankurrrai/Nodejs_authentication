

const development={

    name:'development',
    smartConnect_session_screctKey:'smartConnect',
    smartConnect_smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.smartConnect_smtp_auth_userName,
            pass:process.env.smartConnect_smtp_auth_pass
        }
    },
    smartConnect_google_clientId:process.env.smartConnect_google_clientId,
    smartConnect_google_screctKey:process.env.smartConnect_google_secrectKey,
    smartConnect_google_callback_url:'http://localhost:8000/users/auth/google/callback',

    smartConnect_jwt_screctKey:'d5Cj3dWx3JcCVgWVmOd54yl68600g8Ze',

}


const production={
    name:'production',
    smartConnect_session_screctKey:process.env.smartConnect_session_serectKey,
    smartConnect_smtp:{
        service:process.env.smartConnect_smtp_service,
        host:process.env.smartConnect_smtp_host,
        port:587,
        secure:false,
        auth:{
            user:process.env.smartConnect_smtp_auth_userName,
            pass:process.env.smartConnect_smtp_auth_pass
        }
    },
    smartConnect_google_clientId:process.env.smartConnect_google_clientId,
    smartConnect_google_screctKey:process.env.smartConnect_google_secrectKey,
    smartConnect_google_callback_url:process.env.smartConnect_google_callBackURL,

 

}

module.exports=eval(process.env.NODE_ENV)==undefined ? development:eval(process.env.NODE_ENV);