import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'gru-accordion-course', 'course-suggestions'],
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
  }
});
