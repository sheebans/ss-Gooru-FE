import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'gru-accordion-course', 'course-suggestions'],
  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  actions: {
    routeAction: function(actiontype) {
      this.attrs.routeSuggestAction(actiontype);
    },
    /**
     * @function studyNow
     * @param {string} type - collection or assessment
     * @param {string} lessonId - lesson id
     * @param {string} unitId - lesson id
     * @param {string} item - collection, assessment, lesson or resource
     * @see components/class/overview/gru-accordion-lesson
     */
    studyNow: function(type, unitId, lessonId, item) {
      this.sendAction('onStudyNow', type, unitId, lessonId, item);
    },
    selectUnit: function() {
      //ToDo: Add impl on player
    }
  },

  performanceData() {
    /* // didReceiveAttrs() { const component = this; component.performanceData(); },
     Move function outside of perfomance data to enable the lesson level performance number
    and make suitable corrections  */
    const component = this;
    const userId = component.get('session.userId');
    var options = {};
    options.classId = component.get('class').id;
    options.courseId = component.get('course').id;
    options.units = this.get('model.route0Content.units');
    options.unitId = options.units[0].unitId;
    options.unitLessons = component.getLessons(options.units[0]);
    /* console.log('Options', options);
    console.log('lessons-B4', options.unitLessons); */
    component
      .get('performanceService')
      .findStudentPerformanceByUnit(
        userId,
        options.classId,
        options.courseId,
        options.unitId,
        options.unitLessons
      )
      .then(performance => {
        //st
        options.unitLessons.forEach(lesson => {
          if (performance) {
            let lessonPerformance;
            if (options.classId) {
              lessonPerformance = performance.findBy('id', lesson.get('id'));
            } else {
              lessonPerformance = performance.findBy(
                'lessonId',
                lesson.get('id')
              );
              if (lessonPerformance) {
                const score = lessonPerformance.get('scoreInPercentage');
                const timeSpent = lessonPerformance.get('timeSpent');
                const completionDone = lessonPerformance.get('completedCount');
                const completionTotal = lessonPerformance.get('totalCount');
                const hasStarted = score > 0 || timeSpent > 0;
                const isCompleted =
                  completionDone > 0 && completionDone >= completionTotal;
                lessonPerformance.set('hasStarted', hasStarted);
                lessonPerformance.set('isCompleted', isCompleted);
                lessonPerformance.set('completionDone', completionDone);
                lessonPerformance.set('completionTotal', completionTotal);
              }
            }
            lesson.set('performance', lessonPerformance);
          }
        });
        //end
        /* console.log('lessons-after', options.unitLessons); */
      });
  },
  getLessons(unit) {
    return unit.lessons.map(lesson => {
      let retjson = {
        id: lesson.lessonId,
        title: lesson.lessonTitle
      };
      return Ember.Object.create(retjson);
    });
  }
});
