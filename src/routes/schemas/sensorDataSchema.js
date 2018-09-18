const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class SensorDataSchema extends RouteValidator {
  static get getByMeasurement() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number(),
        collectorId: Joi.string(),
        measurement: Joi.string().required(),
        timestampBegin: Joi.date().required(),
        timestampEnd: Joi.date().required(),
        sensorList: [Joi.array().items(Joi.number()), Joi.number()],
        accumulateData: Joi.bool(),
        ports: Joi.array().items(Joi.number()),
        aviaryId: Joi.string(),
        sensorGroupId: Joi.string(),
        asArray: Joi.bool(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get getRecent() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number(),
        collectorId: Joi.string(),
        timestampBegin: Joi.date(),
        timestampEnd: Joi.date(),
        sensorList: [Joi.array().items(Joi.number()), Joi.number()],
        sensorGroupId: Joi.string(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get getAggregate() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number(),
        collectorId: Joi.string(),
        measurement: Joi.string().required(),
        timestampBegin: Joi.date().required(),
        timestampEnd: Joi.date().required(),
        sensorList: [Joi.array().items(Joi.number()), Joi.number()],
        aggregateOperation: Joi.string().required(),
        separateBySensor: Joi.bool(),
        ports: Joi.array().items(Joi.number()),
        aviaryId: Joi.string(),
        sensorGroupId: Joi.string(),
      }).required(),
    };

    return this.validate(schema);
  }
}

module.exports = SensorDataSchema;
