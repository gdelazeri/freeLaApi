const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class ConsumptionSchema extends RouteValidator {
  static get recalculateFeedOnDate() {
    const schema = {
      body: Joi.object().keys({
        aviaryId: Joi.string().required(),
        batchId: Joi.string().required(),
        date: Joi.date().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get feedOnPeriod() {
    const schema = {
      query: Joi.object().keys({
        aviaryId: Joi.string().required(),
        batchId: Joi.string().required(),
        timestampBegin: Joi.date().required(),
        timestampEnd: Joi.date().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get consumptionOnPeriod() {
    const schema = {
      query: Joi.object().keys({
        aviaryId: Joi.string().required(),
        batchId: Joi.string().required(),
        timestampBegin: Joi.date().required(),
        timestampEnd: Joi.date().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get recalculateEnergyOnDate() {
    const schema = {
      body: Joi.object().keys({
        aviaryId: Joi.string().required(),
        batchId: Joi.string().required(),
        date: Joi.date().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get recalculateWaterOnDate() {
    const schema = {
      body: Joi.object().keys({
        aviaryId: Joi.string().required(),
        batchId: Joi.string().required(),
        date: Joi.date().required(),
      }).required(),
    };

    return this.validate(schema);
  }
}

module.exports = ConsumptionSchema;
