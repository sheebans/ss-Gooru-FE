import Ember from 'ember';
import {startQuestion, stopQuestion} from '../../utils/events';
import ResourceResult from 'gooru-web/models/result/resource';
import QuestionResult from 'gooru-web/models/result/question';

import SessionMixin from '../../mixins/session';

export default Ember.Controller.extend(SessionMixin, {
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-bubbles
     */
    bubbleOptionSelected: function (option) {
      Ember.Logger.debug(option);
    },

    /**
     * Handle event triggered by gru-switch
     */
    optionSwitch:function(option){
      Ember.Logger.debug(option);
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

  resource: ResourceResult.create({
    resourceFormat:"interactive",
    title: "Ember",
    timeSpent: 0
  }),

  secondScenarioResource: ResourceResult.create({
    resourceFormat:"webpage",
    title:"Learn the MEAN Stack",
    reaction: 0,
    timeSpent: 12345
  }),

  thirdScenarioResource: ResourceResult.create({
    resourceFormat:"video",
    title:"Learn the MEAN Stack",
    reaction: 2,
    timeSpent: 2841
  }),

  fourthScenarioResource: QuestionResult.create({
    resourceFormat:"question",
    title: "Question with a very long name",
    question: {
      text: "Question with a very long name",
      questionType: 'FIB'
    },
    reaction: 4,
    timeSpent: 2341
  }),

  assessment: Ember.Object.create({
    title: "Biodiversity at All Three Levels",
    resourceCount: 3,
    questionCount:4,
    isAssessment:true,
    course:"Math",
    standards:Ember.A([Ember.Object.create({
      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
      name:"CCSS.Math.Content.7.RP.A.3"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      name:"CCSS.Math.Content.5.NBT.A.2"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      name:"CCSS.Math.Content.5.NBT.A.2"
    })]),
    author:"dara.weiner",
    description:"Students will be able to break salt down into its basic chemical components (NaCl) and describe how these atoms come together to form this important compound."
  }),
  collection: Ember.Object.create({
    title: "Collection Title",
    questionCount:4,
    resourceCount: 1,
    course:"Math",
    isAssessment:false,
    standards:Ember.A([Ember.Object.create({
      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
      name:"CCSS.Math.Content.7.RP.A.3"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      name:"CCSS.Math.Content.5.NBT.A.2"
    })]),
    author:"dara.weiner",
    remixedBy:["James","Andrea","Patric"]
  }),
  resource: Ember.Object.create({
    title: "Resource Title",
    isQuestion:false,
    resourceFormat:"video",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    owner:Ember.Object.create({
      name:"Publisher"
    })
  }),
  question: Ember.Object.create({
    title: "Question Title",
    isQuestion:true,
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    owner:Ember.Object.create({
      name:"Publisher"
    })
  }),
});


