module.exports.setFlash=function(req,res,next){
    res.locals.flash={
       'success': req.flash('success'), //flash success
       'error':req.flash('error') //flash error
    }
    next();
};