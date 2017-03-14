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


  /**
   * Finds collection performance summary for the ids provided
   * @param {string} userId user id
   * @param {string[]} collectionIds
   * @param {string} collectionType collection|assessment
   * @param {string} classId optional class id filter
   * @param {string} timePeriod optional time period filter
   * @returns {Ember.RSVP.Promise}
     */
  findCollectionPerformanceSummaryByIds: function (userId, collectionIds, collectionType, classId = undefined, timePeriod = undefined) {
    const namespace = this.get("namespace");
    const url = `${namespace}/${collectionType}/performance`;
    const options = {
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: this.defineHeaders(),
      data: JSON.stringify({
        userId: userId,
        classId: classId,
        timePeriod: timePeriod,
        collectionIds: collectionIds
      })
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
