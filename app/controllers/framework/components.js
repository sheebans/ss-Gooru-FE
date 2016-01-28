import Ember from 'ember';
import {startQuestion, stopQuestion} from '../../utils/events';

import SessionMixin from '../../mixins/session';

export default Ember.Controller.extend(SessionMixin, {
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
    },

    /**
     * Calls the API in order to start the question
     * Question object is use to get the data
     * Access SessionMixin to get some necessary info
     */
    startQuestion: function(){
      var question = {
        id: '46d4a6d4-991b-4c51-a656-f694e037dd68',
        questionType: 'FIB'
      };

      startQuestion(question, this.get('session'));

    },

    /**
     * Calls the API in order to stop the question
     * Question object is use to get the data
     * isAnswerCorrect is the result of the question
     * Answer object is not define at all let's hardcoded in that way for now
     * Access SessionMixin to get some necessary info
     */
    stopQuestion: function(){
      var question = {
        id: '46d4a6d4-991b-4c51-a656-f694e037dd68',
        questionType: 'FIB'
      };

      var answer = [
        {
          "text": "Dwight Eisenhower",
          "status": "0",
          "order": "1",
          "answerId": 10752617,
          "timeStamp": 1450954902869,
          "skip": false
        }
      ];

      var isAnswerCorrect = true;

      stopQuestion(question, isAnswerCorrect, answer, this.get('session'));
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

  stackedHorizontalBarData: Ember.A([Ember.Object.create({
    color: "#00e100",
    percentage: "20"
  }),Ember.Object.create({
    color: "#ff5a5a",
    percentage: "35"
  }),Ember.Object.create({
    color: "#885aff",
    percentage: "20"
  })]),



  question : Ember.Object.create({
    answers: Ember.A([
      Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
      Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
      Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
    ])
  }),

  resource:Ember.Object.create({
    resourceType:"video/youtube",
    isQuestion:false,
    title:"Ember"
  }),
  resourceResult: Ember.Object.create({
    timeSpent: 0
  }),

  secondScenarioResource:Ember.Object.create({
    resourceType:"video/youtube",
    isQuestion:false,
    title:"Learn the MEAN Stack",
    description:"Some Description"
  }),
  secondScenarioResourceResult: Ember.Object.create({
    reaction: 0,
    timeSpent: 12345
  }),

  thirdScenarioResource:Ember.Object.create({
    resourceType:"video/youtube",
    isQuestion:false,
    title:"Learn the MEAN Stack",
    description:"Some Description"
  }),
  thirdScenarioResourceResult: Ember.Object.create({
    reaction: 2,
    timeSpent: 2841
  }),

  fourthScenarioResource:Ember.Object.create({
    resourceType:"question",
    questionType:'FIB',
    isQuestion:true,
    title:"Question with a very long name",
    description:"Some Description"
  }),
  fourthScenarioResourceResult: Ember.Object.create({
    reaction: 4,
    timeSpent: 2341
  })

});


