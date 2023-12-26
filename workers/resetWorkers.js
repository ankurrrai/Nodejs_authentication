const queue=require('../config/kue');
const commentsMailer=require('../mailers/reset_password');

queue.process('resets',function(job,done){
    commentsMailer.newComment(job.data)
    done();
})
