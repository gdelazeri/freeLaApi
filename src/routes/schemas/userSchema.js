const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class UserSchema extends RouteValidator {

  static get login() {
    const schema = {
      body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        expirationTime: [Joi.number(), Joi.string()],
      }).required(),
    };

    return this.validate(schema);
  }

  static get getAllClients() {
    const schema = { };
    return this.validate(schema);
  }

  static get getClients() {
    const schema = {
      query: Joi.object().keys({
        clientIds: Joi.array().items(
          Joi.number()).required(),
      }).required(),
    };
    return this.validate(schema);
  }

  static get getCollectors() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      query: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get list() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.string().required(),
        role: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string(),
        name: Joi.string().required(),
        clientId: Joi.number().required(),
        role: Joi.number().required(),
        collectorAccess: Joi.array().items(Joi.string()),
      }).required(),
    };

    return this.validate(schema);
  }

  static get confirmLogin() {
    const schema = {
      body: Joi.object().keys({
        clientId: Joi.number().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        name: Joi.string(),
        password: Joi.string(),
        clientId: Joi.number(),
        role: Joi.number(),
        collectorAccess: Joi.array().items(Joi.string()),
      }).required(),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get aviaryAlert() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        aviaryId: Joi.string(),
        enable: Joi.bool(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get passwordRecoveryRequest() {
    const schema = {
      body: Joi.object().keys({
        email: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get passwordRecovery() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        password: Joi.string(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get playerId() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        playerId: Joi.string(),
      }).required(),
    };

    return this.validate(schema);
  }

}

module.exports = UserSchema;
