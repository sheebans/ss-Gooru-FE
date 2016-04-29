import Ember from 'ember';
import Answer from 'gooru-web/models/content/answer';

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
        'text': null,
        'isCorrect': false,
        'type':"text"
      });
      this.get('answers').pushObject(newChoice);
      //this.set('question.answers',this.get('multipleChoiceAnswers'));
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
  //init(){
  //  this._super(...arguments);
  //  this.set('multipleChoiceAnswers',this.get('question.answers'));
  //},
  didUpdate(){
    this.validateAnswer();
  },
  // -------------------------------------------------------------------------
  // Properties
  ///**
  // * Multiple Choice Editing Mode Answers
  // * @property {Ember.Array}
  // */
  //multipleChoiceAnswers:Ember.A(),

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
