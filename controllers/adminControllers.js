const bl = require("../BL/flights-service-bl")

module.exports.removeAirline = async (req, res) => {
    try {
        params = { id: req.params.airline_id };
        //var trxId = await trx.trx_keeper(req.url,'removeAirline',params)
        result = await bl.removeAirline(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(204).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getAllCustomers = async (req, res) => {
    try {
        //var trxId = await trx.trx_keeper(req.url,'getAllCustomers',null)
        result = await bl.getAllCustomers();
        //trx.trx_keeper_update(trxId,result)
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.removeCustomer = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        //var trxId = await trx.trx_keeper(req.url,'removeCustomer',params)
        result = await bl.removeCustomer(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(204).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getAllUsers = async (req, res) => {
    try {
        //var trxId = await trx.trx_keeper(req.url,'getAllUsers',null)
        result = await bl.getAllUsers();
        //trx.trx_keeper_update(trxId,result)
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getUserById = async (req, res) => {
    try {
        params = { id: req.params.user_id };
        //var trxId = await trx.trx_keeper(req.url,'getUserById',params)
        result = await bl.getUserById(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

