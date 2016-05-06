import Ember from 'ember';
import Answer from 'gooru-web/models/content/answer';

/**
 *
 * Component for building (i.e. adding/removing answers) of a (drag/drop) re-order question
 *
 * @module
 * @augments Ember/Component
 *
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions','answers', 'gru-reorder'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{

    //Add new answer choice
    addNewChoice:function(){
      var newChoice = Answer.create(Ember.getOwner(this).ownerInjection(), {
        'text': null,
        'isCorrect': null,
        'type':"text",
        'sequence': (this.get('answers.length') + 1)
      });
      this.get('answers').pushObject(newChoice);
    },

    // Remove existing answer
    removeChoice:function(answer) {
      this.get('answers').removeObject(answer);
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
   * Question answers
   */
  answers:null,

  // -------------------------------------------------------------------------
  // Method

  validateAnswer:function(){
    this.$('.text-area-container textarea').trigger('blur');
  }


});
