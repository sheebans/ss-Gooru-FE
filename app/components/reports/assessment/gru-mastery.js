import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-mastery'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of learning targets to be displayed by the component
   *
   * @constant {Array}
   */
  learningTargets:null
});
