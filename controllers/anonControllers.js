const bl = require("../BL/flights-service-bl")

module.exports.getAllAirlineCompanies = async (req, res) => {
  try {
    result = await bl.getAllAirlineCompanies();
    await res.status(200).json({ result });
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getAllFlights = async (req, res) => {
  try {
    result = await bl.getAllFlights();
    await res.status(200).json({ result });
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getFlightById = async (req, res) => {
  try {
    params = { id: req.params.flight_id }
    await bl.getFlightById(params).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });
    })
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getAirlineById = async (req, res) => {
  try {
    params = { id: req.params.airline_id }
    await bl.getAirlineById(params).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });
    })
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getFlightsByAirlineId = async (req, res) => {
  try {
    params = { id: req.params.airline_id }
    await bl.getFlightsByAirlineId(params).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });

    })
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getArrivalFlights = async (req, res) => {
  try {
    params = { id: req.params.country_id }
    await bl.getArrivalFlights(params).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });

    })
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getDepartureFlights = async (req, res) => {
  try {
    params = { id: req.params.country_id }
    await bl.getDepartureFlights(params).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });

    })
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getAllCountries = async (req, res) => {
  try {
    result = await bl.getAllCountries();
    await res.status(200).json({ result });
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
module.exports.getFlightsByParameters = async (req, res) => {
  try {
    param.origin_country_id = Int.preq.query.origin_country_id;
    console.log(param)
    await bl.getFlightsByParameters(param).then((result)=>{
      res.status(result.length == 0 ? 404 : 200).json({ result });
    })  
  }
  catch (err) {
    res.status(400).json({ err });
  }
}
  //addCustomer belongs to the customer dao by initial design
  //add airline belongs to the airline
