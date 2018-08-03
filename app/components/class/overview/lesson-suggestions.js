import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend(AccordionMixin, {
  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  items: Ember.A(),
  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  classNames: [
    'gru-accordion',
    'lesson-suggestions',
    'gru-accordion-lesson',
    'expanded'
  ],
  classNameBindings: ['isExpanded:expanded', 'curComponentId'],
  tagName: 'li',

  curComponentId: Ember.computed(function() {
    return `l-${this.get('model.lessonId')}`;
  }),

  actions: {
    selectLesson: function(modelid) {
      this.updateAccordionById(modelid);
    },
    /**
     * Observe changes to 'parsedLocation' to update the accordion's status
     * (expanded/collapsed).
     */
    parsedLocationChanged: Ember.observer('parsedLocation.[]', function() {
      const parsedLocation = this.get('parsedLocation');
      if (parsedLocation) {
        let lessonId = parsedLocation[1];
        this.updateAccordionById(lessonId);
      }
    }),
    studyNow: function(item, itemtype) {
      let type =
        !itemtype &&
        (item.collectionType === 'assessment' ||
          item.collectionType === 'collection')
          ? 'collection'
          : 'lesson';
      //let itemid = item[`${type}Id`];
      item = Ember.Object.create(item);
      this.attrs.onStudyNow(type, this.model.lessonId, item);
    },
    /**
     * Observe changes when expands or collapse a lesson.
     */
    removedActiveLocation: Ember.observer('isExpanded', function() {
      this.set('activeElement', '');
    }),
    onOpenLessonLevelReport() {
      const component = this;
      const classId = component.get('currentClass.id');
      const unitId = component.get('unitId');
      const lessonId = component.get('model.id');
      const courseId =
        component.get('currentClass.courseId') ||
        component.get('currentCourse.id');
      component.set('classId', classId);
      component.set('unitId', unitId);
      component.set('lessonId', lessonId);
      component.set('courseId', courseId);
      component.set('showLessonReportPullUp', true);
    },
    studentReport: function(collection) {
      let component = this;
      let currentClass = component.get('class');
      let userId = component.get('session.userId');
      let classId = currentClass.get('id');
      let courseId = currentClass.get('courseId');
      let unitId = component.get('unit.unitId');
      let lessonId = component.get('model.lessonId');
      let collectionId = collection.get('id');
      let type = collection.get('format');
      let params = {
        userId: userId,
        classId: classId,
        courseId: courseId,
        unitId: unitId,
        lessonId: lessonId,
        collectionId: collectionId,
        type: type,
        isStudent: component.get('isStudent')
      };
      component.set('studentReportData', params);
      component.set('showReportPullUp', true);
    },
    onClosePullUp() {
      this.set('showLessonReportPullUp', false);
      this.set('showReportPullUp', false);
      this.set('showCollectionReportPullUp', false);
    }
  },
  didInsertElement() {
    this.setLessonItemForReport();
  },
  setLessonItemForReport() {
    const component = this;
    if (!component.get('class')) {
      return;
    }
    let collections = component.get('model.collections'); // This holds collection which gets set to items for perfromace control display
    collections = component.getCollection(
      collections,
      component.get('model').lessonId
    );
    var options = {
      userId: component.get('session.userId'),
      classId: component.get('class').id,
      courseId: component.get('course').id,
      unitId: component.get('unit').unitId,
      lessonId: component.get('model').lessonId
    };
    let loadDataPromise = component.loadStudentData(options, collections);

    loadDataPromise.then(() => {
      component.set('items', collections);
      component.set('loading', false);
      component.set('model.collections', collections);
    });
  },
  getCollection1(collections) {
    return collections.map(coln => {
      let retjson = {
        id: coln.collectionId,
        title: coln.tilte,
        collectionId: coln.collectionId,
        collectionTitle: coln.collectionTitle
      };
      return Ember.Object.create(retjson);
    });
  },

  getCollection(collections, lessonId) {
    return collections.map(coln => {
      let retjson = Ember.Object.create(coln);
      retjson.set('id', coln.collectionId);
      retjson.set('format', coln.collectionType);
      retjson.set('lessonId', lessonId);

      return retjson;
    });
  },

  loadStudentData(options, collections) {
    const component = this;
    let { userId, classId, courseId, unitId, lessonId } = options,
      perfSvc = component.get('performanceService');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.RSVP.hash({
        performanceAssessment: perfSvc.findStudentPerformanceByLesson(
          userId,
          classId,
          courseId,
          unitId,
          lessonId,
          collections,
          { collectionType: CONTENT_TYPES.ASSESSMENT }
        ),
        performanceCollection: perfSvc.findStudentPerformanceByLesson(
          userId,
          classId,
          courseId,
          unitId,
          lessonId,
          collections,
          { collectionType: CONTENT_TYPES.COLLECTION }
        )
      }).then(({ performanceAssessment, performanceCollection }) => {
        let assessments = performanceAssessment.filterBy('type', 'assessment');
        let collection = performanceCollection.filterBy('type', 'collection');
        let performance = assessments.concat(collection);
        const promises = collections.map(function(collection) {
          const collectionId = collection.get('id');
          const isAssessment = collection.get('format') === 'assessment';
          const isResource =
            collection.get('format') !== 'assessment' &&
            collection.get('format') !== 'assessment-external' &&
            collection.get('format') !== 'collection';
          collection.set('isResource', isResource);

          const collectionPerformanceData = performance.findBy(
            'id',
            collectionId
          );
          if (collectionPerformanceData) {
            const score = collectionPerformanceData.get('score');
            const timeSpent = collectionPerformanceData.get('timeSpent');
            const completionDone = collectionPerformanceData.get(
              'completionDone'
            );
            const completionTotal = collectionPerformanceData.get(
              'completionTotal'
            );

            const hasStarted = score > 0 || timeSpent > 0;
            const isCompleted =
              completionDone > 0 && completionDone >= completionTotal;

            collectionPerformanceData.set('timeSpent', timeSpent);
            collectionPerformanceData.set('hasStarted', hasStarted);
            collectionPerformanceData.set('isCompleted', isCompleted);
            collection.set('performance', collectionPerformanceData);

            const attempts = collectionPerformanceData.get('attempts');
            if (isAssessment) {
              return component
                .get('assessmentService')
                .readAssessment(collectionId)
                .then(function(assessment) {
                  const attemptsSettings = assessment.get('attempts');
                  if (attemptsSettings) {
                    const noMoreAttempts =
                      attempts &&
                      attemptsSettings > 0 &&
                      attempts >= attemptsSettings;
                    collectionPerformanceData.set(
                      'noMoreAttempts',
                      noMoreAttempts
                    );
                    collectionPerformanceData.set(
                      'isDisabled',
                      !assessment.get('classroom_play_enabled')
                    );
                  }
                });
            } else {
              return Ember.RSVP.resolve(true);
            }
          }
        });
        Ember.RSVP.all(promises).then(resolve, reject);
      });
    });
  }
});
