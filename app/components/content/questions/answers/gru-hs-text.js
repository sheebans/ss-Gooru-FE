import Ember from 'ember';
import Answer from 'gooru-web/models/content/answer';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content', 'questions','answers', 'gru-hs-text'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Add new answer choice
     */
    addNewChoice: function() {
     var newChoice = Answer.create(Ember.getOwner(this).ownerInjection(), {
        'text': null,
        'isCorrect': false,
        'type': "text"
      });
      this.get('answers').pushObject(newChoice);
    },
    /**
     * Remove existing answer
     */
    removeChoice: function(answer) {
      this.get('answers').removeObject(answer);
    },
    /**
     * Select correct answer
     */
    setCorrect: function(answer) {
      Ember.set(answer, 'isCorrect', !Ember.get(answer, 'isCorrect'));
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didUpdate() {
    this.validateAnswer();
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Multi Select Text Answers
   */
  answers: null,

  /**
   * Is in edit mode
   */
  editMode: false,

  // -------------------------------------------------------------------------
  // Method
  validateAnswer: function() {
    this.$('.text-area-container textarea').trigger('blur');
  }
});
