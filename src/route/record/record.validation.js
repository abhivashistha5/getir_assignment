import Joi from 'joi';
import config from '../../config';

// eslint-disable-next-line import/prefer-default-export
export const getRecordListValidation = Joi.object().keys(
    {
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        minCount: Joi.number().min(0).required(),
        maxCount: Joi.number().min(0).required(),
    },
    config.requestValidation,
);
