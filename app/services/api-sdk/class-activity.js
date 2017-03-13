import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import Assessment from 'gooru-web/models/content/assessment';
import ClassActivity from 'gooru-web/models/content/class-activity';
import ClassActivityAdapter from 'gooru-web/adapters/content/class-activity';

/**
 * @typedef {Object} ClassActivityService
 */
export default Ember.Service.extend({


  /**
   * @property {ClassActivityAdapter} classActivityAdapter
   */
  classActivityAdapter: null,

  init: function () {
    this._super(...arguments);
    //this.set('collectionSerializer', CollectionSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('classActivityAdapter', ClassActivityAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Adds a new content to class
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {string} contentType
   * @param { { courseId: string, unitId: string, lessonId: string } } context
   * @returns {boolean}
   */
  addContentToClass: function (classId, contentId, contentType, context = {}) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').addContentToClass(classId, contentId, contentType, context).then(function() {
        resolve(true);
      }, reject);
    });
  },


  /**
   * Enables the class content
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {Date} activationDate
   * @returns {boolean}
   */
  enableClassContent: function (classId, contentId, activationDate = new Date()) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').enableClassContent(classId, contentId, activationDate).then(function() {
        resolve(true);
      }, reject);
    });
  },

    /**
   * Find class activities for teacher or student
   * @param {string} classId class id
   * @param {string} userId user id
   * @returns {string[]}
   */
  findClassActivities: function(classId, userId) {
    Ember.Logger.info (classId);
    Ember.Logger.info (userId);

    //TODO
    var response = [
      ClassActivity.create({
        id: '1',
        date: new Date(),
        collection: Collection.create(Ember.getOwner(this).ownerInjection(), {
          id: '1-1',
          format: "collection",
          openEndedQuestionCount: 0,
          questionCount: 1,
          resourceCount: 2,
          title: "Diagnostic Reflection & Assessment Tracker",
          members: [],
          visible: false,
          isOnAir: true,
          performance: Ember.Object.create({
            score : 10,
            completionDone: 44,
            completionTotal: 50,
            timeSpent: 5400000,
            isCompleted: true
          })
        })
      }),
      ClassActivity.create({
        id: '2',
        date: new Date(),
        collection: Collection.create(Ember.getOwner(this).ownerInjection(), {
          id: '2-1',
          format: "collection",
          openEndedQuestionCount: 0,
          questionCount: 3,
          resourceCount: 6,
          title: "U1 Note-Taking 1 - Teacher Notes",
          members: [],
          visible: true,
          isOnAir: false,
          performance: Ember.Object.create({
            score : 80,
            completionDone: 44,
            completionTotal: 50,
            timeSpent: 5400000,
            isCompleted: true
          })
        })
      }),
      ClassActivity.create({
        id: '3',
        date: new Date(),
        collection: Assessment.create(Ember.getOwner(this).ownerInjection(), {
          id: '3-1',
          format: "assessment",
          openEndedQuestionCount: 0,
          questionCount: 4,
          resourceCount: 0,
          title: "The Early Earth",
          members: [],
          visible: true,
          isOnAir: true,
          performance: Ember.Object.create({
            score : 100,
            completionDone: 44,
            completionTotal: 50,
            timeSpent: 5400000,
            isCompleted: true
          })
        })
      })
    ];
    return new Ember.RSVP.resolve(response);
  }
});
