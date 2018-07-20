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
    studyNow: function(item) {
      let type =
        item.collectionType === 'assesment' ||
        item.collectionType === 'collection'
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
    })
  }
});
