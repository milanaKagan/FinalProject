
const bl = require("../BL/flights-service-bl")

module.exports.getAllAirlineCompanies = async (req, res) => {
  try{
    //var trxId = await trx.trx_keeper(req.url,'getAllAirlineCompanies',null)
    result = await bl.getAllAirlineCompanies();
    //trx.trx_keeper_update(trxId,result)
    await res.status(200).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.getAllFlights = async (req, res) => {
    try{
      //var trxId = await trx.trx_keeper(req.url,'getAllFlights',null)
      result = await bl.getAllFlights();
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
module.exports.getFlightById = async (req, res) => {
    try{
      params = {id :req.params.flight_id }
      //var trxId = await trx.trx_keeper(req.url,'getFlightById',params)
      result = await bl.getFlightById(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getAirlineById = async (req, res) => {
    try{
      params = {id :req.params.airline_id }
      //var trxId = await trx.trx_keeper(req.url,'getAirlineById',params)
      result = await bl.getAirlineById(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getFlightsByAirlineId = async (req, res) => {
    try{
      params = {id :req.params.airline_id }
      //var trxId = await trx.trx_keeper(req.url,'getFlightsByAirlineId',params)
      result = await bl.getFlightsByAirlineId(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getArrivalFlights = async (req, res) => {
    try{
      params = {id :req.params.country_id }
      //var trxId = await trx.trx_keeper(req.url,'getArrivalFlights',params)
      result = await bl.getArrivalFlights(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getDepartureFlights = async (req, res) => {
    try{
      params = {id :req.params.country_id }
      //var trxId = await trx.trx_keeper(req.url,'getDepartureFlights',params)
      result = await bl.getDepartureFlights(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getAllCountries = async (req, res) => {
    try{
      //var trxId = await trx.trx_keeper(req.url,'getAllCountries',null)
      result = await bl.getAllCountries();
      //trx.trx_keeper_update(trxId,result)
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
 /* module.exports.addUser = async (req, res) => {
    try{
      params = req.body;
      //var trxId = await trx.trx_keeper(req.url,'getAllCountries',params)
      result = await bl.addUser(params);
      //trx.trx_keeper_update(trxId,result)
      await res.status(201).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }*/ 
//addCustomer belongs to the customer dao by initial design

/*

checkUsernameAvailability ()
getFlightsByParameters  ()
*/