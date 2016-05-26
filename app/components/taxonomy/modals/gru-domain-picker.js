import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'modals', 'gru-domain-picker'],


  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super( ...arguments );

    this.set('panelHeaders', [
      this.get('i18n').t('common.course').string,
      this.get('i18n').t('common.domain').string
    ]);
  },

  // -------------------------------------------------------------------------
  // Properties

  callback: null,

  panelHeaders: []
});
