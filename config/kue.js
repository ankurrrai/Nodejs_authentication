const kue=require('kue');
const queue=kue.createQueue();

// This queue is used to share the email

module.exports=queue