const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class BatchSchema extends RouteValidator {
  static get post() {
    const schema = {
      body: Joi.object().keys({
        clientId: Joi.number().required(),
        status: Joi.number(),
        aviaryId: Joi.string().required(),
        expectedDuration: Joi.number().required(),
        expectedStartDate: Joi.string().required(),
        goalIEP: Joi.number(),
        technicians: Joi.array().items(
          Joi.string(),
        ),
        collectorId: Joi.string(),
        size: Joi.number().required(),
        feedOnSilo: Joi.number(),
        equipment: Joi.array().items(
          Joi.string(),
        ),
        chickOrigin: Joi.array().items(
          Joi.object().keys({
            origin: Joi.string(),
            numberOfChicken: Joi.number(),
          }),
        ),
        referenceId: Joi.string().required(),
        line: Joi.array().items(
          Joi.string(),
        ),
        matrixAge: Joi.number(),
        luminaire: Joi.bool(),
        feeder: Joi.bool(),
        drinker: Joi.bool(),
        newBed: Joi.bool(),
        curtain: Joi.number(),
        mountedCircles: Joi.number(),
        washed: Joi.bool(),
        disinfected: Joi.bool(),
        initialWeight: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      query: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        status: Joi.number(),
        technicians: Joi.array().items(
          Joi.string(),
        ),
        expectedDuration: Joi.number(),
        expectedStartDate: Joi.string(),
        goalIEP: Joi.number(),
        collectorId: Joi.array().items(
          Joi.string(),
        ),
        size: Joi.number(),
        feedOnSilo: Joi.number(),
        feedEntries: Joi.array().items(
          Joi.object().keys({
            value: Joi.number(),
            date: Joi.date(),
          })),
        equipment: Joi.array().items(
          Joi.object().keys({
            _id: Joi.string(),
            inUseSince: Joi.string(),
            outOfService: Joi.string(),
          }),
        ),
        chickOrigin: Joi.array().items(
          Joi.object().keys({
            origin: Joi.string(),
            numberOfChicken: Joi.number(),
          }),
        ),
        mortality: Joi.number(),
        dead: Joi.number(),
        eliminated: Joi.number(),
        mortalityHistory: Joi.array().items(
          Joi.object().keys({
            value: Joi.number(),
            dead: Joi.number(),
            eliminated: Joi.number(),
            date: Joi.date(),
          }),
        ),
        averageWeight: Joi.number(),
        weightHistory: Joi.array().items(
          Joi.object().keys({
            value: Joi.number(),
            count: Joi.number(),
            date: Joi.date(),
          }),
        ),
        referenceId: Joi.string(),
        clientId: Joi.number(),
        line: Joi.array().items(
          Joi.string(),
        ),
        matrixAge: Joi.number(),
        luminaire: Joi.bool(),
        feeder: Joi.bool(),
        drinker: Joi.bool(),
        newBed: Joi.bool(),
        curtain: Joi.number(),
        mountedCircles: Joi.number(),
        washed: Joi.bool(),
        disinfected: Joi.bool(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get list() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        aviaryId: Joi.string(),
        status: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get listRecent() {
    const schema = {
      query: Joi.object().keys({
        clientId: Joi.number().required(),
        aviaryId: Joi.string(),
        qty: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get addToMortality() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        deathToll: Joi.number().required(),
        eliminated: Joi.number(),
        date: Joi.date().required(),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get editMortality() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        mortalityEntries: Joi.array().items(
          Joi.object().keys({
            dead: Joi.number().required(),
            eliminated: Joi.number().required(),
            date: Joi.date().required(),
          })),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get addToWeight() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        weight: Joi.number().required(),
        count: Joi.number().required(),
        date: Joi.date().required(),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get editWeight() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        weightEntries: Joi.array().items(
          Joi.object().keys({
            value: Joi.number().required(),
            count: Joi.number().required(),
            date: Joi.date().required(),
          })),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get addToFeedOnSilo() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        amount: Joi.number().required(),
        date: Joi.date().required(),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get editFeedEntries() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        feedEntries: Joi.array().items(
          Joi.object().keys({
            value: Joi.number().required(),
            date: Joi.date().required(),
            type: Joi.number(),
          })),
      }).required(),
    };

    return this.validate(schema);
  }

  static get startBatch() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        startDate: Joi.date(),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get endBatch() {
    const schema = {
      params: Joi.object().keys({
        batchId: Joi.string().required(),
      }).required(),
      body: Joi.object().keys({
        endDate: Joi.date(),
        clientId: Joi.number(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get waterPerAnimal() {
    const schema = {
      query: Joi.object().keys({
        batchId: Joi.string().required(),
        timestampBegin: Joi.date(),
        timestampEnd: Joi.date(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get waterFeedRatio() {
    const schema = {
      query: Joi.object().keys({
        batchId: Joi.string().required(),
        timestampBegin: Joi.date(),
        timestampEnd: Joi.date(),
      }).required(),
    };

    return this.validate(schema);
  }

  static get listExpiredBatches() {
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

module.exports = BatchSchema;
