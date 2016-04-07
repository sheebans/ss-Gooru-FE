import Ember from 'ember';
import Question from 'gooru-web/models/content/question';

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
  questionTypes: Ember.A([{
    type:"MC",
    icon:""},{
    type:"MA",
    icon:""}, {
    type:"OL",
    icon:""},{
    type:"HT_HL",
    icon:""},{
    type:"T/F",
    icon:""},{
    type:"FIB",
    icon:""},{
    type:"HS_IMG",
    icon:""},{
    type:"HS_TXT",
    icon:""}])

});
