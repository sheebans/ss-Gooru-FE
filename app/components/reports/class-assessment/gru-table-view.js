import Ember from 'ember';

// Private variables
var studentIds;

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-table-view'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:selectQuestion
     * @param {string} questionId
     */
    selectQuestion: function (questionId) {
      Ember.Logger.debug('Question with ID: ' + questionId + ' was selected');
    },

    /**
     * @function actions:selectQuestionProperty
     * @param {string} firstTierHeaderId
     * @param {string} secondTierHeaderId
     */
    selectQuestionProperty: function (firstTierHeaderId, secondTierHeaderId) {
      Ember.Logger.debug('Question property:' + secondTierHeaderId + ' for question: ' + firstTierHeaderId + ' was selected');
    },

    /**
     * @function actions:selectStudent
     * @param {string} studentId
     */
    selectStudent: function (studentId) {
      Ember.Logger.debug('Student with ID: ' + studentId + ' was selected');
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);

    studentIds = this.get('students').map(function (student) {
      return student.id;
    });

    this.set('tableData', this.initTableData());
  },

  didInsertElement: function () {
    this.$('.filters input[type=checkbox]').on('click', this.updatePropertyVisibility.bind(this));
  },

  willDestroyElement: function () {
    this.$('.filters input[type=checkbox]').off('click');
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Collection } assessment
   */
  assessment: null,

  /**
   * @prop { Object{}{}{} } rawData - Unordered 3D matrix of data to use as content for the table component
   */
  rawData: null,

  /**
   * @prop { User[] } students - Students taking the assessment
   */
  students: null,

  /**
   * @prop { String? } studentsHeader - Header for the students names
   */
  studentsHeader: {
    label: 'Name',
    value: 'fullName'
  },

  /**
   * @prop { Object[] } tableData - Ordered data to use as content for the table component
   *
   * Each object in the array will consist of:
   * - id: row id
   * - header: row header
   * - content: an array of values making up the row content
   */
  tableData: null,

  /**
   * @prop { Object[] } assessmentQuestions - An array made up of all the questions in the assessment
   *
   * Each question object will consist of:
   * - label: visual representation of the header
   * - order: order of the header with respect to the others
   * - value: internal header identifier
   *
   * The questions will be ordered in the array in ascending order per the order value
   */
  assessmentQuestions: Ember.computed('assessment.resources.[]', function () {
    const labelPrefix = this.get('i18n').t('reports.gru-table-view.first-tier-header-prefix').string;

    var questions = this.get('assessment.resources').map(function (question) {
      return {
        value: question.id,
        order: question.order,
        label: labelPrefix + question.order
      };
    });
    // Add column used for showing totals
    questions.push({
      value: -1,
      order: -1,
      label: this.get('i18n').t('reports.gru-table-view.totals').string
    });
    return questions.sort(function (a, b) {
      return a.order - b.order;
    });
  }),

  /**
   * @prop { Object[] } questionProperties - An array made up of question properties
   *
   * Each property object will consist of:
   * - filter: information to use for the corresponding filter checkbox
   * - label: visual representation of the header
   * - value: internal header identifier
   * - visible: should the property be visible or not?
   */
  questionProperties: [
    Ember.Object.create({
      filter: {
        label: 'Scores',
        disabled: true
      },
      label: 'Score',
      value: 'correct',
      visible: true
    }),
    Ember.Object.create({
      filter: {
        label: 'Study Time'
      },
      label: 'Time Spent',
      value: 'time'
    }),
    Ember.Object.create({
      filter: {
        label: 'Reactions'
      },
      label: 'Reaction',
      value: 'reaction'
    })
  ],


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Update the visibility of a property in the questionProperties model
   * @return {undefined}
   */
  updatePropertyVisibility: function (e) {
    var $elem = $(e.target);
    var index = $elem.data('idx');
    var questionProperty = this.get('questionProperties')[index];

    if ($elem.prop('checked')) {
      questionProperty.set('visible', true);
    } else {
      questionProperty.set('visible', false);
    }
  },

  /**
   * Initialize the table data
   * @return {Object[]}
   */
  initTableData: function () {
    var totalQuestions = this.get('assessmentQuestions').length;
    var totalProperties = this.get('questionProperties').length;
    var totalRowValues = totalQuestions * totalProperties;
    var fillerValues = [];
    var data = this.get('students').map(function (student) {
      return {
        id: student.id,
        header: student.fullName
      };
    });

    for (; totalRowValues > 0; totalRowValues--) {
      // Push a null value into the array
      fillerValues.push(null);
    }

    data.forEach(function (rowObject) {
      // Create a copy of the array so arrays are independent of each other
      rowObject.content = fillerValues.slice(0);
    });

    return data;
  }

});
