import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';
var isUpdatingLocation = false;

export default Ember.Component.extend(AccordionMixin, {
  classNames: ['gru-accordion', 'unit-suggestions', 'gru-accordion-unit'],
  classNameBindings: ['isExpanded:expanded', 'curComponentId'],

  curComponentId: Ember.computed(function() {
    return `u-${this.get('model.unitId')}`;
  }),
  /**
   * @prop {String[]} parsedLocation - Location the user has navigated to
   * parsedLocation[0] - unitId
   * parsedLocation[1] - lessonId
   * parsedLocation[2] - resourceId
   */
  parsedLocation: [],
  /**
   * @prop {String} userLocation - Location of a user in a course
   */
  userLocation: null,
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
    },
    /**
     * Load the data for this unit (data should only be loaded once) and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function(unitId) {
      if (!isUpdatingLocation) {
        let newLocation = this.get('isExpanded') ? '' : unitId;
        this.get('onLocationUpdate')(newLocation);
      } else if (!this.get('isExpanded')) {
        // /
      }
    },
    /**
     * @function actions:selectItem
     * @param {string} collection - collection or assessment
     * @see components/class/overview/gru-accordion-lesson
     */
    selectResource: function(lessonId, collection) {
      let unitId = this.get('model.id');
      this.get('onSelectResource')(unitId, lessonId, collection);
    },

    /**
     * Trigger the 'onLocationUpdate' event handler with the unit and lesson information
     *
     * @function actions:updateLesson
     */
    updateLesson: function(lessonId) {
      const newLocation = lessonId
        ? `${this.get('model.id')}+${lessonId}`
        : this.get('model.id');
      this.get('onLocationUpdate')(newLocation);
    }
  },

  /**
   * Observe changes to 'parsedLocation' to update the accordion's status
   * (expanded/collapsed).
   */
  parsedLocationChanged: Ember.observer('parsedLocation.[]', function() {
    const parsedLocation = this.get('parsedLocation');

    if (parsedLocation.length) {
      isUpdatingLocation = true;

      let unitId = parsedLocation[0];
      this.updateAccordionById(unitId);

      isUpdatingLocation = false;
    }
  }),

  selectResource: function(lessonId, collection) {
    let unitId = this.get('model.id');
    this.get('onSelectResource')(unitId, lessonId, collection);
  },
  // -------------------------------------------------------------------------
  // Events
  setupComponent: Ember.on('didInsertElement', function() {
    const component = this;
    this.$().on('hide.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', false);
    });

    this.$().on('show.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', true);
    });

    Ember.run.scheduleOnce('afterRender', this, this.parsedLocationChanged);
  })
});
