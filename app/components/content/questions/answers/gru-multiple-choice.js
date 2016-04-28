import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  answer: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-question-answer-text'
      })
    ]
  }
});

/**
 * Answer model
 * typedef {Object} Answer
 */
const Answer = Ember.Object.extend(Validations, {
  /**
   * @property {string} answer
   */
  answer: null,

  /**
   * @property {Boolean} isCorrect
   */
  isCorrect: false
});

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
        'answer': null,
        'isCorrect': false
      });
      this.get('multipleChoiceAnswers').pushObject(newChoice);
      this.set('question.answers',this.get('multipleChoiceAnswers'));
    },
    //Remove existing answer
    removeChoice:function(answer){
      this.get('multipleChoiceAnswers').removeObject(answer);
    },
    //Select correct answer
    setCorrect:function(answer){
      var correctAnswer = this.get('multipleChoiceAnswers').findBy('isCorrect',true);
      if(correctAnswer){
        Ember.set(correctAnswer,'isCorrect',false);
      }
      Ember.set(answer,'isCorrect',true);
    },
  },
  // -------------------------------------------------------------------------
  // Events
  //init(){
  //this._super(...arguments);
  //
  //},
  didUpdate(){
    this.validateAnswer();
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Multiple Choice Answer
   * @property {Ember.Array}
   */
  multipleChoiceAnswers:Ember.A(),

  question:null,

  // -------------------------------------------------------------------------
  // Method

  validateAnswer:function(){
    this.$('.text-area-container textarea').trigger('blur');
  }


});
