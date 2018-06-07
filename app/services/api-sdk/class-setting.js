import Ember from 'ember';
import ClassSettingAdapter from 'gooru-web/adapters/class/class-setting';

/**
 * @typedef {Object} ClassSettingService
 */
export default Ember.Service.extend({
  /**
   * @property {ClassSettingAdapter} classSettingAdapter
   */
  classSettingAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'classSettingAdapter',
      ClassSettingAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Update Rescope class setting
   *
   * @param {String} classId
   * @param {Boolean} rescope
   * @returns {Boolean}
   */
  updateRescopeClassSetting: function(classId, rescope) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classSettingAdapter')
        .updateRescopeClassSetting(classId, rescope)
        .then(function() {
          resolve(true);
        }, reject);
    });
  }
});
