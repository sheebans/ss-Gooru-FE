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

  classNames: ['library', 'gru-browse-library'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'featured-libraries',
      text: this.get('i18n').t('library.gru-browse-library.featured-libraries')
    }];
  }),
  /**
   * @property {String} selected Current option selected
   */
  selected: 'featured-libraries'
});
