"use strict";

/**
 * reservation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::reservation.reservation",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const eventId = ctx.request.body.data.evening;
        const evening = await strapi.entityService.findOne(
          "api::evening.evening",
          eventId
        );
        const numberOfPlaces = ctx.request.body.data.numberOfPlaces;

        if (evening.placesAvailables < numberOfPlaces) {
          ctx.response.status = 400;
          return { message: "Not enough places" };
        }

        await strapi.entityService.update("api::evening.evening", eventId, {
          data: {
            placesAvailables: evening.placesAvailables - numberOfPlaces,
          },
        });

        const { data, meta } = await super.create(ctx);

        return { data, meta };
      } catch (error) {
        ctx.response.status = 500;
        return { message: error.message };
      }
    },
  })
);
