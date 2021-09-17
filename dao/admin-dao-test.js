const assert = require('assert'); // for the testing capabilites
const anon_dao = require('./anon-dao');
const customer_dao = require('./customer-dao');
const admin_dao = require('./admin-dao');// our testing subject
const connectedKnex = require('../db/knex-connector-test');

describe('test admin user dao functions:', () => {
    beforeEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
        country1 = {
            name: 'FakeCountry'
        };
        user1 = {
            username: 'fakeName',
            password: 'fakePass',
            email: 'fake@gmail.com',
            role: 'admin'
        };

        airline1 = {
            name: 'airline1',
            country_id: 1,
            user_id: 1
        };

        flight1 = {
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: '2021-09-08 21:00:00.000',
            landing_time: '2021-09-08 21:00:00.000',
            remaining_tickets: 100
        };
        customer1 = {
            first_name: "first",
            last_name: "last",
            address: "address",
            phone_no: "0000000",
            credit_card_no: "00000",
            user_id: 1
        };

        await connectedKnex.raw('call sp_delete_and_reset_all()');
        await connectedKnex.raw(`select * from sp_insert_country('${country1.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user1.username}','${user1.password}','${user1.email}','${user1.role}')`);
        await connectedKnex.raw(`select * from sp_insert_customer('${customer1.first_name}','${customer1.last_name}',
        '${customer1.address}','${customer1.phone_no}','${customer1.credit_card_no}',${customer1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline1.name}',${airline1.country_id},${airline1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
    });
    afterEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });
    it('insert airline', async function () {
        airline2 = {
            name: 'airline2',
            country_id: 1,
            user_id: 2
        };

        user2 = {
            username: 'fakeName2',
            password: 'fakePass2',
            email: 'fake@gmail.com2',
            role: 'admin'
        };
        await connectedKnex.raw(`select * from sp_insert_user('${user2.username}','${user2.pasword}','${user2.email}','${user2.role}')`);
        var actual = await admin_dao.insert_airline(airline2.name, airline2.country_id, airline2.user_id);

        assert.strictEqual(actual, '2');
        var airline = await anon_dao.get_airline_by_id(2);
        assert.strictEqual(airline[0].id, '2');
        assert.strictEqual(airline[0].country_id.toString(), airline2.country_id.toString());
        assert.strictEqual(airline[0].user_id.toString(), airline2.user_id.toString());
        assert.strictEqual(airline[0].name, airline2.name);
    });
    it('get user by id', async function () {
        var actual = await admin_dao.get_user_by_id(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].username, user1.username);
        assert.strictEqual(actual[0].password, user1.password);
        assert.strictEqual(actual[0].email, user1.email);
        assert.strictEqual(actual[0].role, user1.role);


    });
    it('get user by not existant id', async function () {
        var actual = await admin_dao.get_user_by_id(1000000);
        assert.strictEqual(actual[0], undefined);

    });
    it('get user by not valid id', async function () {
        var actual = await admin_dao.get_user_by_id(0);
        assert.strictEqual(actual, -1);

    });
    it('insert airline bad name', async function () {

        var actual = await admin_dao.insert_airline(null, 1, 1);
        assert.strictEqual(actual, -1);

    });
    it('insert airline bad country id', async function () {

        var actual = await admin_dao.insert_airline('name', null, 1);
        assert.strictEqual(actual, -1);

    });
    it('insert airline bad user_id', async function () {

        var actual = await admin_dao.insert_airline('name', 1, -1);
        assert.strictEqual(actual, -1);

    });
    it('delete airline and flights', async function () {
        var actual = await admin_dao.delete_airline_flights(1);
        assert.strictEqual(actual, 1);
        var airline = await anon_dao.get_airline_by_id(1);
        assert.strictEqual(airline[0], undefined);
        var flight = await anon_dao.get_flights_by_airline_id(1);
        assert.strictEqual(flight[0], undefined);
    });
    it('delete airline and flights not existent id', async function () {
        var actual = await admin_dao.delete_airline_flights(1000);
        assert.strictEqual(actual, 0);
    });
    it('delete airline and flights not valid id', async function () {
        var actual = await admin_dao.delete_airline_flights(-1);
        assert.strictEqual(actual, -1);
    });
   
    it('get all users happy path', async function () {
        var actual = await admin_dao.get_all_users();
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].username, user1.username);
        assert.strictEqual(actual[0].password, user1.password);
        assert.strictEqual(actual[0].email, user1.email);
        assert.strictEqual(actual[0].role, user1.role);
    });
    it('get all tickets happy path', async function () {
        ticket1 = {
            flight_id: 1,
            customer_id: 1
        };
        await connectedKnex.raw(`select * from sp_insert_ticket(${ticket1.flight_id},${ticket1.customer_id})`);
        var actual = await admin_dao.get_all_tickets();
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].flight_id, ticket1.flight_id.toString());
        assert.strictEqual(actual[0].costumer_id, ticket1.customer_id.toString());
    });
    it('get all customers happy path', async function () {
        var actual = await admin_dao.get_all_customers();

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].first_name, customer1.first_name);
        assert.strictEqual(actual[0].last_name, customer1.last_name);
        assert.strictEqual(actual[0].address, customer1.address);
        assert.strictEqual(actual[0].phone_no, customer1.phone_no);
        assert.strictEqual(actual[0].credit_card_no, customer1.credit_card_no);
        assert.strictEqual(actual[0].user_id, customer1.user_id.toString());

    });
    it('insert Country', async function () {
        var actual = await admin_dao.insert_country("testCountry");
        assert.strictEqual(actual, '2');
        country = await anon_dao.get_country_by_id(2);
        assert.strictEqual(country[0].id, 2);
        assert.strictEqual(country[0].name, "testCountry");
    });
    it('insert Country null name', async function () {
        var actual = await admin_dao.insert_country(null);
        assert.strictEqual(actual, -1);

    });
    it('update Country', async function () {
        var actual = await admin_dao.update_country(1, "testCountry");
        assert.strictEqual(actual, '1');
        country = await anon_dao.get_country_by_id(1);
        assert.strictEqual(country[0].id, 1);
        assert.strictEqual(country[0].name, "testCountry");
    });
    it('update Country null name', async function () {
        var actual = await admin_dao.update_country(1, null);
        assert.strictEqual(actual, -1);

    });
    it('delete customer and user', async function () {
        user2 = {
            username: 'fakeName2',
            password: 'fakePass2',
            email: 'fake@gmail.com2',
            role: 'admin',
        };
        customer2 = {
            first_name: "first2",
            last_name: "last2",
            address: "address2",
            phone_no: "00000002",
            credit_card_no: "000002",
            user_id: 2
        };
        await connectedKnex.raw(`select * from sp_insert_user('${user2.username}','${user2.password}','${user2.email}',
        '${user2.role}')`);
        await connectedKnex.raw(`select * from sp_insert_customer('${customer2.first_name}','${customer2.last_name}',
        '${customer2.address}','${customer2.phone_no}','${customer2.credit_card_no}',${customer2.user_id})`);
        
        var actual = await admin_dao.delete_customers_user(2);
        assert.strictEqual(actual, 1);
        var customer = await customer_dao.get_customer_by_id(2);
        assert.strictEqual(customer[0], undefined);
        var user = await admin_dao.get_user_by_id(2);
        assert.strictEqual(user[0], undefined);
    });
    it('delete customer and user bad id ', async function () { 
        var actual = await admin_dao.delete_customers_user(0);
        assert.strictEqual(actual, -1);
    });
    it('delete country and flight bad id ', async function () { 
        var actual = await admin_dao.delete_country_flights(0);
        assert.strictEqual(actual, -1);
    });

})
