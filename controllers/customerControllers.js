const bl = require("../BL/flights-service-bl")

module.exports.addCustomer = async (req, res) => {
    try {
        params = req.body;
        //var trxId = await trx.trx_keeper(req.url,'addCustomer',params)
        result = await bl.addCustomer(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(201).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getCustomerById = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        //var trxId = await trx.trx_keeper(req.url,'getCustomerById',params)
        result = await bl.getCustomerById(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getTicketsByCustomer = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        //var trxId = await trx.trx_keeper(req.url,'getTicketsByCustomer',params)
        result = await bl.getTicketsByCustomer(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.addTicket = async (req, res) => {
    try {
        params = req.body;
        //var trxId = await trx.trx_keeper(req.url,'addTicket',params)
        result = await bl.addTicket(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(201).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.updateCustomer = async (req, res) => {
    try {
        params = req.body;
        //var trxId = await trx.trx_keeper(req.url,'updateCustomer',params)
        result = await bl.updateCustomer(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(201).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.removeTicket = async (req, res) => {
    try {
        params = { id: req.params.ticket_id };
        //var trxId = await trx.trx_keeper(req.url,'removeTicket',params)
        result = await bl.removeTicket(params);
        //trx.trx_keeper_update(trxId,result)
        await res.status(204).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

