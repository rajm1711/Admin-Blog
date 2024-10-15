const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    contact : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
    
})  


module.exports = mongoose.model('User', messageSchema);

                                                                                                                                                                                

