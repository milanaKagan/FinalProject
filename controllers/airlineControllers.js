const bl = require("../BL/flights-service-bl")
const trx = require("../models/Transaction")
module.exports.updateAirline = async (req, res) => {
  try{
    _params = req.body;
    obj = { url: req.url, request: 'updateAirline', params: _params, result: null };
    await trx.create(obj, function (err, res) {
        if (err) throw err;
    });
    _result = await bl.updateAirline(_params);
    await res.status(200).json({ _result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.addFlight = async (req, res) => {
  try{
    _params = req.body;
    obj = { url: req.url, request: 'addFlight', params: _params, result: null };
    await trx.create(obj, function (err, res) {
        if (err) throw err;
    });
    _result = await bl.addFlight(_params);
    await res.status(201).json({ _result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.updateFlight = async (req, res) => {
  try{
    _params = req.body;
    obj = { url: req.url, request: 'updateFlight', params: _params, result: null };
    await trx.create(obj, function (err, res) {
        if (err) throw err;
    });
    _result = await bl.updateFlight(_params);
    await res.status(200).json({ _result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.removeFlight = async (req, res) => {
  try{
    _params =  {id :req.params.flight_id };
    obj = { url: req.url, request: 'removeFlight', params: _params, result: null };
    await trx.create(obj, function (err, res) {
        if (err) throw err;
    });
    _result = await bl.removeFlight(_params);
    await res.status(204).json({ _result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}