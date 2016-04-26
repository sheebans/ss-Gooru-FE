import Ember from 'ember';

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
     var newChoice = Ember.Object.create({
        'answer': "Answer choice goes here",
        'isCorrect': false
      });
      this.get('multipleChoiceAnswers').pushObject(newChoice);
    },
    //Remove existing answer
    removeChoice:function(answer){
      this.get('multipleChoiceAnswers').removeObject(answer);
    },
    //Select correct answer
    setCorrect:function(answer){
      var correctAnswer = this.get('multipleChoiceAnswers').findBy('isCorrect',true);
      if(typeof correctAnswer !== 'undefined'){
        Ember.set(correctAnswer,'isCorrect',false);
      }
      Ember.set(answer,'isCorrect',true);
    },
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Multiple Choice Answer
   * @property {Ember.Array}
   */
  multipleChoiceAnswers:Ember.A([]),

  answersList:Ember.computed('multipleChoiceAnswers.[]',function(){
    return this.get('multipleChoiceAnswers');
  })

});
