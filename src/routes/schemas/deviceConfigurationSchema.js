const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class DeviceConfigurationSchema extends RouteValidator {
  static get getNetworkConfiguration() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number(),
        collectorId: Joi.string(),
        sensorGroupId: Joi.string(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get putSensorConfiguration() {
    const schema = {
      params: Joi.object().keys({
        sensorRootId: Joi.number().required(),
      }).required(),
      body: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number().required(),
        label: Joi.string(),
        alertConfiguration: Joi.object().keys({
          temperature: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          humidity: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          luminosity: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          co2: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          voc: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
        }),
        miscConfiguration: Joi.object().keys({
          inputsLabels: Joi.array().items(Joi.string().optional()),
          energyInputs: Joi.array().items(Joi.number().optional()),
          weightInputs: Joi.object().keys({
            X0: Joi.number(),
            X1: Joi.number(),
          }),
        }),
      }).required(),
    };

    return this.validate(schema);
  }

  static get putCollectorConfiguration() {
    const schema = {
      params: Joi.object().keys({
        sensorRootId: Joi.number().required(),
      }).required(),
      body: Joi.object().keys({
        clientId: Joi.number().required(),
        network: Joi.number().required(),
        label: Joi.string(),
        alertConfiguration: Joi.object().keys({
          temperature: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          humidity: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          luminosity: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          co2: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
          voc: Joi.object().keys({
            min: Joi.number(),
            max: Joi.number(),
          }),
        }),
      }).required(),
    };

    return this.validate(schema);
  }

  static get getClientSensors() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
      }).required(),
    };

    return this.validate(schema);
  }
}

module.exports = DeviceConfigurationSchema;
