const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class AlertSchema extends RouteValidator {
  static get get() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number().required(),
        timestampBegin: Joi.date().required(),
        timestampEnd: Joi.date().required(),
        sensorList: [Joi.array().items(Joi.number()), Joi.number()],
      }).required(),
    };

    return this.validate(schema);
  }

  static get getRecent() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number().required(),
        timestampBegin: Joi.date(),
        timestampEnd: Joi.date(),
        sensorList: [Joi.array().items(Joi.number()), Joi.number()],
      }).required(),
    };

    return this.validate(schema);
  }
}

module.exports = AlertSchema;
