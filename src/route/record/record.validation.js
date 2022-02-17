import baseJoi from 'joi';
import dateExtention from '@joi/date';
import config from '../../config';

const Joi = baseJoi.extend(dateExtention);

// eslint-disable-next-line import/prefer-default-export
export const getRecordListValidation = Joi.object().keys(
    {
        startDate: Joi.date().format('YYYY-MM-DD').required(),
        endDate: Joi.date().format('YYYY-MM-DD').required(),
        minCount: Joi.number().min(0).required(),
        maxCount: Joi.number().min(0).required(),
    },
    config.requestValidation,
);
