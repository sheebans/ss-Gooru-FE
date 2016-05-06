import Ember from 'ember';
import Answer from 'gooru-web/models/content/answer';
import { generateUUID } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions','answers', 'gru-multiple-choice'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    //Add new answer choice
    addNewChoice:function(){
     var newChoice = Answer.create(Ember.getOwner(this).ownerInjection(),{
        'id': generateUUID(),
        'text': null,
        'isCorrect': false,
        'type':"text",
        'sequence': (this.get('answers.length') + 1)
      });
      this.get('answers').pushObject(newChoice);
    },
    //Remove existing answer
    removeChoice:function(answer){
      this.get('answers').removeObject(answer);
    },
    //Select correct answer
    setCorrect:function(answer){
      var correctAnswer = this.get('answers').findBy('isCorrect',true);
      if(correctAnswer){
        Ember.set(correctAnswer,'isCorrect',false);
      }
      Ember.set(answer,'isCorrect',true);
    },
  },
  // -------------------------------------------------------------------------
  // Events
  didUpdate(){
    this.validateAnswer();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
  * Multiple Choice Question Answers
  * */

  answers:null,

  // -------------------------------------------------------------------------
  // Method

  validateAnswer:function(){
    this.$('.text-area-container textarea').trigger('blur');
  }


});
