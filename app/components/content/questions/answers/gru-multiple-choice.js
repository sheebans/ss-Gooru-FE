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

  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Multiple Choice Answer
   * @property {Ember.Array}
   */
  multipleChoiceAnswers:Ember.A([Ember.Object.create({
    'answer': "Answer choice goes here",
    'isCorrect': true
  }),Ember.Object.create({
    'answer': "Answer choice goes here",
    'isCorrect': false
  })]),

});
