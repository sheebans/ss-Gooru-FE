import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-student-view'],

  actions:{
    /**
     * @function actions:selectQuestion
     * @param {Number} questionId
     */
    selectQuestion: function (questionId) {
      this.get('onSelectQuestion')(questionId);
    },
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @prop { Collection } assessment
   */
  assessment: null,

  /**
   * @prop { User[] } students - Students taking the assessment
   */
  students: null,

  /**
   * @prop { ReportData } reportData
   */
  reportData: null,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,

  /**
   * Returns a convenience structure to display the student view
   *
   *
   * Sample response
   * The "questionId#" corresponds to the actual question id
   *
   *  [
   *    {
   *      student: {User}
   *      reportData: {
   *        questionId1 : QuestionResult,
   *        questionId2 : QuestionResult,
   *        questionId3 : QuestionResult
   *      },
   *    },
   *    {
   *      student: {User}
   *      reportData: {
   *        questionId1 : QuestionResult,
   *        questionId2 : QuestionResult,
   *        questionId3 : QuestionResult
   *      },
   *    }
   *  ]
   *
   * @return [] students performance info
   */
  studentPerformanceList: Ember.computed("students.[]", "reportData.data", function(){
    const component = this;
    const students = component.get("students");
    const reportData = component.get("reportData.data");
    return students.map(function(student){
      let studentReportData = reportData[student.get("id")] || {};
      return Ember.Object.create({
        student: student,
        reportData: component.getReportDataResults(studentReportData)
      });
    });
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   *
   * Returns only the QuestionResult instances or an empty object when the student has no value for a question
   *
   * studentReportData param looks like
   *
   *    {
   *      questionId1 : QuestionResult,
   *      questionId2 : QuestionResult,
   *      questionId3 : QuestionResult
   *    }
   *
   * @param {Object} studentReportData
   * @returns {QuestionResult[]}
   */
  getReportDataResults: function(studentReportData){
    const component = this;
    const questions = component.get("assessment.resources");

    return questions.map(function(question){
      return studentReportData[question.get("id")];
    });
  }

});
