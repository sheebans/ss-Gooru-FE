import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'lesson-suggestions', 'gru-accordion-lesson']
});
