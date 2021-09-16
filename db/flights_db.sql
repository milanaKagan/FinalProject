--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sp_delete_airline(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM airlines
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_airline(_id bigint) OWNER TO postgres;

--
-- Name: FUNCTION sp_delete_airline(_id bigint); Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON FUNCTION public.sp_delete_airline(_id bigint) IS 'airline user';


--
-- Name: sp_delete_airline_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline_flights(_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare
        rows_count int := 0;
    begin
        delete from flights
        using airlines
        where flights.airline_id = _id;

        with rows as  (
            delete from airlines
            where airlines.id = _id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
$$;


ALTER FUNCTION public.sp_delete_airline_flights(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_and_reset_all(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_all()
    LANGUAGE plpgsql
    AS $$
begin
		
		delete from tickets
        where id >= 1;
        alter sequence tickets_id_seq restart with 1;
		
		delete from flights
        where id >= 1;
        alter sequence flights_id_seq restart with 1;
		
		delete from airlines
        where id >= 1;
        alter sequence airlines_id_seq restart with 1;
		
		       
	    delete from customers
        where id >= 1;
        alter sequence customers_id_seq restart with 1;
		
		delete from countries
        where id >= 1;
        alter sequence countries_id_seq restart with 1;
	    
		delete from users
        where id >= 1;
        alter sequence users_id_seq restart with 1;
				
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_all() OWNER TO postgres;

--
-- Name: sp_delete_country(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_country(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM countries
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_country(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_country_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_country_flights(_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from flights
        using countries
        where flights.origin_country_id = _id or 
		flights.destination_country_id=_id;

        with rows as  (
            delete from countries
            where countries.id = _id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_country_flights(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customer(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM customers
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_customer(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_customers_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customers_user(_user_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from customers
        using users
        where customers.user_id = _user_id;

        with rows as  (
            delete from users
            where users.id = _user_id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_customers_user(_user_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flight(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flight(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM flights
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_flight(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flight_tickets(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flight_tickets(_flight_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from tickets
        using flights
        where tickets.flight_id = _flight_id;

        with rows as  (
            delete from flights
            where flights.id = _flight_id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_flight_tickets(_flight_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_ticket(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_ticket(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$;


ALTER FUNCTION public.sp_delete_ticket(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_user(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM users
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_user(_id bigint) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airlines (
    id bigint NOT NULL,
    name text NOT NULL,
    country_id integer NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.airlines OWNER TO postgres;

--
-- Name: sp_get_airline_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_id(_id bigint) RETURNS SETOF public.airlines
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_airline_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_airline_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_username(_username text) RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT a.id, a.name, a.country_id, a.user_id from airlines a
            JOIN users u on a.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;


ALTER FUNCTION public.sp_get_airline_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_all_airlines(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_airlines() RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_airlines() OWNER TO postgres;

--
-- Name: sp_get_all_countries(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_countries() RETURNS TABLE(id integer, name text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_countries() OWNER TO postgres;

--
-- Name: sp_get_all_customers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_customers() RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card_no text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_customers() OWNER TO postgres;

--
-- Name: sp_get_all_flights(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_flights() RETURNS TABLE(id bigint, airline_id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_flights() OWNER TO postgres;

--
-- Name: sp_get_all_tickets(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_tickets() RETURNS TABLE(id bigint, flight_id bigint, costumer_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_tickets() OWNER TO postgres;

--
-- Name: sp_get_all_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_users() RETURNS TABLE(id bigint, username text, password text, email text, role text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_users() OWNER TO postgres;

--
-- Name: sp_get_arrival_flights(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_arrival_flights(_country_id integer) RETURNS TABLE(id bigint, airlineid bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
           RETURN QUERY
            SELECT * from flights f
			WHERE f.destination_country_id = _country_id and
			(f.landing_time between NOW() and (NOW() + INTERVAL '12 hours' ));
        END;
$$;


ALTER FUNCTION public.sp_get_arrival_flights(_country_id integer) OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: sp_get_country_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_country_by_id(_id bigint) RETURNS SETOF public.countries
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_country_by_id(_id bigint) OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    address text NOT NULL,
    phone_no text NOT NULL,
    credit_card_no text NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: sp_get_customer_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_id(_id bigint) RETURNS SETOF public.customers
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_customer_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_customer_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_username(_username text) RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT c.id, c.first_name, c.last_name, c.address,
			c.phone_no, c.credit_card_no, c.user_id from customers c
            JOIN users u on c.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;


ALTER FUNCTION public.sp_get_customer_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_departure_flights(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_departure_flights(_country_id integer) RETURNS TABLE(id bigint, airlineid bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
           RETURN QUERY
            SELECT * from flights f
			WHERE f.origin_country_id = _country_id and
			(f.departure_time between NOW() and (NOW() + INTERVAL '12 hours' ));
        END;
$$;


ALTER FUNCTION public.sp_get_departure_flights(_country_id integer) OWNER TO postgres;

--
-- Name: flights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flights (
    id bigint NOT NULL,
    airline_id bigint NOT NULL,
    origin_country_id integer NOT NULL,
    destination_country_id integer NOT NULL,
    departure_time timestamp without time zone NOT NULL,
    landing_time timestamp without time zone NOT NULL,
    remaining_tickets integer NOT NULL
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- Name: sp_get_flight_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flight_by_id(_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_flight_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_airline_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) RETURNS TABLE(id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT f.id, f.origin_country_id, f.destination_country_id,
			f.departure_time, f.landing_time , f.remaining_tickets from flights f
            JOIN airlines a on a.id = f.airline_id
			Where a.id = _airline_id;
        END;
    $$;


ALTER FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_parameters(integer, integer, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date timestamp without time zone) RETURNS TABLE(id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT f.id, f.origin_country_id, f.destination_country_id,
			f.departure_time, f.landing_time from flights f
			Where f.origin_country_id = _origin_country_id and
			f.destination_country_id=_destination_country_id and f.departure_time=_date;
        END;
    $$;


ALTER FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date timestamp without time zone) OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    flight_id bigint NOT NULL,
    costumer_id bigint NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: sp_get_ticket_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_ticket_by_id(_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_ticket_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_tickets_by_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) RETURNS TABLE(id bigint, flight_id bigint, customer_id bigint)
    LANGUAGE plpgsql
    AS $$
       BEGIN
           RETURN QUERY
            SELECT t.id, t.flight_id, t.costumer_id from tickets t
            JOIN customers c on c.id = t.costumer_id
			Where c.id = _customer_id;
        END;
    $$;


ALTER FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) OWNER TO postgres;

--
-- Name: sp_get_user_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_id(_id bigint) RETURNS TABLE(id bigint, username text, password text, email text, role text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT u.id, u.username, u.password, u.email, u.role from users u
			WHERE u.id = _id;
        END;
    
    $$;


ALTER FUNCTION public.sp_get_user_by_id(_id bigint) OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: sp_get_user_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_username(_username text) RETURNS SETOF public.users
    LANGUAGE plpgsql
    AS $$
            BEGIN
            RETURN QUERY
            SELECT * from users u
			WHERE u.username = _username;
        END;
    
    $$;


ALTER FUNCTION public.sp_get_user_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_insert_airline(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_airline(_name text, _country_id integer, user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO airlines(name,country_id,user_id)
            VALUES (_name,_country_id,user_id)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_airline(_name text, _country_id integer, user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_country(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_country(_name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO countries (name)
            VALUES (_name)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_country(_name text) OWNER TO postgres;

--
-- Name: sp_insert_customer(text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO customers (first_name, last_name, address,
											 phone_no, credit_card_no, user_id)
            VALUES (_first_name, _last_name, _address,
											 _phone_no, _credit_card_no, _user_id)
            RETURNING id into new_id;

            return new_id;
        END;
$$;


ALTER FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_flight(bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO flights(airline_id , origin_country_id ,destination_country_id,
								departure_time ,landing_time, remaining_tickets)
            VALUES (_airline_id , _origin_country_id ,_destination_country_id,
								_departure_time ,_landing_time, _remaining_tickets)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_insert_ticket(bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_ticket(_flight_id bigint, _costumer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO tickets(flight_id,costumer_id)
            VALUES (_flight_id,_costumer_id)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_ticket(_flight_id bigint, _costumer_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_user(text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_user(_username text, _password text, _email text, _role text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO users (username, password, email, 
                                role)
            VALUES (_username, _password, _email, 
                                _role)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_user(_username text, _password text, _email text, _role text) OWNER TO postgres;

--
-- Name: sp_update_airline(bigint, text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE airlines
            SET name = _name,country_id= _country_id, user_id=_user_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_country(integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_country(_id integer, _name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE countries
            SET name = _name
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_country(_id integer, _name text) OWNER TO postgres;

--
-- Name: sp_update_customer(bigint, text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE customers
            SET first_name=_first_name, last_name=_last_name,
			   address= _address, phone_no=_phone_no, credit_card_no =_credit_card_no, user_id = _user_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_flight(bigint, bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE flights
            SET airline_id=_airline_id, origin_country_id=_origin_country_id,
			   destination_country_id= _destination_country_id, departure_time=_departure_time, 
				landing_time =_landing_time, remaining_tickets = _remaining_tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$;


ALTER FUNCTION public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_update_ticket(bigint, bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_ticket(_id bigint, _flight_id bigint, _costumer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE tickets
            SET flight_id= _flight_id, costumer_id=_costumer_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_ticket(_id bigint, _flight_id bigint, _costumer_id bigint) OWNER TO postgres;

--
-- Name: sp_update_user(bigint, text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text, _role text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
               DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE users
            SET username = _username, password = _password, 
                        email = _email, role = _role
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    
    $$;


ALTER FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text, _role text) OWNER TO postgres;

--
-- Name: sp_upsert_customer(text, text, text, text, text, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint)
    LANGUAGE plpgsql
    AS $$
    begin
        if not exists(select 1 from customers where phone_no = _phone_no or credit_card_no=_credit_card_no
					 or user_id=_user_id) then
        insert into customers (first_name, last_name,
		address, phone_no, credit_card_no, user_id)
        values(_first_name, _last_name,
		_address, _phone_no, _credit_card_no, _user_id);
        else
            update customers
            SET first_name=_first_name,last_name= _last_name,
			address=_address,phone_no= _phone_no, credit_card_no=_credit_card_no, 
			user_id=_user_id
            where phone_no = _phone_no or credit_card_no=_credit_card_no
					 or user_id=_user_id;
        end if;
    end;
    $$;


ALTER PROCEDURE public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.airlines ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.airlines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.countries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.customers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: flights_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.flights ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.flights_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tickets ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airlines (id, name, country_id, user_id) FROM stdin;
1	Private flight	216	1
2	135 Airways	236	2
3	1Time Airline	78	3
4	2 Sqn No 1 Elementary Flying Training School	26	4
5	213 Flight Unit	194	5
6	223 Flight Unit State Airline	224	6
7	224th Flight Unit	120	7
8	247 Jet Ltd	149	8
9	3D Aviation	32	9
10	40-Mile Air	170	10
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
1	Afghanistan
2	Åland Islands
3	Albania
4	Algeria
5	American Samoa
6	AndorrA
7	Angola
8	Anguilla
9	Antarctica
10	Antigua and Barbuda
11	Argentina
12	Armenia
13	Aruba
14	Australia
15	Austria
16	Azerbaijan
17	Bahamas
18	Bahrain
19	Bangladesh
20	Barbados
21	Belarus
22	Belgium
23	Belize
24	Benin
25	Bermuda
26	Bhutan
27	Bolivia
28	Bosnia and Herzegovina
29	Botswana
30	Bouvet Island
31	Brazil
32	British Indian Ocean Territory
33	Brunei Darussalam
34	Bulgaria
35	Burkina Faso
36	Burundi
37	Cambodia
38	Cameroon
39	Canada
40	Cape Verde
41	Cayman Islands
42	Central African Republic
43	Chad
44	Chile
45	China
46	Christmas Island
47	Cocos (Keeling) Islands
48	Colombia
49	Comoros
50	Congo
51	Congo, The Democratic Republic of the
52	Cook Islands
53	Costa Rica
54	Cote D`Ivoire
55	Croatia
56	Cuba
57	Cyprus
58	Czech Republic
59	Denmark
60	Djibouti
61	Dominica
62	Dominican Republic
63	Ecuador
64	Egypt
65	El Salvador
66	Equatorial Guinea
67	Eritrea
68	Estonia
69	Ethiopia
70	Falkland Islands (Malvinas)
71	Faroe Islands
72	Fiji
73	Finland
74	France
75	French Guiana
76	French Polynesia
77	French Southern Territories
78	Gabon
79	Gambia
80	Georgia
81	Germany
82	Ghana
83	Gibraltar
84	Greece
85	Greenland
86	Grenada
87	Guadeloupe
88	Guam
89	Guatemala
90	Guernsey
91	Guinea
92	Guinea-Bissau
93	Guyana
94	Haiti
95	Heard Island and Mcdonald Islands
96	Holy See (Vatican City State)
97	Honduras
98	Hong Kong
99	Hungary
100	Iceland
101	India
102	Indonesia
103	Iran, Islamic Republic Of
104	Iraq
105	Ireland
106	Isle of Man
107	Israel
108	Italy
109	Jamaica
110	Japan
111	Jersey
112	Jordan
113	Kazakhstan
114	Kenya
115	Kiribati
116	Korea, Democratic People`S Republic of
117	Korea, Republic of
118	Kuwait
119	Kyrgyzstan
120	Lao People`S Democratic Republic
121	Latvia
122	Lebanon
123	Lesotho
124	Liberia
125	Libyan Arab Jamahiriya
126	Liechtenstein
127	Lithuania
128	Luxembourg
129	Macao
130	Macedonia, The Former Yugoslav Republic of
131	Madagascar
132	Malawi
133	Malaysia
134	Maldives
135	Mali
136	Malta
137	Marshall Islands
138	Martinique
139	Mauritania
140	Mauritius
141	Mayotte
142	Mexico
143	Micronesia, Federated States of
144	Moldova, Republic of
145	Monaco
146	Mongolia
147	Montserrat
148	Morocco
149	Mozambique
150	Myanmar
151	Namibia
152	Nauru
153	Nepal
154	Netherlands
155	Netherlands Antilles
156	New Caledonia
157	New Zealand
158	Nicaragua
159	Niger
160	Nigeria
161	Niue
162	Norfolk Island
163	Northern Mariana Islands
164	Norway
165	Oman
166	Pakistan
167	Palau
168	Palestinian Territory, Occupied
169	Panama
170	Papua New Guinea
171	Paraguay
172	Peru
173	Philippines
174	Pitcairn
175	Poland
176	Portugal
177	Puerto Rico
178	Qatar
179	Reunion
180	Romania
181	Russian Federation
182	RWANDA
183	Saint Helena
184	Saint Kitts and Nevis
185	Saint Lucia
186	Saint Pierre and Miquelon
187	Saint Vincent and the Grenadines
188	Samoa
189	San Marino
190	Sao Tome and Principe
191	Saudi Arabia
192	Senegal
193	Serbia and Montenegro
194	Seychelles
195	Sierra Leone
196	Singapore
197	Slovakia
198	Slovenia
199	Solomon Islands
200	Somalia
201	South Africa
202	South Georgia and the South Sandwich Islands
203	Spain
204	Sri Lanka
205	Sudan
206	Suriname
207	Svalbard and Jan Mayen
208	Swaziland
209	Sweden
210	Switzerland
211	Syrian Arab Republic
212	Taiwan, Province of China
213	Tajikistan
214	Tanzania, United Republic of
215	Thailand
216	Timor-Leste
217	Togo
218	Tokelau
219	Tonga
220	Trinidad and Tobago
221	Tunisia
222	Turkey
223	Turkmenistan
224	Turks and Caicos Islands
225	Tuvalu
226	Uganda
227	Ukraine
228	United Arab Emirates
229	United Kingdom
230	United States
231	United States Minor Outlying Islands
232	Uruguay
233	Uzbekistan
234	Vanuatu
235	Venezuela
236	Viet Nam
237	Virgin Islands, British
238	Virgin Islands, U.S.
239	Wallis and Futuna
240	Western Sahara
241	Yemen
242	Zambia
243	Zimbabwe
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, address, phone_no, credit_card_no, user_id) FROM stdin;
1	Christof	Colin	Switzerland, Effingen, Boulevard de Balmont 2950	075 114 99 31	372349619384358	1
2	Gonca	Yalçın	Turkey, Muş, Kushimoto Sk 654	(757)-075-3825	343351273105141	2
3	بهار	حیدری	Iran, بروجرد, دکتر چمران 198	004-21666423	342205557521913	3
4	Nancy	Gerner	Germany, Schleswig-Flensburg, Lindenweg 8439	0797-2994953	347720284161424	4
5	Fatima	Navarro	Spain, Torrente, Paseo de Extremadura 9628	979-830-951	371834231175731	5
6	ثنا	حیدری	Iran, کاشان, میدان ولیعصر (عج) 2976	060-72322660	341173697070608	6
7	Justine	Ross	Canada, Waterloo, Balmoral St 718	829-841-9667	346981798920694	7
8	Gene	Adams	United States, Grants Pass, Saddle Dr 1789	(537)-992-7918	372508561638612	8
9	Elias	Rantanen	Finland, Lohja, Bulevardi 2583	09-028-721	347427545072446	9
10	Kåre	Kvernberg	Norway, Kiberg, Sandåsveien 4042	22724823	378108784480951	10
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flights (id, airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) FROM stdin;
1	1	113	102	2021-01-15 00:00:00	2021-07-14 00:00:00	190
2	1	199	22	2021-09-02 00:00:00	2021-05-09 00:00:00	181
3	1	238	105	2021-05-10 00:00:00	2021-03-28 00:00:00	146
4	2	7	210	2021-03-23 00:00:00	2021-08-16 00:00:00	4
5	2	15	239	2021-03-23 00:00:00	2021-04-16 00:00:00	120
6	2	178	39	2021-06-16 00:00:00	2021-02-19 00:00:00	175
7	3	98	114	2021-12-28 00:00:00	2021-12-21 00:00:00	7
8	3	65	38	2021-04-17 00:00:00	2021-07-22 00:00:00	59
9	4	89	78	2021-06-17 00:00:00	2021-03-10 00:00:00	119
10	4	229	39	2021-09-16 00:00:00	2021-02-08 00:00:00	55
11	5	130	76	2021-07-09 00:00:00	2021-08-08 00:00:00	54
12	5	91	228	2021-08-12 00:00:00	2021-10-17 00:00:00	80
13	5	24	5	2021-11-09 00:00:00	2021-05-15 00:00:00	11
14	6	109	193	2021-08-02 00:00:00	2021-08-08 00:00:00	137
15	6	27	99	2021-06-28 00:00:00	2021-06-24 00:00:00	198
16	7	6	181	2021-09-28 00:00:00	2021-08-03 00:00:00	178
17	8	168	194	2021-08-22 00:00:00	2021-05-09 00:00:00	111
18	8	90	131	2021-11-07 00:00:00	2021-07-18 00:00:00	237
19	9	170	126	2021-02-01 00:00:00	2021-01-20 00:00:00	206
20	9	214	202	2021-11-26 00:00:00	2021-09-12 00:00:00	122
21	9	84	98	2021-10-28 00:00:00	2021-02-14 00:00:00	173
22	10	54	41	2021-06-20 00:00:00	2021-08-03 00:00:00	162
23	10	68	157	2021-08-17 00:00:00	2021-07-18 00:00:00	97
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, flight_id, costumer_id) FROM stdin;
1	1	1
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
10	10	10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, role) FROM stdin;
1	ChristofrTX	[object Promise]	christof.colin@example.com	airline
2	GoncawXC	[object Promise]	gonca.yalcin@example.com	admin
3	بهارjPp	[object Promise]	bhr.hydry@example.com	customer
4	NancyURi	[object Promise]	nancy.gerner@example.com	customer
5	FatimauEW	[object Promise]	fatima.navarro@example.com	admin
6	ثنا1a1	[object Promise]	thn.hydry@example.com	admin
7	Justine0fQ	[object Promise]	justine.ross@example.com	customer
8	GeneEhq	[object Promise]	gene.adams@example.com	admin
9	EliaswIK	[object Promise]	elias.rantanen@example.com	customer
10	KåreRf0	[object Promise]	kare.kvernberg@example.com	customer
\.


--
-- Name: airlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airlines_id_seq', 10, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 243, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 10, true);


--
-- Name: flights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flights_id_seq', 23, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: airlines airlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_flight_id_costumer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_flight_id_costumer_id_key UNIQUE (flight_id, costumer_id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: customers unique_credit_card_no; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_credit_card_no UNIQUE (credit_card_no);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: countries unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: airlines unique_name_airline; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT unique_name_airline UNIQUE (name);


--
-- Name: customers unique_phone_no; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_phone_no UNIQUE (phone_no);


--
-- Name: customers unique_user_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_user_id UNIQUE (user_id);


--
-- Name: airlines unique_user_id_airline; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT unique_user_id_airline UNIQUE (user_id);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: flights fk_airline_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_airline_id FOREIGN KEY (airline_id) REFERENCES public.airlines(id);


--
-- Name: airlines fk_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: tickets fk_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT fk_customer_id FOREIGN KEY (costumer_id) REFERENCES public.customers(id);


--
-- Name: flights fk_destination_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_destination_country_id FOREIGN KEY (destination_country_id) REFERENCES public.countries(id);


--
-- Name: tickets fk_flight_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT fk_flight_id FOREIGN KEY (flight_id) REFERENCES public.flights(id);


--
-- Name: flights fk_origin_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_origin_country_id FOREIGN KEY (origin_country_id) REFERENCES public.countries(id);


--
-- Name: customers fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: airlines fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

