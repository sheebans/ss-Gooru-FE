import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'unit-suggestions', 'gru-accordion-unit']
});
