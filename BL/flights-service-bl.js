const anon_dao = require('../dao/anon-dao')
const admin_dao = require('../dao/admin-dao')
const airline_dao = require('../dao/airline-dao')
const customer_dao = require('../dao/customer-dao')

module.exports.getAllAirlineCompanies = async () => {
    return await anon_dao.get_all_airlines();
}
module.exports.getAirlineById = async (body) => {
    return await anon_dao.get_airline_by_id(body.id);
}
module.exports.getUserById = async (body) => {
    return await admin_dao.get_user_by_id(body.id);
}
module.exports.getAirlineByUsername = async (body) => {
    return await admin_dao.get_airline_by_username(body.username);
}
module.exports.getAllCustomers = async () => {
    return await admin_dao.get_all_customers();
}
module.exports.getCustomerById = async (body) => {
    return await customer_dao.get_customer_by_id(body.id);
}
module.exports.getCustomerByUsername = async (body) => {
    return await customer_dao.get_customer_by_id(body.username);
}
module.exports.getAllUsers = async () => {
    return await admin_dao.get_all_users();
}
module.exports.getAllFlights = async () => {
    return await anon_dao.get_all_flights();
}
module.exports.getAllFlights = async () => {
    return await anon_dao.get_all_flights();
}
module.exports.getFlightById = async (body) => {
    return await anon_dao.get_flight_by_id(body.id);
}
module.exports.getFlightsByAirlineId = async (body) => {
    return await anon_dao.get_flights_by_airline_id(body.id);
}
module.exports.getFlightsByParameters = async (body) => {
    return await anon_dao.get_flights_by_parameters(body.origin_country_id, body.destination_country_id, body.dateTime);
}
module.exports.getArrivalFlights = async (body) => {
    return await anon_dao.get_arrival_flights(body.id);
}
module.exports.getDepartureFlights = async (body) => {
    return await anon_dao.get_departure_flights(body.id);
}
module.exports.getTicketsByCustomer = async (body) => {
    return await customer_dao.get_tickets_by_customer(body.id);
}
module.exports.getAllCountries = async () => {
    return await anon_dao.get_all_countries();
}
module.exports.addAirline = async (body) => {
    return await admin_dao.insert_airline(body.name, body.country_id, body.user_id);
}
module.exports.updateAirline = async (body) => {
    if ((await anon_dao.get_airline_by_id(body.id))[0]) {
        return await airline_dao.update_airline(body.id, body.name, body.country_id, body.user_id);
    }
    console.log(`impossible to update airline with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.removeAirline = async (body) => {
    var flights = await anon_dao.get_flights_by_airline_id(body.id);
    //remove tickets for flights of deleted airline
    if ((await anon_dao.get_airline_by_id(body.id))[0]) {
        for (let i = 0; i < flights.length; i++) {
            await airline_dao.delete_flight_tickets(flights[i].id);
        }
        return await admin_dao.delete_airline_flights(body.id);
    }
    console.log(`impossible to remove airline with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.addCustomer = async (body) => {
    return await customer_dao.insert_customer(body.first_name, body.last_name, body.address,
        body.phone_no, body.credit_card_no, body.user_id);
}
module.exports.updateCustomer = async (body) => {
    if ((await customer_dao.get_customer_by_id(body.id))[0]) {
        return await customer_dao.update_customer(body.id, body.first_name, body.last_name, body.address,
            body.phone_no, body.credit_card_no, body.user_id);
    }
    console.log(`impossible to update customer with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.removeCustomer = async (body) => {
    if ((await customer_dao.get_customer_by_id(body.id))[0]) {
        var tickets = await customer_dao.get_tickets_by_customer(body.id);
        for (let i = 0; i < tickets.length; i++) {
            await airline_dao.delete_ticket(tickets[i].id)
        }
        return await airline_dao.delete_customer(body.id);
    }
    console.log(`impossible to remove customer with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.addTicket = async (body) => {
    var flight = (await anon_dao.get_flight_by_id(body.flight_id))[0];
    if (flight) {
        if (flight.remaining_tickets >= 1) {
          
            var departure_date = flight.departure_time.getFullYear() + '-' + (flight.departure_time.getMonth() + 1) + '-' + flight.departure_time.getDate();
            var departure_time = flight.departure_time.getHours() + ":" + flight.departure_time.getMinutes() + ":" + flight.departure_time.getSeconds();
            var departure_datetime = departure_date + ' ' + departure_time;
            var landing_date = flight.landing_time.getFullYear() + '-' + (flight.landing_time.getMonth() + 1) + '-' + flight.landing_time.getDate();
            var landing_time = flight.landing_time.getHours() + ":" + flight.landing_time.getMinutes() + ":" + flight.landing_time.getSeconds();
            var landing_datetime = landing_date + ' ' + landing_time;
            await airline_dao.update_flight( parseInt(flight.id), parseInt(flight.airline_id), flight.origin_country_id, flight.destination_country_id,
            departure_datetime, landing_datetime, flight.remaining_tickets - 1);
            return await customer_dao.insert_ticket(body.flight_id, body.customer_id);

        }
        else {
            console.log(`impossible to add ticket to flight id ${body.id} because ticket number less than 1`);
            return 0;
        }
    }
    else {
        console.log(`impossible to add ticket to flight id ${body.id} because it is not exists`);
        return 0;
    }


}
module.exports.updateTicket = async (body) => {
    if ((await customer_dao.get_ticket_by_id(body.id))[0]) {
        return await customer_dao.update_ticket(body.id, body.flight_id, body.costumer_id);
    }
    console.log(`impossible to update ticket with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.removeTicket = async (body) => {
    if ((await customer_dao.get_ticket_by_id(body.id))[0]) {
        return await customer_dao.delete_ticket(body.id);
    }
    console.log(`impossible to remove ticket with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.addFlight = async (body) => {
    return await airline_dao.insert_flight(body.airline_id, body.origin_country_id, body.destination_country_id,
        body.departure_time, body.landing_time, body.remaining_tickets);
}
module.exports.updateFlight = async (body) => {
    if ((await anon_dao.get_flight_by_id(body.id))[0]) {
        return await airline_dao.update_flight(body.id, body.airline_id, body.origin_country_id, body.destination_country_id,
            body.departure_time, body.landing_time, body.remaining_tickets);
    }
    console.log(`impossible to update flight with id ${body.id} because it is not exists`);
    return 0;
}
module.exports.removeFlight = async (body) => {
    if ((await anon_dao.get_flight_by_id(body.id))[0]) {
        return await airline_dao.delete_flight_tickets(body.id);
    }
    console.log(`impossible to remove flight with id ${body.id} because it is not exists`);
    return 0;
}
