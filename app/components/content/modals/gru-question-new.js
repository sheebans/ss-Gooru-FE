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
                component.triggerAction({ action: 'closeModal' });
                component.get('router').transitionTo('content.questions.edit', questionId);
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
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null,

  /**
   * @type {Array{}} questionTypes
   */
  questionTypes: Ember.computed(function(){
    let array = Ember.A(Object.keys(QUESTION_CONFIG)).without(QUESTION_TYPES.openEnded);
    this.move(array,6,2);
    this.move(array,7,3);
    this.move(array,7,6);
    return array;
  }),


  //Methods
  /*
   * Move array object into array
   * */
  move(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

});
