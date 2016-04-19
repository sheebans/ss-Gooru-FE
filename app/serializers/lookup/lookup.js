import Ember from 'ember';
import CountryModel from 'gooru-web/models/country';
import StateModel from 'gooru-web/models/state';
import DistrictModel from 'gooru-web/models/district';

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
  },

  /**
   * Normalizes states
   * @param {} payload
   * @returns {State[]}
   */
  normalizeReadStates: function (payload) {
    const states = payload.states || [];
    return states.map(function(state){
      return StateModel.create({ id: state.id, name: state.name, code: state.code });
    });
  },

  /**
   * Normalizes district
   * @param {} payload
   * @returns {District[]}
   */
  normalizeReadDistricts: function (payload) {
    const districts = payload['school-districts'] || [];
    return districts.map(function(district){
      return DistrictModel.create({ id: district.id, name: district.name, code: district.code });
    });
  }
});
