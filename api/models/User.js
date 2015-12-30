/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      required: false
    },

    username: {
      type: 'string',
      required: true
    },

    createdOn: {
      type: 'datetime',
      required: true
    },
  }
};
