import Ember from 'ember';
import Question from 'gooru-web/models/content/question';
import {QUESTION_CONFIG} from 'gooru-web/config/question';
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-question-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    createQuestion: function () {
      const question = this.get('question');
      question.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          Ember.logger("Question Valid");
        }
        this.set('didValidate', true);
      }.bind(this));
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
    var question = Question.create(Ember.getOwner(this).ownerInjection(), {title: null,type:"MC"});
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
    let array = Ember.A(Object.keys(QUESTION_CONFIG)).without('OE');
    this.move(array,6,2);
    this.move(array,7,3);
    this.move(array,7,6);
    const $component = this;
    let arrayTypes=array.map(function(item){
      return $component.normalizeQuestionTypes(item);
    });
    return arrayTypes;
  }),


  //Methods
  /*
  * Replace / to _
  * */
  normalizeQuestionTypes: function(questionType) {
    return questionType.replace('/', '_');
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
