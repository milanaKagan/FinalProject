const anon_dao = require('../dao/anon-dao');//create user
const customer_dao = require('../dao/customer-dao');//get user by username
const bcrypt = require('bcrypt');
const { use } = require('chai');

async function save_new_user(username, password, email, role) {
    const passwordEncrypted = await encryptPassword(password);

    var userId = await anon_dao.insert_user(username, passwordEncrypted, email, role);
    console.log(`new user with id ${userId} was created & saved`);
    var createdUser = await customer_dao.get_user_by_id(userId);
    return createdUser[0];
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

async function login(username, password) {

    var user = await customer_dao.get_user_by_username(username);
    if (user && user[0] != undefined) {
        const auth = await bcrypt.compare(password, user[0].password);
        if (auth) {
            return user[0];
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
}

module.exports = {
    save_new_user,
    login
};
