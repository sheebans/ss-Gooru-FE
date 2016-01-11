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
});
