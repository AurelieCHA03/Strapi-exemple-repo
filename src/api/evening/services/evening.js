'use strict';

/**
 * evening service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::evening.evening');
