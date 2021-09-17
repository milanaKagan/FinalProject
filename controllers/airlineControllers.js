const bl = require("../BL/flights-service-bl")

module.exports.updateAirline = async (req, res) => {
  try{
    params = req.body;
    //var trxId = await trx.trx_keeper(req.url,'updateAirline',params)
    result = await bl.updateAirline(params);
    //trx.trx_keeper_update(trxId,result)
    await res.status(200).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.addFlight = async (req, res) => {
  try{
    params = req.body;
    //var trxId = await trx.trx_keeper(req.url,'addFlight',params)
    result = await bl.addFlight(params);
    //trx.trx_keeper_update(trxId,result)
    await res.status(201).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.updateFlight = async (req, res) => {
  try{
    params = req.body;
    //var trxId = await trx.trx_keeper(req.url,'updateFlight',params)
    result = await bl.updateFlight(params);
    //trx.trx_keeper_update(trxId,result)
    await res.status(200).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.removeFlight = async (req, res) => {
  try{
    params =  {id :req.params.flight_id };
    //var trxId = await trx.trx_keeper(req.url,'removeFlight',params)
    result = await bl.removeFlight(params);
    //trx.trx_keeper_update(trxId,result)
    await res.status(204).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}