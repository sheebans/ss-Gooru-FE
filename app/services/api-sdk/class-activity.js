import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import Assessment from 'gooru-web/models/content/assessment';
import ClassActivity from 'gooru-web/models/content/class-activity';

/**
 * @typedef {Object} ClassActivityService
 */
export default Ember.Service.extend({

  /**
   * Find class activities
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
