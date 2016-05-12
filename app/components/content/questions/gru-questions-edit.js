import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import Answer from 'gooru-web/models/content/answer';
import {QUESTION_CONFIG} from 'gooru-web/config/question';


export default Ember.Component.extend(ContentEditMixin,{

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/question
   */
  questionService: Ember.inject.service("api-sdk/question"),

  /**
   * @requires service:api-sdk/media
   */
  mediaService: Ember.inject.service("api-sdk/media"),
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions', 'gru-questions-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Edit Content
     */
    editContent: function () {
      var questionForEditing = this.get('question').copy();
      this.set('tempQuestion', questionForEditing);
      this.set('isEditing', true);
    },
    /**
     * Send request to publish a question
     */
    sendRequest: function () {
      this.set('wasRequestSent', true);
    },
    /**
     * Select question type
     */
    selectType:function(){
      //TO DO
      //this.set('tempQuestion.type', type); //Not supported yet
    },
    /**
     * Save Content
     */
    updateContent: function () {
      this.saveNewContent();
    },
    /**
     * Enable edit content builder
     */
    editBuilderContent: function(){
      var questionForEditing = this.get('question').copy();
      this.set('tempQuestion', questionForEditing);
      this.set('isBuilderEditing', true);
    },
    /**
     * Disable edit content builder
     */
    cancelBuilderEdit: function(){
      this.set('isBuilderEditing', false);
    },
    /**
      * Save Content
    */
    optionSwitch:function(isChecked){
      var questionForEditing = this.get('question').copy();
      this.set('tempQuestion', questionForEditing);
      this.set('tempQuestion.isVisibleOnProfile', isChecked);
      this.saveNewContent();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Question model as instantiated by the route. This is the model used when not editing
   * or after any question changes have been saved.
   * @property {Question}
   */
  question: null,
  /**
   * Copy of the question model used for editing.
   * @property {Question}
   */
  tempQuestion: null,
  /**
   * Request pending approval
   * // TODO: Change this to a computed property of a question property
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the question searchable been sent?
   * // TODO: Change this to a computed property of a question property
   * @property {Boolean}
   */
  wasRequestSent: false,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions:Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),

  /**
   * @property{Array{}} questionTypes
   */
  questionTypes: Ember.computed(function(){
    let array = Ember.A(Object.keys(QUESTION_CONFIG));
    return array;
  }),
  /**
   * @property {Boolean} isBuilderEditing
   */
  isBuilderEditing :false,

  /**
   * @property {Boolean} Indicates if a correct answer is required
   */
  correctAnswerNotSelected: false,

  /**
   * @property {Boolean} Indicates if a Hot spot answer has images
   */
  hasNoImages: false,

  //Methods

  /**
   * Save new question content
   */
  saveNewContent: function() {
    const component = this;
    var editedQuestion = this.get('tempQuestion');
    var promiseArray = [];
    var answersPromise = null;

    if (editedQuestion.get('isFIB')) {
      editedQuestion.set('answers', component.defineFIBAnswers(editedQuestion));
      component.updateQuestion(editedQuestion, component);
    } else {
      if (editedQuestion.get('answers')) {
        if (editedQuestion.get('isHotSpotImage')) {
          this.hasImages(editedQuestion.get('answers'));
          promiseArray = editedQuestion.get('answers').map(
            component.getAnswerSaveImagePromise.bind(component)
          );
          answersPromise = Ember.RSVP.Promise.all(promiseArray).then(function (values) {
            for (var i = 0; i < editedQuestion.get('answers').length; i++) {
              editedQuestion.get('answers')[i].set('text', values[i]);
            }
            return Ember.RSVP.Promise.all(
              editedQuestion.get('answers').map(component.getAnswerValidatePromise)
            );
          });
        } else {
          promiseArray = editedQuestion.get('answers').map(component.getAnswerValidatePromise);
          answersPromise = Ember.RSVP.Promise.all(promiseArray);
        }
        answersPromise.then(function(values) {
          if (component.validateAnswers.call(component, values, editedQuestion)) {
            component.updateQuestion(editedQuestion,component);
          }
        });
      } else {
        component.updateQuestion(editedQuestion,component);
      }
    }
  },

  updateQuestion:function(editedQuestion,component){
    editedQuestion.validate().then(function ({ model, validations }) {
      if (validations.get('isValid')) {
        component.get('questionService').updateQuestion(editedQuestion.id, editedQuestion)
          .then(function () {
            component.set('question', editedQuestion);
            component.set('isEditing', false);
            component.set('isBuilderEditing', false);
          }.bind(this))
          .catch(function (error) {
            var message = component.get('i18n').t('common.errors.question-not-updated').string;
            component.get('notifications').error(message);
            Ember.Logger.error(error);
          }.bind(component));
      }
      component.set('didValidate', true);
    });
  },

  defineFIBAnswers: function(question) {
    let answers = Ember.A([]);
    const questionText = question.get('text');
    const regExp = /(\[[^\[\]]+\])+/gi;
    const matchedAnswers = questionText.match(regExp);
    if (matchedAnswers) {
      answers = matchedAnswers.map(function(answer, index) {
        return Answer.create({
          sequence: index + 1,
          text: answer.substring(1, answer.length - 1),
          isCorrect: true,
          type: 'text'
        });
      });
    }
    return answers;
  },

  /**
   * Check that validate promises are not returning false
   */
  validateAnswers: function(promiseValues, question) {
    var valid = true;
    promiseValues.find(function (promise) {
      if (promise === false) {
        valid = false;
      }
    });
    return valid && this.isCorrectAnswerSelected(question);
  },

  /**
   * Check if an answer is selected as correct
   */
  isCorrectAnswerSelected: function(question) {
    if(question.get('answers').length > 0){
      let correctAnswers = question.get('answers').filter(function(answer) {
        return answer.get('isCorrect');
      });
      if (correctAnswers.length > 0) {
        this.set('correctAnswerNotSelected', false);
      } else {
        this.set('correctAnswerNotSelected', true);
        return false;
      }
    }
    return true;
  },

  /**
   * Returns upload image promises
   */
  getAnswerSaveImagePromise: function(answer) {
    if (answer.get('text') && typeof (answer.get('text').name) === 'string') {
      return this.get('mediaService').uploadContentFile(answer.get('text'));
    } else {
      return answer.get('text');
    }
  },

  /**
   * Returns validate image promises
   */
  getAnswerValidatePromise: function(answer) {
    return answer.validate().then(function ({ model, validations }) {
      return validations.get('isValid');
    });
  },

  /**
   * Check if an answer is selected as correct
   */
  hasImages: function(answers) {
    if(answers.length > 0){
      let answerImages = answers.filter(function(answer) {
        return answer.get('text')==null;
      });
      if (answerImages.length > 0) {
        this.set('hasNoImages', true);
      } else {
        this.set('hasNoImages', false);
        return false;
      }
    }
    return true;
  }

});
