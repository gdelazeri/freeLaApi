const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class AviarySchema extends RouteValidator {
  static get post() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().required(),
        clientId: Joi.number().required(),
        location: Joi.object().keys({
          geolocation: Joi.object().keys({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
          }),
          UF: Joi.string().required(),
          address: Joi.string().required(),
          CEP: Joi.number().required(),
          city: Joi.string().required(),
        }),
        status: Joi.number(),
        producer: Joi.string().required(),
        technicians: Joi.array().items(
          Joi.string(),
        ),
        collectorId: Joi.array().items(
          Joi.string(),
        ),
        capacity: Joi.number().required(),
        size: Joi.object().keys({
          width: Joi.number(),
          length: Joi.number(),
          height: Joi.number(),
        }),
        type: Joi.number().required(),
        feederOutFlow: Joi.number(),
        siloCapacity: Joi.number(),
        timezone: Joi.string(),
        voltage: Joi.number(),
        timezone: Joi.string(),
        consumption: Joi.object().keys({
          useTC: Joi.bool(),
          useWeightSensor: Joi.bool(),
          useHydrometerSensor: Joi.bool(),
          useWaterFluxSensor: Joi.bool(),
        }),
        surveillance: Joi.object().keys({
          type: Joi.number().optional(),
          ip: Joi.string().optional(),
          port: Joi.number().optional(),
          username: Joi.string().optional(),
          password: Joi.string().optional(),
        }),
        sap: Joi.object().keys({
          ID: Joi.number().optional(),
          link: Joi.array().items(Joi.string()).optional(),
          bearer: Joi.array().items(Joi.string()).optional(),
          sensorAlternateId: Joi.string().optional(),
          certificate: Joi.string().optional(),
          version: Joi.number().optional(),
        }),
        equipmentPositions: Joi.array().items(
          Joi.object().keys({
            equipmentId: Joi.string().optional(),
            x: Joi.number().optional(),
            y: Joi.number().optional(),
            positionId: Joi.number().optional(),
          }),
        ),
      }).required(),
    };

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      query: Joi.object().keys({
        aviaryId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        aviaryId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        name: Joi.string(),
        clientId: Joi.number(),
        location: Joi.object().keys({
          geolocation: Joi.object().keys({
            latitude: Joi.number(),
            longitude: Joi.number(),
          }),
          UF: Joi.string(),
          address: Joi.string(),
          CEP: Joi.number(),
          city: Joi.string(),
        }),
        status: Joi.number(),
        producer: Joi.string(),
        technicians: Joi.array().items(
          Joi.string(),
        ),
        collectorId: Joi.array().items(
          Joi.string(),
        ),
        capacity: Joi.number(),
        size: Joi.object().keys({
          width: Joi.number(),
          length: Joi.number(),
          height: Joi.number(),
        }),
        type: Joi.number(),
        feederOutFlow: Joi.number(),
        siloCapacity: Joi.number(),
        timezone: Joi.string(),
        voltage: Joi.number(),
        consumption: Joi.object().keys({
          useTC: Joi.bool(),
          useWeightSensor: Joi.bool(),
          useHydrometerSensor: Joi.bool(),
          useWaterFluxSensor: Joi.bool(),
        }),
        equipmentPositions: Joi.array().items(
          Joi.object().keys({
            _id: Joi.string(),
            equipmentId: Joi.string().allow(null),
            x: Joi.number(),
            y: Joi.number(),
          })),
        surveillance: Joi.object().keys({
          type: Joi.number().optional(),
          ip: Joi.string().optional(),
          port: Joi.number().optional(),
          username: Joi.string().optional(),
          password: Joi.string().optional(),
        }),
      }).required(),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        aviaryId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get list() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get listUserAviaries() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        userId: Joi.string().required(),
        role: Joi.number(),
      }).required(),
    };
    return this.validate(schema);
  }
}

module.exports = AviarySchema;
