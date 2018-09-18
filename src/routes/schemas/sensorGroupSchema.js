const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');


class SensorGroupSchema extends RouteValidator {
  static get post() {
    const schema = {
      body: Joi.object().keys({
        label: Joi.string().required(),
        clientId: Joi.number().required(),
        aviaryList: Joi.array().items(
          Joi.string(),
        ).required(),
        userList: Joi.array().items(
          Joi.string(),
        ),
        sensorList: Joi.array().items(
          Joi.number(),
        ).required(),
        groupPosition: Joi.object().keys({
          x: Joi.number(),
          y: Joi.number(),
        }),
        sensorPosition: Joi.array().items(
          Joi.object().keys({
            sensorRootId: Joi.string(),
            x: Joi.number(),
            y: Joi.number(),
          })),
        alertConfigurationList: Joi.array().items(
          Joi.string(),
        ),
        showOnDashboard: Joi.bool(),
        isExternal: Joi.bool(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      query: Joi.object().keys({
        sensorGroupId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        sensorGroupId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        clientId: Joi.number(),
        label: Joi.string(),
        aviaryList: Joi.array().items(
          Joi.string(),
        ),
        userList: Joi.array().items(
          Joi.string(),
        ),
        sensorList: Joi.array().items(
          Joi.number(),
        ),
        groupPosition: Joi.object().keys({
          x: Joi.number(),
          y: Joi.number(),
        }),
        sensorPosition: Joi.array().items(
          Joi.object().keys({
            sensorRootId: Joi.string(),
            x: Joi.number(),
            y: Joi.number(),
          })),
        alertConfigurationList: Joi.array().items(
          Joi.string(),
        ),
        showOnDashboard: Joi.bool(),
        isExternal: Joi.bool(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        sensorGroupId: Joi.string().required(),
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

  static get listAviarySensorGroups() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        aviaryId: Joi.string().required(),
        showOnDashboard: Joi.bool(),
      }).required(),
    };
    return this.validate(schema);
  }

  static get listUserSensorGroups() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        userId: Joi.string().required(),
      }).required(),
    };
    return this.validate(schema);
  }

  static get getSensorsByMeasurementType() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        aviaryId: Joi.string().required(),
        measurement: Joi.string(),
      }).required(),
    };
    return this.validate(schema);
  }
}

module.exports = SensorGroupSchema;
