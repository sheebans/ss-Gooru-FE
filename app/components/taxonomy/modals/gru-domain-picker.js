import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super( ...arguments );

    this.set('panelHeaders', [
      this.get('i18n').t('common.courses').string,
      this.get('i18n').t('common.domains').string,
    ]);
  },

  // -------------------------------------------------------------------------
  // Properties

  callback: null,

  panelHeaders: []
});
