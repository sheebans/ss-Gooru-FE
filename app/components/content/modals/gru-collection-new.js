import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import Lesson from 'gooru-web/models/content/lesson';
import Unit from 'gooru-web/models/content/unit';
import Course from 'gooru-web/models/content/course';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {ClassService} Class service API SDK
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @property {CourseService} Course service API SDK
   */
  courseService: Ember.inject.service("api-sdk/course"),

  /**
   * @property {UnitService} Unit service API SDK
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  /**
   * @property {LessonService} Lesson service API SDK
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @property {CollectionService} Collection service API SDK
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-collection-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


    actions: {

      create: function () {
        const component = this;
        component.get('validate').call(component).then(function ({ model, validations }) {
          if (validations.get('isValid')) {
            if (component.get('model')) {
              const course = this.get('course');
              const unit = this.get('unit');
              const lesson = this.get('lesson');
              let classId = component.get('model').id;
              let courseId;
              let unitId;
              let lessonId;
              let assessmentOrCollectionId;

              component.get('courseService').createCourse(course)
                .then(
                  function(newCourse) {
                    courseId = newCourse.get('id');
                    return component.get('classService')
                      .associateCourseToClass(courseId, classId);
                  })
                .then(
                  function(){
                    return component.get('unitService')
                      .createUnit(courseId, unit);
                  })
                .then(
                  function(newUnit) {
                    unitId = newUnit.get('id');
                    return component.get('lessonService')
                      .createLesson(courseId, unitId, lesson);
                  })
                .then(
                  function(newLesson) {
                    lessonId = newLesson.get('id');
                    return component.get('createAssessmentOrCollection').call(component);
                  })
                .then(
                  function(newAssessmentOrCollection){
                    assessmentOrCollectionId = newAssessmentOrCollection.get('id');
                    return component.get('lessonService')
                      .associateAssessmentOrCollectionToLesson(courseId, unitId, lessonId, assessmentOrCollectionId, true);
                  })
                .then(
                  function(){
                    component.get('closeModal').call(component, assessmentOrCollectionId);
                  },
                  component.get('showErrorMessage').bind(component)
                );
            } else {
              component.get('createAssessmentOrCollection').call(component)
                .then(
                  function (newAssessmentOrCollection) {
                    component.get('closeModal').call(component, newAssessmentOrCollection.get('id'));
                  },
                  component.get('showErrorMessage')
                );
            }
          }
          this.set('didValidate', true);
        }.bind(this));
      }

    },

  validate: function(){
    const collection = this.get('collection');
    return collection.validate();
  },

  createAssessmentOrCollection: function() {
    return this.get('collectionService').createCollection(this.get('collection'));
  },

  closeModal: function(collectionId) {
    this.triggerAction({ action: 'closeModal' });
    this.get('router').transitionTo('content.collections.edit', { collectionId });
  },

  showErrorMessage: function(){
    const message = this.get('i18n').t('common.errors.collection-not-created').string;
    this.get('notifications').error(message);
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    if (this.get('model')) {
      let className = this.get('model').title;
      let courseName = `${className} - Course 1`;
      let unitName = `${courseName} - Unit 1`;
      let lessonName = `${unitName} - Lesson 1`;
      var course = Course.create(Ember.getOwner(this).ownerInjection(), {title: courseName});
      this.set('course', course);
      var unit = Unit.create(Ember.getOwner(this).ownerInjection(), {title: unitName});
      this.set('unit', unit);
      var lesson = Lesson.create(Ember.getOwner(this).ownerInjection(), {title: lessonName});
      this.set('lesson', lesson);
    }
    var collection = Collection.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('collection', collection);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Collection} collection
   */
  collection: null,

  /**
   * @type {Lesson} lesson
   */
  lesson: null,

  /**
   * @type {Unit} unit
   */
  unit: null,

  /**
   * @type {Course} course
   */
  course: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
