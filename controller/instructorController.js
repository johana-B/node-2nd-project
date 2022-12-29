const Instractor = require('../model/instructorModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path');
const { attachCookiesToResponse, createTokenInstractor } = require('../utils');

// instractor authentication started
const createInstractor = async (req, res) => {
    const ext = path.extname(req.files.image.name);
    const instractorImage = req.files.image
    if (!instractorImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequest('Please Upload Image');
    }
    const val = Date.now().toString()
    const imageName = req.body.firstName + val + ext;
    const fileName = imageName.split(' ').join('-')
    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + fileName
    );
    await instractorImage.mv(imagePath);
    let instractor = new Instractor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        educationStatus: req.body.educationStatus,
        courseToOffer: req.body.courseToOffer,
        address: req.body.address,
        experience: req.body.experience,
        age: req.body.age,
        gender: req.body.gender,
        image: `/uploads/${fileName}`
    })

    const instractors = await instractor.save()
    const tokenInstractor = createTokenInstractor(instractors);
    return res.status(StatusCodes.CREATED).json({ instractor: tokenInstractor });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequest('email and password can not be empty');
    };
    const instractor = await Instractor.findOne({ email })
    if (!instractor) {
        throw new CustomError.NotFoundError('invalid crediential');
    };
    const isPasswordCorrect = await instractor.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.NotFoundError('invalid credential');
    };
    const tokeninstractor = createTokenInstractor(instractor);
    attachCookiesToResponse({ res, instractor: tokeninstractor });
    res.status(StatusCodes.CREATED).json({ instractor: tokeninstractor });
};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({ msg: 'Instractor logged out!' });
};
// instractor authentication ended

// instractor controllers by admin and it self
const getAllInstractors = async (req, res) => {
    const instractor = await Instractor.find({}).select('-password');
    res.status(StatusCodes.OK).json({ instractor, count: instractor.length });
};

const getSingleInstractor = async (req, res) => {
    const { id: instractorId } = req.params;
    const instractor = await Instractor.findById({ _id: instractorId }).select('-password');
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`)
    }
    res.status(StatusCodes.OK).json(instractor);
};

const currentInstractor = async (req, res) => {
    res.status(StatusCodes.OK).json({ instractor: req.instractor });
}

const updateInstractor = async (req, res) => {
    const { id: instractorId } = req.params
    const instractor = await Instractor.findByIdAndUpdate({ _id: instractorId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`);
    }
    const tokeninstractor = createTokenInstractor(instractor);
    attachCookiesToResponse({ res, instractor: tokeninstractor });
    res.status(StatusCodes.CREATED).json({ instractor: tokeninstractor, msg: 'instractor updated successfully' });
};

const delateInstractor = async (req, res) => {
    const { id: instractorId } = req.params;
    const instractor = await Instractor.findOne({ _id: instractorId });
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`)
    }
    await instractor.remove();
    res.status(StatusCodes.OK).json({ msg: 'Instractor delated successfully ' });
};


module.exports = {
    // auth
    createInstractor,
    login,
    logout,
    // controller
    getAllInstractors,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
    currentInstractor,
}