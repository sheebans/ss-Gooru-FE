import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
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
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions', 'gru-questions-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Dependencies

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
      const component = this;
      var editedQuestion = this.get('tempQuestion');
      editedQuestion.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          component.get('questionService').updateQuestion(editedQuestion.id,editedQuestion)
            .then(function () {
              component.set('question', editedQuestion);
              component.set('isEditing', false);
            }.bind(this))
            .catch(function () {
              var message = component.get('i18n').t('common.errors.question-not-updated').string;
              component.get('notifications').error(message);
            }.bind(component));
        }
        component.set('didValidate', true);
      });
    },
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
   * @type {Array{}} questionTypes
   */
  questionTypes: Ember.computed(function(){
    let array = Ember.A(Object.keys(QUESTION_CONFIG));
    return array;
  }),

});
