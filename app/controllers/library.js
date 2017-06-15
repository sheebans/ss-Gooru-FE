import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'featured-courses',
      text: this.get('i18n').t('library.featured-courses')
    }, {
      name: 'other-libraries',
      text: this.get('i18n').t('library.other-libraries')
    }];
  }),
  /**
   * @property {String} selected Current option selected
   */
  selected: 'featured-courses'
});
