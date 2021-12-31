const { Console } = require("console");
const bl = require("../BL/flights-service-bl")
const trx = require("../models/Transaction")
module.exports.addCustomer = async (req, res) => {
    try {
        _params = req.body;
        obj = { url: req.url, request: 'addCustomer', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;
        });
        await bl.addCustomer(_params).then((_result)=>{
            res.status(_result == -1 || _result == 0 ? 400 : 201).json({ _result });

        });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getCustomerById = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        await bl.getCustomerById(params).then((result) => {
            res.status(result.length == 0 ? 404 : 200).json({ result });
        })
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getCustomerByUserName = async (req, res) => {
    try {
        params = { username: req.params.username };
        await bl.getCustomerByUsername(params).then((result) => {
            console.log(result)
            res.status(result.length == 0 ? 404 : 200).json({ result });
       
        })
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getTicketsByCustomer = async (req, res) => {
    try {
        params = { id: req.params.customer_id };
        await bl.getTicketsByCustomer(params).then((result) => {
            res.status(_result == -1 || _result == 0 ? 404 : 200).json({ result });
        })
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
        await bl.addTicket(_params).then((_result) => {
            res.status(_result == -1 || _result == 0 ? 400 : 201).json({ _result });
        });
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
        await bl.updateCustomer(_params).then((result) => {
            res.status(result == 0 ? 404 : 200).json({ result });
        })
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
        _result = await bl.removeTicket(_params);
        await res.status(204).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

