const bl = require("../BL/flights-service-bl")

module.exports.getAllAirlineCompanies = async (req, res) => {
  try{
    result = await bl.getAllAirlineCompanies();
    await res.status(200).json({ result });
  }
  catch(err){
    res.status(400).json({ err });
  }
}
module.exports.getAllFlights = async (req, res) => {
    try{
      result = await bl.getAllFlights();
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
module.exports.getFlightById = async (req, res) => {
    try{
      params = {id :req.params.flight_id }
      result = await bl.getFlightById(params);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getAirlineById = async (req, res) => {
    try{
      params = {id :req.params.airline_id }
      result = await bl.getAirlineById(params);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getFlightsByAirlineId = async (req, res) => {
    try{
      params = {id :req.params.airline_id }
      result = await bl.getFlightsByAirlineId(params);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getArrivalFlights = async (req, res) => {
    try{
      params = {id :req.params.country_id }
      result = await bl.getArrivalFlights(params);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getDepartureFlights = async (req, res) => {
    try{
      params = {id :req.params.country_id }
      result = await bl.getDepartureFlights(params);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getAllCountries = async (req, res) => {
    try{
      result = await bl.getAllCountries();
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  module.exports.getFlightsByParameters = async (req, res) => {
    try{
      param = req.body;
      result = await bl.getFlightsByParameters(param);
      await res.status(200).json({ result });
    }
    catch(err){
      res.status(400).json({ err });
    }
  }
  //addCustomer belongs to the customer dao by initial design
  //add airline belongs to the airline
