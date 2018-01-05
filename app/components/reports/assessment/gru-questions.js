import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Component.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Selects Performance Option or not
     * @function actions:selectPerformanceOption
     */
    selectPerformanceOption: function(showPerformance) {
      if (this.get('isTeacher') || !this.get('isAnswerKeyHidden')) {
        this.set('showPerformance', showPerformance);
      }
    },

    /**
     * View Open Ended report
     * @param questionId {String}
     */
    viewOEReport: function(questionId) {
      this.sendAction('onViewOEReport', questionId);
    },

    /**
     * Action get triggered when change score button  clicked
     */
    onChangeScore: function() {
      this.get('listOfQuestions').clear();
      this.set('isChangeScoreEnabled', true);
    },

    /**
     * Action get triggered when change score confirm button clicked
     */
    onChangeScoreConfirm: function() {
      let questionScoreUpdateData = this.get('listOfQuestions');
      if (questionScoreUpdateData.length > 0) {
        this.sendAction('onUpdateQuestionScore', questionScoreUpdateData);
      } else {
        this.set('isChangeScoreEnabled', false);
      }
    },

    /**
     * Action get triggered when change score was cancelled
     */
    onChangeScoreNotConfirm: function() {
      this.get('listOfQuestions').clear();
      this.set('isChangeScoreEnabled', false);
    },

    /**
     * It will maintain the list of questions  which need to be update the score.
     * @param  {Boolean} status
     * @param  {Object} item   Question Ember object
     */
    changeQuestionScore: function(status, item) {
      let listOfQuestions = this.get('listOfQuestions');
      let question = listOfQuestions.findBy('resource_id', item.resourceId);
      if (question) {
        question.set(
          'resource_attempt_status',
          status ? 'correct' : 'incorrect'
        );
      } else {
        question = Ember.Object.create({
          resource_id: item.resourceId,
          resource_attempt_status: status ? 'correct' : 'incorrect'
        });
        listOfQuestions.pushObject(question);
      }
    }
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:session
   */
  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-questions'],

  classNameBindings: [
    'isAnswerKeyHidden:key-hidden',
    'showPerformance:performance-view'
  ],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} isAnswerKeyHidden - Should the answer key be hidden?
   */
  isAnswerKeyHidden: false,

  /**
   * List of questions to be displayed by the component
   *
   * @constant {Array}
   */
  results: null,

  /**
   * Indicate if the table show the performance columns
   *
   * @property {Boolean}
   */
  showPerformance: true,

  /**
   * Indicates if the reaction bar is visible
   * @property {boolean}
   */
  showReactionBar: true,

  /**
   * Indicates if the view is open ended
   * @property {boolean}
   */
  isOpenEnded: Ember.computed('viewMode', function() {
    return this.get('viewMode') === 'open-ended';
  }),

  /**
   * Indicates change score button got enabled.
   * @property {boolean}
   */
  isChangeScoreEnabled: false,

  /**
   * Update question score list
   * @return {Array} list of question scores need to be update.
   */
  listOfQuestions: Ember.A()
});
