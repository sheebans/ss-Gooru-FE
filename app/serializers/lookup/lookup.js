import Ember from 'ember';
import CountryModel from 'gooru-web/models/country';

/**
 * Serializer to support the Profile CRUD operations for API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  /**
   * Normalizes countries
   * @param {} payload
   * @returns {Country[]}
   */
  normalizeReadCountries: function (payload) {
    const countries = payload.countries || [];
    return countries.map(function(country){
      return CountryModel.create({ id: country.id, name: country.name, code: country.code });
    });
  }
});
