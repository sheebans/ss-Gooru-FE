import Ember from 'ember';
import Assessment from 'gooru-web/models/content/assessment';
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
   * @property {AssessmentService} Assessment service API SDK
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

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

  classNames: ['content', 'modals', 'gru-assessment-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    createAssessment: function () {
      const component = this;
      const assessment = this.get('assessment');
      assessment.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          if (component.get('model')) {
            const course = this.get('course');
            const unit = this.get('unit');
            const lesson = this.get('lesson');
            let classId = component.get('model').id;
            let courseId;
            let unitId;
            let lessonId;
            let assessmentId;

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
                function(newLesson){
                  lessonId = newLesson.get('id');
                  return component.get('assessmentService')
                    .createAssessment(assessment);
                })
              .then(
                function(newAssessment){
                  assessmentId = newAssessment.get('id');
                  return component.get('lessonService')
                    .associateAssessmentOrCollectionToLesson(courseId, unitId, lessonId, assessmentId, true);
                })
              .then(function() {
                  component.triggerAction({action: 'closeModal'});
                  component.get('router')
                    .transitionTo('content.assessments.edit', { assessmentId });
                },
                function() {
                  const message = component.get('i18n').t('common.errors.assessment-not-created').string;
                  component.get('notifications').error(message);
                });
          } else {
            component.get('assessmentService')
              .createAssessment(assessment)
              .then(function (newAssessment) {
                  component.triggerAction({action: 'closeModal'});
                  component.get('router').transitionTo('content.assessments.edit', {assessmentId: newAssessment.get('id')});
                },
                function () {
                  const message = component.get('i18n').t('common.errors.assessment-not-created').string;
                  component.get('notifications').error(message);
                }
              );
          }
        }
        this.set('didValidate', true);
      }.bind(this));
    }

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
    var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('assessment', assessment);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Assessment} assessment
   */
  assessment: null,

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

