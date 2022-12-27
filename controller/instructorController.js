// const Course = require('../model/courseModel');
// const { StatusCodes } = require('http-status-codes')
// const CustomError = require('../errors')

const createInstractor = async (req, res) => {
    res.send('create instractor');
};

const getAllInstractor = async (req, res) => {
    res.send('all instractor');
};

const getSingleInstractor = async (req, res) => {
    res.send('single instractor');
};

const updateInstractor = async (req, res) => {
    res.send('update instractor');
};

const delateInstractor = async (req, res) => {
    res.send('delete instractor');
};

module.exports = {
    createInstractor,
    getAllInstractor,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
}