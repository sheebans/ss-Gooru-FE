import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

/**
 * @typedef {Object} CollectionService
 */
export default Ember.Service.extend(StoreMixin, SessionMixin, {

  /**
   * Gets a specific collection|assessment by ID
   * @param {string} collectionId
   * @returns {Collection}
   */
  findById: function(collectionId) {
    return this.get('store').findRecord('collection/collection', collectionId, { reload: true });
  },

  /**
   * Gets all collections|assessments for an specific unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @returns {Collection[]}
   */
  findByClassAndCourseAndUnitAndLesson: function(classId, courseId, unitId, lessonId){
    return this.get('store').queryRecord('collection/collection',{
      classId : classId,
      courseId : courseId,
      unitId : unitId,
      lessonId : lessonId
    });
  }
});
