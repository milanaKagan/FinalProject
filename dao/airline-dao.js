const raw_repo = require('../db/raw_repo')
const logger_repo = require('../logger')

function try_func(f) {
        try {
                return f();
        }
        catch (e) {
                return e.message
        }
}
function delete_customer(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: delete_customer function: id is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_customer(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline-dao: customer with ${id} was deleted, result: ${result.rows[0].sp_delete_customer}`
                            });
                        return result.rows[0].sp_delete_customer;
                }
        }
        return try_func(f);
}
function delete_flight_tickets(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: delete_flight_tickets function: id is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_flight_tickets(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline-dao: flight with ${id} was deleted, result: ${result.rows[0].sp_delete_flight_tickets}`
                            });
                        return result.rows[0].sp_delete_flight_tickets;
                }
        }
        return try_func(f);
}
function get_airline_by_username(username) {

        const f = async () => {
                if (username == '' || username == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: get_airline_by_username function: username is null or empty'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_airline_by_username('${username}')`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline-dao:  get airline by username ${username} request`
                            })
                        return result.rows;
                }
        }
        return try_func(f);
}
function insert_flight(airlineId, originCountryId, destinationContryId, departureTime, landingTime, remainingTickets) {

        const f = async () => {
                if (airlineId <= 0 || airlineId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: airlineId is invalid'
                            });
                        return -1;
                }
                if (originCountryId <= 0 || originCountryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: originCountryId is invalid'
                            });
                        return -1;
                }
                if (destinationContryId <= 0 || destinationContryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: destinationContryId is invalid'
                            });
                        return -1;
                }
                if (departureTime == '' || departureTime == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: departureTime is null or empty'
                            });
                        return -1;
                }
                if (landingTime == '' || landingTime == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: landingTime is null or empty'
                            });
                        return -1;
                }
                if (remainingTickets <= 0 || remainingTickets == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'airline-dao: insert_flight function: remainingTickets is invalid'
                            });
                        return -1;
                }
                else {

                        const result = await raw_repo
                                .getRawResult(`select * from sp_insert_flight(${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                                logger_repo.log({
                                        level: 'info',
                                        message: `airline-dao: flight was inserted id : ${result.rows[0].sp_insert_flight}`
                                    });
                                return result.rows[0].sp_insert_flight;
                }
        }
        return try_func(f);
}
function update_flight(id, airlineId, originCountryId, destinationContryId, departureTime, landingTime, remainingTickets) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: id is invalid`
                            });
                        return -1;
                }
                if (airlineId <= 0 || airlineId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: airlineId is invalid`
                            });
                        return -1;
                }
                if (originCountryId <= 0 || originCountryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: originCountryId is invalid`
                            });
                        return -1;
                }
                if (destinationContryId <= 0 || destinationContryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: destinationContryId is invalid`
                            });
                        return -1;
                }
                if (departureTime == '' || departureTime == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: departureTime is null or empty`
                            });
                        return -1;
                }
                if (landingTime == '' || landingTime == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: landingTime is null or empty`
                            });
                        return -1;
                }
                if (remainingTickets <= 0 || remainingTickets == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_flight function: remainingTickets is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_update_flight(${id},${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                                
                                logger_repo.log({
                                        level: 'info',
                                        message: `airline-dao: flight with ${id} was updated, result: ${result.rows[0].sp_update_flight}`
                                    });
                                    return result.rows[0].sp_update_flight;
                }
        }
        return try_func(f);
}
function update_airline(id, name, countryId, userId) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_airline function: id is invalid`
                            });
                        return -1;
                }
                if (name == '' || name == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_airline function: name is null or empty`
                            });
                        return -1;
                }
                if (countryId <= 0 || countryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_airline function: countryId is invalid`
                            });
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `airline-dao: update_airline function: userId is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_airline(${id},'${name}',${countryId},${userId})`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline-dao: airline with id ${id} was updated, result ${result.rows[0].sp_update_airline}`
                            });
                        return result.rows[0].sp_update_airline;
                }
        }
        return try_func(f);
}
module.exports = {
        delete_customer,
        delete_flight_tickets,
        get_airline_by_username,
        insert_flight,
        update_airline,
        update_flight
}