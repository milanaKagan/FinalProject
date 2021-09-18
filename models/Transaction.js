const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'Please enter an url'],
        lowercase: true,
    },
    request: {
        type: String,
        required: [true, 'Please enter a request'],    
    },
    params: {
        type: Object 
    },
    response :{
        type: String
    }
});


const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;
