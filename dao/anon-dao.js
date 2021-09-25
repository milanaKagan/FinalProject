const raw_repo = require('../db/raw_repo')
const logger_repo = require('../logger')

async function try_func(f) {
        try {
               return await f();
        }
        catch (e) {
                return e.message
        }
}
function get_flight_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: get_flight_by_id function: id is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flight_by_id(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get flight by id ${id} request` 
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_flights_by_airline_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_flights_by_airline_id function: id is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flights_by_airline_id(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get flights by airline id ${id} request` 
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_flights_by_parameters(origin_country_id, destination_country_id, date) {

        const f = async () => {
                if (origin_country_id <= 0 || origin_country_id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_flights_by_parameters function: origin_country_id is invalid`
                            });
                        return -1;
                }
                if (destination_country_id <= 0 || destination_country_id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_flights_by_parameters function: destination_country_id is invalid`
                            });
                        return -1;
                }
                if (date == '' || date == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_flights_by_parameters function: date is null or empty`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flights_by_parameters(${origin_country_id},
                        ${destination_country_id},'${date}')`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get flights by parameters request`
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_arrival_flights(country_id) {

        const f = async () => {
                if (country_id <= 0 || country_id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: get_arrival_flights function: country_id is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_arrival_flights(${country_id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get arrival flights with country_id ${country_id}`
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_departure_flights(country_id) {

        const f = async () => {
                if (country_id <= 0 || country_id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: get_departure_flights function: country_id is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_departure_flights(${country_id})`);
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get departure flights with country_id ${country_id} `
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_all_flights() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_flights()`);
                logger_repo.log({
                        level: 'info',
                        message: `anon-dao: get all flights `
                    });
                return result.rows;
        }
        return try_func(f);
}
function get_country_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_country_by_id function: id is invalid ` 
                            })
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_country_by_id(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get country by id ${id} `
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_all_countries() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_countries()`);
                logger_repo.log({
                        level: 'info',
                        message: `anon-dao: get all countries request `
                    })
                return result.rows;
        }
        return try_func(f);
}
function get_all_airlines() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_airlines()`);
                logger_repo.log({
                        level: 'info',
                        message: `anon-dao: get all airlines `
                    })
                return result.rows;
        }
        return try_func(f);
}
function get_airline_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: get_airline_by_id function: id is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_airline_by_id(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `anon-dao: get airline by id ${id} `
                            })
                        return result.rows;
                }
        }
        return try_func(f);
}
function insert_user(username, password, email,role) {

        const f = async () => {
                if (username == '' || username == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: insert_user function: username is null or empty'
                            });
                        return -1;
                }
                if (role == '' || role == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: insert_user function: role is null or empty'
                            });
                        return -1;
                }
                if (password == '' || password == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: insert_user function: password is null or empty'
                            });
                        return -1;
                }
                if (password.length < 6) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: insert_user function: password less than 6 characters'
                            });
                        return -1;
                }
                if (email == '' || email == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'anon-dao: insert_user function: email is null or empty'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_user('${username}','${password}','${email}','${role}')`);
                        logger_repo.log({
                                level: 'error',
                                message: `anon-dao: insert user id ${result.rows[0].sp_insert_user}`
                            });
                        return result.rows[0].sp_insert_user;
                }
        }
        return try_func(f);
}
module.exports = {
        get_flight_by_id,
        get_all_flights,
        get_all_airlines,
        get_airline_by_id,
        get_all_countries,
        get_country_by_id,
        get_arrival_flights,
        get_departure_flights,
        get_flights_by_airline_id,
        get_flights_by_parameters,
        insert_user
}