import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import LessonSerializer from 'gooru-web/serializers/content/lesson';
import LessonAdapter from 'gooru-web/adapters/content/lesson';

/**
 * Lesson Service
 *
 * Service responsible for retrieving all data related to the lesson model
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 *
 * @typedef {Object} LessonService
 * @augments Ember/Service
 */
export default Ember.Service.extend(StoreMixin, {

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', LessonSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', LessonAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UnitSerializer} serializer
   */
  serializer: null,

  /**
   * @property {UnitAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets a Lesson by ID that belongs to a course and unit.
   * @param courseId
   * @param unitId
   * @param options
   * @returns {Lesson}
   */
  findById: function(courseId, unitId, lessonId, options = {}) {
    options.queryType = 'byId';
    return this.get('store').queryRecord('lesson/lesson', {
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId,
      options: options
    });
  },

  /**
   * Gets all lessons by specific class, course and unit allowed for the current user
   * @param {string} classId class identifier
   * @param {string} courseId course identifier
   * @param {string} unitId course identifier
   * @param {Object} options request options, like pagination, sort, etc
   * @returns {Promise.<Lesson[]>} returns an array of lessons

   */
  findByClassAndCourseAndUnit: function(classId, courseId, unitId, options = {}) {
    return this.get('store').queryRecord('lesson/lesson', {
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      options: options
    });
  },

  /**
   * Create a unit for a course
   * @param {String} courseId - ID of the course the lesson belongs to
   * @param {Content/Unit} unitId - ID of the unit the lesson belongs to
   * @param {Content/Lesson} lesson - Lesson model
   * @returns {Promise|String} returns the lesson model with the newly assigned ID
   */
  createLesson: function (courseId, unitId, lesson) {
    var lessonData = this.get('serializer').serializeCreateLesson(lesson);

    return this.get('adapter').createLesson({
      courseId: courseId,
      unitId: unitId,
      lesson: lessonData
    }).then(function (lessonId) {
      lesson.set('id', lessonId);
      return lesson;
    }).catch(function (error) {
      return error;
    });
  },

  /**
   * Returns a lesson by id
   * @param {string} courseId - course the lesson belongs to
   * @param {string} unitId - unit the lesson belongs to
   * @param {string} lessonId - lesson ID to search for
   * @returns {Promise|Content/Unit}
   */
  fetchById: function (courseId, unitId, lessonId) {
    return this.get('adapter').getLessonById({
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function (unitData) {
        return this.get('serializer').normalizeLesson(unitData);
      }.bind(this))
      .catch(function (error) {
        return error;
      });
  }

});
