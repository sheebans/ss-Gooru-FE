import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-student-view'],


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
   * @prop { Object{}{}{} } reportData - Representation of the data to show in the reports as a 3D matrix
   * Any changes on the content feed will cause the report data to update
   *
   * @see gooru-web/components/reports/class-assessment/gru-class-assessment-report.js
   *
   * Sample structure
   *
   * The "questionId#" corresponds to the actual question id
   *  {
   *    user1 {
   *      questionId1 : QuestionResult,
   *      questionId2 : QuestionResult,
   *      questionId3 : QuestionResult
   *     },
   *    user2 {
   *      questionId1 : QuestionResult,
   *      questionId2 : QuestionResult,
   *      questionId3 : QuestionResult
   *    }
   *  }
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
  studentPerformanceList: Ember.computed("students.[]", "reportData.[]", function(){
    const component = this;
    const students = component.get("students");
    const reportData = component.get("reportData");
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
