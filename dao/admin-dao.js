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
function delete_country_flights(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'delete_country_flights function: id is invalid'
                            });
                        console.log();
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_country_flights(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `flight with ${id} was deleted ${result.rows[0].sp_delete_country_flights.toString()}`
                            });
                        return result.rows[0].sp_delete_country_flights;
                }
        }
        return try_func(f);
}
function delete_customers_user(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'delete_customers_user function: id is invalid'
                            });
                        return -1;
                }
                else {
                        
                        const result = await raw_repo.getRawResult(`select * from sp_delete_customers_user(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `customer with ${id} was deleted : ${result.rows[0].sp_delete_customers_user.toString()}`
                            });
                        return result.rows[0].sp_delete_customers_user;
                }
        }
        return try_func(f);
}
function get_all_customers() {

        const f = async () => {
               
                const result = await raw_repo.getRawResult(`select * from sp_get_all_customers()`);
                logger_repo.log({
                        level: 'info',
                        message: `get all users request`
                    });
                return result.rows;
        }
        return try_func(f);
}
function get_all_tickets() {

        const f = async () => {
                
                const result = await raw_repo.getRawResult(`select * from  sp_get_all_tickets()`);
                logger_repo.log({
                        level: 'info',
                        message: `get all tickets request`
                    });
                return result.rows;
        }
        return try_func(f);
}
function get_all_users() {

        const f = async () => {
                
                const result = await raw_repo.getRawResult(`select * from sp_get_all_users()`);
                logger_repo.log({
                        level: 'info',
                        message: `get all users request`
                    });
                return result.rows;
        }
        return try_func(f);
}
function insert_country(name) {

        const f = async () => {
                if (name == '' || name == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'insert_country function: name is null or empty'
                            });
                        return -1;
                }
                else {
                        
                        const result = await raw_repo.getRawResult(`select * from sp_insert_country('${name}')`);
                        logger_repo.log({
                                level: 'info',
                                message: `insert country ${result.rows[0].sp_insert_country.toString()}`
                            });
                return result.rows[0].sp_insert_country;
}
        }
return try_func(f);
}
function update_country(id, name) {

        const f = async () => {
                if (name == '' || name == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'update_country function: name is null or empty'
                            });
                        return -1;
                }
                if (id <= 0 || id == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'update_country function: id is invalid'
                            });
                        return -1;

                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_country(${id},'${name}')`);
                        logger_repo.log({
                                level: 'info',
                                message: `country with id ${id} was updated : ${result.rows[0].sp_update_country.toString()}`
                            });
                        return result.rows[0].sp_update_country;
                }
        }
        return try_func(f);
}
function insert_airline(name, countryId, userId) {

        const f = async () => {
                if (name == '' || name == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'insert_airline function: name is null or empty'
                            });
                        return -1;
                }
                if (countryId <= 0 || countryId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'insert_airline function: countryId is invalid'
                            });
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        logger_repo.log({
                                level: 'error',
                                message: 'insert_airline function: userId is invalid'
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_airline('${name}',${countryId},${userId})`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline with id ${result.rows[0].sp_insert_airline.toString()} was inserted`
                            });
                        return result.rows[0].sp_insert_airline;
                }
        }
        return try_func(f);
}
function delete_airline_flights(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_airline_flights function: id is invalid');
                        logger_repo.log({
                                level: 'error',
                                message: `delete_airline_flights function: id is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_airline_flights(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `airline with id ${id} was deleted`
                            });
                        return result.rows[0].sp_delete_airline_flights;
                }
        }
        return try_func(f);
}
function get_user_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_user_by_id function: id is invalid');
                        logger_repo.log({
                                level: 'error',
                                message: `get_user_by_id function: id is invalid`
                            });
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_user_by_id(${id})`);
                        logger_repo.log({
                                level: 'info',
                                message: `get user by id ${id} request}`
                            });
                        return result.rows;
                }
        }
        return try_func(f);
}
module.exports = {
        delete_country_flights,
        delete_customers_user,
        get_all_customers,
        get_all_tickets,
        get_all_users,
        insert_country,
        update_country,
        insert_airline,
        get_user_by_id,
        delete_airline_flights
}