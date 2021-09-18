// controller actions
const trx = require("../models/Transaction")

module.exports.getAllTransactions = async (req, res) => {
    try { 
        var result = await trx.find({});
        res.status(200).json({result});
    }
    catch (err) {
        res.status(400).json({ err });
    }

}
