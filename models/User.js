const login_service = require('../BL/login-service');
const bcrypt = require('bcrypt');
const { use } = require('chai');

async function save_new_user(body) {
    const passwordEncrypted = await encryptPassword(body.password);
    body.password= passwordEncrypted;
    var userId = await login_service.addUser(body);
    console.log(`new user with id ${userId} was created & saved`);
    var createdUser = await login_service.getUserById({id: userId});
    return createdUser[0];
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

async function login(username, password) {

    var user = await login_service.getUserByUsername({username :username, password : password});
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
