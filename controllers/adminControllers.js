const bl = require("../BL/flights-service-bl")
const trx = require("../models/Transaction")


module.exports.removeAirline = async (req, res) => {
    try {
        _params = { id: req.params.airline_id };
        obj = { url: req.url, request: 'removeAirline', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;
        });
        _result = await bl.removeAirline(_params);
        await res.status(204).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getAllCustomers = async (req, res) => {
    try {
        result = await bl.getAllCustomers();
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.removeCustomer = async (req, res) => {
    try {
        _params = { id: req.params.customer_id };
        obj = { url: req.url, request: 'removeCustomer', params: _params, result: null };
        await trx.create(obj, function (err, res) {
            if (err) throw err;
        });
        _result = await bl.removeCustomer(_params);
        await res.status(204).json({ _result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getAllUsers = async (req, res) => {
    try {
        result = await bl.getAllUsers();
        await res.status(200).json({ result });
    }
    catch (err) {
        res.status(400).json({ err });
    }
}
module.exports.getUserById = async (req, res) => {
    try {
        params = { id: req.params.user_id };
        await bl.getUserById(params).then((result)=>{
            res.status(result.length == 0 ? 404 : 200).json({ result });
          })  
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

