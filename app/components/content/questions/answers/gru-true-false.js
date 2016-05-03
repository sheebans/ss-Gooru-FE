import Ember from 'ember';
import Answer from 'gooru-web/models/content/answer';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions','answers', 'gru-true-false'],
  // -------------------------------------------------------------------------
  // Actions
  actions:{
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
  init(){
    this._super(...arguments);
    if(this.get('answers').length === 0){
      var options = Ember.A([
        Answer.create(Ember.getOwner(this).ownerInjection(),{
          'text': "True",
          'isCorrect': true,
        }), Answer.create(Ember.getOwner(this).ownerInjection(),{
          'text': "False",
          'isCorrect': false
        })
      ]);
      this.set('answers',options);
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * True/False Question Answers
   * */

  answers:null,


});
