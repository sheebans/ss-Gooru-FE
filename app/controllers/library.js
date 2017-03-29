import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'browse-library',
      text: this.get('i18n').t('library.browse-library')
    }];
  }),
  /**
   * @property {String} selected Current option selected
   */
  selected: 'browse-library'
});
