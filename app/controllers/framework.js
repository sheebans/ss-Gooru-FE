import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-bubbles
     */
    bubbleOptionSelected: function(option) {
      console.log(option);
    }

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of layouts to be displayed by the component
   *
   * @constant {Array}
   */
  bubbleOptions: Ember.A([Ember.Object.create({
    'label': "1",
    'status': 'correct',
    'value':Ember.Object.create({
      'questionType': "True/False",
      'text':"Practica usted ejercicio regularmente",
      'hints': null,
      'explanation': null,
      'answers': false
     })
    }),Ember.Object.create({
    'label': "2",
    'status': 'incorrect',
    'value':Ember.Object.create({
      'questionType': "fill in the blanks",
      'text':"El _______ es amarillo. La luna es_______",
      'hints': null,
      'explanation': null,
      'answers': ['sol','gris']
     }),
    }),Ember.Object.create({
    'label': "3",
    'status': 'incorrect',
    'value':Ember.Object.create({
      'questionType': "True/False",
      'text':"Es el 15 de setiembre la fecha de independecia de Costa Rica?",
      'hints': null,
      'explanation': null,
      'answers': true
    }),
  })]),
});
