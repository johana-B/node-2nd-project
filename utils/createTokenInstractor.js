const createTokenInstractor = (instractor) => {
    return {
        instractorId: instractor._id,
        firstName: instractor.firstName,
        lastName: instractor.lastName,
        role: instractor.role,
        email: instractor.email,
        gender: instractor.gender
    };
};

module.exports = createTokenInstractor;