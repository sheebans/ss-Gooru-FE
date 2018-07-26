import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'unit-suggestions', 'gru-accordion-unit'],

  actions: {
    /**
     * @function studyNow
     * @param {string} type - lesson or collection
     * @param {string} lesson - lesson id
     * @param {string} item - collection, assessment, lesson or resource
     * @see components/class/overview/gru-accordion-lesson
     */
    studyNow: function(type, lesson, item) {
      let unitId = this.get('model.unitId');
      this.get('onStudyNow')(type, unitId, lesson, item);
    }
  }
});
