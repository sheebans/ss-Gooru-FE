import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'gru-accordion-course', 'course-suggestions'],
  actions: {
    routeAction: function(actiontype) {
      this.attrs.routeSuggestAction(actiontype);
    },
    selectUnit: function() {
      //ToDo: Add impl on player
    }
  }
});
