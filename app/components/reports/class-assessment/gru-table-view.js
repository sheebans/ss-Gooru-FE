import Ember from 'ember';
import {
  alphabeticalStringSort,
  formatTimeInSeconds,
  getAnswerResultIcon,
  getReactionIcon
  } from 'gooru-web/utils/utils';

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
     * @param {Number} questionId
     */
    selectQuestion: function (questionId) {
      this.get('onSelectQuestion')(questionId);
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

    this.set('questionProperties', this.initQuestionProperties());
    this.set('studentsHeader', this.initStudentsHeader());
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Collection } assessment
   */
  assessment: null,

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
   * @prop { String[] } assessmentQuestionsIds - An array with the ids of all the questions in the assessment
   */
  assessmentQuestionsIds: Ember.computed('assessmentQuestions.[]', function () {
    return this.get('assessmentQuestions').map(function (question) {
      return question.value;
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
   * - renderFunction: function to process values of this property for output
   * - sortFunction: sort function for values of this property
   */
  questionProperties: null,

  /**
   * @prop { String[] } questionPropertiesIds - An array with the ids of all the question properties
   */
  questionPropertiesIds: Ember.computed('questionProperties', function () {
    return this.get('questionProperties').map(function (questionProperty) {
      return questionProperty.value;
    });
  }),

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
  studentsHeader: null,

  /**
   * @prop { String[] } studentsIds - An array with the ids of all the students taking the assessment
   */
  studentsIds: Ember.computed('students.[]', function () {
    return this.get('students').map(function (student) {
      return student.id;
    });
  }),

  /**
   * @prop { Object[] } tableData - Ordered data to use as content for the table component
   * It merges the existing table frame with any updated table data.
   *
   * Each object in the array will consist of:
   * - id: row id
   * - header: row header
   * - content: an array of objects making up the row content where each object is made up of:
   *   - value: table cell un-formatted content
   *   - output: table cell content formatted for output (the formatting is done by
   *             the question property's render function)
   */
  tableData: Ember.computed('tableFrame', 'rawData', function () {
    const studentsIds = this.get('studentsIds');
    const studentsIdsLen = studentsIds.length;
    const questionsIds = this.get('assessmentQuestionsIds');
    const questionsIdsLen = questionsIds.length;
    const questionProperties = this.get('questionProperties');
    const questionPropertiesIds = this.get('questionPropertiesIds');
    const questionPropertiesIdsLen = questionPropertiesIds.length;
    const rawData = this.get('rawData');

    // Copy the table frame contents
    var data = this.get('tableFrame').slice(0);
    var totalIndex, totals;

    // Get the value of each question property, for each question, for each student
    for (let i = 0; i < studentsIdsLen; i++) {

      // Array for adding up totals
      totals = [];
      for (let k = 0; k < questionPropertiesIdsLen; k++) {
        // Initialize all values in the array to 0
        totals[k] = 0;
      }

      for (let j = 0; j < questionsIdsLen; j++) {
        if (questionsIds[j] === -1) {
          // Save this position to fill it in last (cells with totals)
          totalIndex = j;
          continue;
        }
        for (let k = 0; k < questionPropertiesIdsLen; k++) {
          let renderFunction = questionProperties[k].renderFunction;
          let value = rawData[studentsIds[i]][questionsIds[j]][questionPropertiesIds[k]];

          data[i].content[j * questionPropertiesIdsLen + k] = {
            value: value,
            output: (!renderFunction) ? value : renderFunction(value)
          };
          totals[k] += (value) ? value : 0;
        }
      }

      // Compute the totals
      for (let k = 0; k < questionPropertiesIdsLen; k++) {
        data[i].content[totalIndex * questionPropertiesIdsLen + k] = {
          value: totals[k],
          output: totals[k]
        };
      }
    }

    return data;
  }),

  /**
   * @prop {Object[]} tableFrame - The table frame that encloses the table data
   * @return {Object[]}
   */
  tableFrame: Ember.computed('students.[]', function () {
    return this.get('students').map(function (student) {
      return {
        id: student.id,
        header: student.fullName,
        content: []
      };
    });
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Initialize the question properties array with values -including i18n labels
   * @return {Object[]}
   */
  initQuestionProperties: function () {
    return [
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.scores').string,
          disabled: true
        },
        label: this.get('i18n').t('reports.gru-table-view.score').string,
        value: 'correct',
        visible: true,
        renderFunction: getAnswerResultIcon
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.study-time').string
        },
        label: this.get('i18n').t('reports.gru-table-view.study-time').string,
        value: 'timeSpent',
        renderFunction: formatTimeInSeconds
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.reactions').string
        },
        label: this.get('i18n').t('reports.gru-table-view.reaction').string,
        value: 'reaction',
        renderFunction: getReactionIcon
      })
    ];
  },

  /**
   * Initialize the students header object with values including an i18n label
   * @return {Object[]}
   */
  initStudentsHeader: function () {
    return {
      label: this.get('i18n').t('reports.gru-table-view.name').string,
      value: 'fullName',
      sortFunction: alphabeticalStringSort
    };
  }

});
