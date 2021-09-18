const bl = require("../BL/flights-service-bl")
const trx = require("../models/Transaction")
module.exports.addCustomer = async (req, res) => {
    try {
        _params = req.body;
        obj = { url: req.url, request: 'addCustomer', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;

        });
        _result = await bl.addCustomer(_params);

        await res.status(201).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getCustomerById = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        result = await bl.getCustomerById(params);
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getTicketsByCustomer = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        result = await bl.getTicketsByCustomer(params);
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.addTicket = async (req, res) => {
    try {
        _params = req.body;
        obj = { url: req.url, request: 'addTicket', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;

        });
        _result = await bl.addTicket(_params);
        await res.status(201).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.updateCustomer = async (req, res) => {
    try {
        _params = req.body;
        obj = { url: req.url, request: 'updateCustomer', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;

        });
        _result= await bl.updateCustomer(_params);
        await res.status(201).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.removeTicket = async (req, res) => {
    try {
        _params = { id: req.params.ticket_id };
        obj = { url: req.url, request: 'removeTicket', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;
        });
        _result= await bl.removeTicket(_params);
        await res.status(204).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

