import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
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
        (item.collectionType === 'assesment' ||
          item.collectionType === 'collection')
          ? item.collectionType
          : 'lesson';
      let itemid = item[`${type}Id`];
      item = Ember.Object.create(item);
      this.attrs.onStudyNow(type, itemid, this.model.lessonId, item);
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
      let currentClass = component.get('currentClass');
      let userId = component.get('session.userId');
      let classId = currentClass.get('id');
      let courseId = currentClass.get('courseId');
      let unitId = component.get('unitId');
      let lessonId = component.get('model.id');
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
    }
  }
});
