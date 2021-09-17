const anon_dao = require('../dao/anon-dao')
const customer_dao = require('../dao/customer-dao')
module.exports.checkUsernameAvailability = async (username) => {
    if ((await customer_dao.get_user_by_username(username))[0]) {
        //exists - not availble
        return false;
    }
    else{
        //not exists - availble
        return true;
    }
}
module.exports.addUser = async (body) => {
    return await anon_dao.insert_user(body.username, body.password, body.email, body.role);
}
module.exports.getUserById = async (body) => {
    return await customer_dao.get_user_by_id(body.id);
}
module.exports.getUserByUsername = async (body) => {
    return await customer_dao.get_user_by_username(body.username);
}