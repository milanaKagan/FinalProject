const raw_repo = require('../db/raw_repo')
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
                        console.log('delete_country_flights function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_country_flights(${id})`);
                        return result.rows[0].sp_delete_country_flights;
                }
        }
        return try_func(f);
}
function delete_customers_user(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_customers_user function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_customers_user(${id})`);
                        return result.rows[0].sp_delete_customers_user;
                }
        }
        return try_func(f);
}
function get_all_customers() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_customers()`);
                return result.rows;
        }
        return try_func(f);
}
function get_all_tickets() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from  sp_get_all_tickets()`);
                return result.rows;
        }
        return try_func(f);
}
function get_all_users() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_users()`);
                return result.rows;
        }
        return try_func(f);
}
function insert_country(name) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('insert_country function: name is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_country('${name}')`);
                return result.rows[0].sp_insert_country;
}
        }
return try_func(f);
}
function update_country(id, name) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('update_country function: name is null or empty');
                        return -1;
                }
                if (id <= 0 || id == null) {
                        console.log('update_country function: id is invalid');
                        return -1;

                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_country(${id},'${name}')`);
                        return result.rows[0].sp_update_country;
                }
        }
        return try_func(f);
}
function insert_airline(name, countryId, userId) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('insert_airline function: name is null or empty');
                        return -1;
                }
                if (countryId <= 0 || countryId == null) {
                        console.log('insert_airline function: countryId is invalid');
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        console.log('insert_airline function: userId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_airline('${name}',${countryId},${userId})`);
                        return result.rows[0].sp_insert_airline;
                }
        }
        return try_func(f);
}
function delete_airline_flights(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_airline_flights function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_airline_flights(${id})`);
                        return result.rows[0].sp_delete_airline_flights;
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
        delete_airline_flights
}