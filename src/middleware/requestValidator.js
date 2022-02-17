import ExpressJoiValidator from 'express-joi-validation';

export default ExpressJoiValidator.createValidator({
    passError: true, // for custom error handling
});
