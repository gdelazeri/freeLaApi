// const Joi = require('joi');
// const RouteValidator = require('../../middlewares/RouteValidator');

class ClientSchema extends RouteValidator {
  static get get() {
    const schema = {
      query: Joi.object().keys({
        id: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  // static get list() {
  //   const schema = {
  //     query: Joi.object().keys({
  //       professionalId: Joi.number(),
  //     }).required(),
  //   };

  //   return this.validate(schema);
  // }

  // static get add() {
  //   const schema = {
  //     body: Joi.object().keys({
  //       email: Joi.string().required(),
  //       password: Joi.string(),
  //       name: Joi.string().required(),
  //       role: Joi.number().required(),
  //       collectorAccess: Joi.array().items(Joi.string()),
  //     }).required(),
  //   };

  //   return this.validate(schema);
  // }

  // static get edit() {
  //   const schema = {
  //     params: Joi.object().keys({
  //       id: Joi.number().required(),
  //     }).required(),
  //     body: Joi.object().keys({

  //     }).required(),
  //   };

  //   return this.validate(schema);
  // }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.number().required(),
      }).required(),
    };

    return this.validate(schema);
  }

}

module.exports = ClientSchema;
