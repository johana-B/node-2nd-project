const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const admin = require('firebase-admin/app');
let firebaseApp = null;
const { getAuth } = require('firebase-admin/auth')
const serviceAccount = require("../inventory-app-643e4-firebase-adminsdk-ziktr-8eb5238c3e.json");

const FirebaseAuthentication = async (req, res, next) => {
    try {
        firebaseApp = admin.initializeApp({
            credential: admin.cert(serviceAccount)
        });
    }
    catch (err) {
        firebaseApp = admin.getApp()
    }
    const idToken = req.headers['authorization'] ? req.headers['authorization'].split(' ') : null;
    if (!idToken) {
        throw new CustomError.BadRequestError('invalid credential');
    }
    else if (!idToken[1]) {
        throw new CustomError.BadRequestError('invalid credential');
    }
    else {
        getAuth()
            .verifyIdToken(idToken[1])
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                console.log(uid);
                next();
            })
            .catch((error) => {
                throw new CustomError.BadRequestError('id token is invalid')
            });
    }
}

const autorizedUser = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.unauthenticatedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};

module.exports = {
    FirebaseAuthentication,
    autorizedUser
}