import Ember from 'ember';
import Question from 'gooru-web/models/content/question';
import Collection from 'gooru-web/models/content/collection';
import {QUESTION_CONFIG, QUESTION_TYPES} from 'gooru-web/config/question';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {QuestionService} Question service API SDK
   */
  questionService: Ember.inject.service("api-sdk/question"),

  /**
   * @property {CollectionService} Collection service API SDK
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {AssessmentService} Assessment service API SDK
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-question-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    createQuestion: function () {
      const component = this;
      const question = component.get('question');
      question.set("title", component.get('i18n').t('common.new-question').string); //Default title
      question.set("description", component.get('i18n').t('common.new-question-text').string); //TODO temporal fix
      question.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          let questionId;
          component.get('questionService')
            .createQuestion(question)
            .then(function(newQuestion){
              questionId = newQuestion.get('id');
              if(component.get('model')) {
                let service = component.get('model') instanceof Collection ?
                  component.get('collectionService') : component.get('assessmentService');
                return service.addQuestion(component.get('model').get('id'), questionId);
              } else {
                return Ember.RSVP.resolve(true);
              }
            })
            .then(function() {
                component.closeModal(questionId);
              },
              function() {
                const message = component.get('i18n').t('common.errors.question-not-created').string;
                component.get('notifications').error(message);
              }
            );
        }
        component.set('didValidate', true);
      });
    },

    selectType:function(type){
      this.set('selectedType',type);
      this.set('question.type',this.get('selectedType'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var question = Question.create(Ember.getOwner(this).ownerInjection(), {title: null,type: QUESTION_TYPES.multipleChoice});
    this.set('question', question);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Question} question
   */
  question: null,

  /**
   * @type {String} selectedType
   */
  selectedType: Ember.computed('question.type',function(){
    return this.get('question.type');
  }),

  /**
   * @type {Array[]} questionTypes
   */
  questionTypes: Ember.computed(function() {
    const component = this;
    const isCollection = component.get('model.isCollection');
    var questionTypes =  Ember.A(Object.keys(QUESTION_CONFIG));
    if (isCollection===false){
      questionTypes = questionTypes.removeObject('OE');
    }
    return questionTypes;
  }),


  //Methods
  closeModal : function(questionId){
    const component = this;
    component.triggerAction({ action: 'closeModal' });

    const collectionId = component.get('model.id');
    const isCollection = component.get('model.isCollection');
    if (collectionId){
      const queryParams = {
        queryParams: {
          collectionId: collectionId,
          isCollection: isCollection
        }
      };
      component.get('router').transitionTo('content.questions.edit', questionId, queryParams);
    }
    else{
      component.get('router').transitionTo('content.questions.edit', questionId);
    }

  },


  /*
   * Move array object into array
   * */
  move(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

});
