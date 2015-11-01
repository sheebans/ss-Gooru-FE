import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @property {array} Collection results for the search
   */
  collectionResults: null,

  /**
   * @property {array} Term used to search
   */
  term: '',

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
      var component = this;
      component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  }

});
