const jwt = require('jsonwebtoken');
const admin_dao = require('../dao/admin-dao');
const logger_repo = require('../logger')


const requireAuthAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                logger_repo.log({
                    level: 'error',
                    message: 'authMiddleware: jwt token verify failed ' + err.message
                });

                res.redirect('/login');
            }
            else {
                if (decodedToken.role.toLowerCase() == 'admin') {
                    next();
                }
                else {
                    logger_repo.log({
                        level: 'error',
                        message: 'authMiddleware: No permissions enter to this page'
                    });

                    res.redirect('/');
                }

            }
        });
    } else {
        res.redirect('/login');
    }
};
const requireAuthCustomer = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                logger_repo.log({
                    level: 'error',
                    message: 'authMiddleware: jwt token verify failed ' + err.message
                });
                res.redirect('/login');
            }
            else {
                if (decodedToken.role.toLowerCase() == 'customer') {
                    next();
                }
                else {
                    logger_repo.log({
                        level: 'error',
                        message: 'authMiddleware: No permissions enter to this page'
                    });                    
                    res.redirect('/');
                }

            }
        });
    } else {
        res.redirect('/login');
    }
};
const requireAuthAirline = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                logger_repo.log({
                    level: 'error',
                    message: 'authMiddleware: jwt token verify failed ' + err.message
                });
                res.redirect('/login');
            }
            else {
                if (decodedToken.role.toLowerCase() == 'airline') {
                    next();
                }
                else {
                    logger_repo.log({
                        level: 'error',
                        message: 'authMiddleware: No permissions enter to this page'
                    });
                    res.redirect('/');
                }

            }
        });
    } else {
        res.redirect('/login');
    }
};
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret key', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.locals.role = null;
                next();
            } else {
                let user = await admin_dao.get_user_by_id(decodedToken.id);
                if (user[0]) {
                    res.locals.role = user[0].role;
                    res.locals.user = user[0];
                    next();
                }
                else {
                    res.locals.user = null;
                    res.locals.role = null;
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        res.locals.role = null;
        next();
    }
};

module.exports = { requireAuthAdmin, requireAuthCustomer, requireAuthAirline, checkUser };