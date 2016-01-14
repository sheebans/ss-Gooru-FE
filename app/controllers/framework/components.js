import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-bubbles
     */
    bubbleOptionSelected: function (option) {
      console.log(option);
    },
    /**
     * Handle event triggered by gru-switch
     */
    optionSwitch:function(option){
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
    'value': 'some-value-1'
  }), Ember.Object.create({
    'label': "2",
    'status': 'incorrect',
    'value': 'some-value-2'
  }), Ember.Object.create({
    'label': "3",
    'status': 'incorrect',
    'value':'some-value-3'
  })]),
  /**
   * List of layouts to be displayed by the component
   *
   * @constant {Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    label: "Show Correct Answer",
    value: "some-value"
  }),Ember.Object.create({
    label: "Show Performance",
    value: "some-value"
  })]),

  pieData:Ember.A([Ember.Object.create({
    color: "#00e100",
    value: "20"
  }),Ember.Object.create({
    color: "#ff5a5a",
    value: "35"
   }),Ember.Object.create({
    color: "#885aff",
    value: "20"
    }),Ember.Object.create({
    color: "#ff860a",
    value: "30"
  })]),
});


