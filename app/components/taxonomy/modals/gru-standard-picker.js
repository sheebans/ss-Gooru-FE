import Ember from 'ember';

/**
 * Standard Picker
 *
 * Component responsible for displaying three panels (course, domain and standards) for a tree
 * of browse items. Uses @see ../gru-taxonomy-picker
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'modals', 'gru-standard-picker'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    updateSelectedTags(selectedTags) {
      this.get('model.callback').success(selectedTags);
      this.triggerAction({ action: 'closeModal' });
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super( ...arguments );

    this.set('panelHeaders', [
      this.get('i18n').t('common.course').string,
      this.get('i18n').t('common.domain').string,
      this.get('i18n').t('common.standard').string
    ]);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Callback object made up of two properties: success and fail
   * callback.success will be called on the 'updateSelectedTags' action.
   * @prop {Object}
   */
  callback: null,

  /**
   * Headers to display at the top of each one of the panels (course, domain
   * and standards). There *must* be one for each panel.
   * @prop {String[]}
   */
  panelHeaders: []
});
