import Ember from 'ember';

/**
 * @typedef {object} i18nMixin
 */
export default Ember.Mixin.create({

  /**
   * @property i18n service
   */
  i18n: Ember.inject.service(),

  /**
   * Wrapper method for i18n
   * @param {string} key
   * @param {object} options
   */
  t: function(key, options){
    return this.get('i18n').t(key, options);
  }

});
