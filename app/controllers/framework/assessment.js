import Ember from 'ember';

export default Ember.Controller.extend({
/**
 * List of learning targets to be displayed by the component gru-mastery
 *
 * @constant {Array}
 */
  learningTargets:Ember.A([Ember.Object.create({
    'label': "1",
    'value': 'some-value-1'
  }), Ember.Object.create({
    'label': "2",
    'value': 'some-value-2'
  }), Ember.Object.create({
    'label': "3",
    'value':'some-value-3'
  })]),

  /**
   * List of question to be displayed by the question component
   *
   * @constant {Array}
   */
  questions: Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1"
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    order: 1,
    answer: "answer" // json object representing each question type answer
  }),Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2"
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    order: 2,
    answer: "answer" // json object representing each question type answer
  })])
});
