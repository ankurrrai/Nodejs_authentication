const queue=require('../config/kue');
const resetPassword=require('../mailers/reset_password');

// Created the resets worker
queue.process('resets',function(job,done){
    resetPassword.resetPass(job.data)
    done();
})
