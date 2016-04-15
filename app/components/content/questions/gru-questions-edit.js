import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import {QUESTION_CONFIG} from 'gooru-web/config/question';
import {normalizeQuestionTypes} from 'gooru-web/utils/utils';


export default Ember.Component.extend(ContentEditMixin,{
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
    selectType:function(type){
      this.set('tempQuestion.type', type);
    },
    /**
     * Save Content
     */
    updateContent: function () {

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
   * @type {Array{}} questionTypes
   */
  questionTypes: Ember.computed(function(){
    let array = Ember.A(Object.keys(QUESTION_CONFIG));
    const $component = this;
    let arrayTypes=array.map(function(item){
      return normalizeQuestionTypes(item);
    });
    return arrayTypes;
  }),

});
