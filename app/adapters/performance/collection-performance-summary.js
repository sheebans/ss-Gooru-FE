import Ember from "ember";

/**
 * Adapter CollectionPerformanceSummary
 *
 * @typedef {Object} CollectionPerformanceSummaryAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: "/api/nucleus-insights/v2",

  /**
   * Searches student collection performance by course, unit, lesson and type
   * Criteria values are not required except for courseId
   *
   * @param {string} studentId
   * @param {{ courseId: number, unitId: string, lessonId: string, collectionType: string }} criteria
   * @returns {Promise}
   */
  searchStudentCollectionPerformanceSummary: function (studentId, criteria) {
    const namespace = this.get("namespace");
    const collectionType = criteria.collectionType || "assessment";
    const url = `${namespace}/study/${collectionType}/performance`;
    const options = {
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: this.defineHeaders(),
      data: {
        "courseId" : criteria.courseId,
        "lessonId" : criteria.lessonId,
        "unitId" : criteria.unitId,
        "userId" : studentId
      }
    };
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
        }, reject);
    });
  },

  defineHeaders: function () {
    return {
      "Authorization": "Token " + this.get("session.token-api3")
    };
  }

});
