import Ember from 'ember';
import AccordionMixin from 'gooru-web/mixins/gru-accordion';
import Unit from 'gooru-web/models/content/unit';

/**
 * Content Builder: Accordion Course
 *
 * Component responsible for behaving as an accordion and listing a set of units
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-course'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function (unitId, lessonId, collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectResource', unitId, lessonId, collectionId);
    },

    addUnit: function () {
      var unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
        isEditing: true,
        title: null
      });
      this.get('items').pushObject(unit);
    },

    cancelAddUnit: function (unit) {
      this.get('items').removeObject(unit);
      unit.destroy();
    },

    removeUnit: function () {
      Ember.Logger.log('Unit should be removed');
    }

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} savedItems - List of all items with a truthy 'id' value?
   */
  savedItems: Ember.computed('items.@each.id', function () {
    var items = this.get('items');
    return items.filterBy('id');
  }),

  /**
   * @property {Boolean} isEditingUnit - Is a unit being edited or not?
   * New units (i.e. not yet saved) are also considered as being edited.
   */
  isEditingItem: Ember.computed('items.@each.isEditing', function () {
    var items = this.get('items');
    return items.filterBy('isEditing', true).length;
  }),

  /**
   * @property {Boolean} isAddingUnit - Is a new unit being added or not?
   */
  isAddingItem: Ember.computed('items.[]', 'savedItems.[]', function () {
    return this.get('items.length') > this.get('savedItems.length');
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * TODO: Get all the units for the course
   *
   * @function
   * @requires api-sdk/unit#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getUnits: function () {
    const courseId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(courseId);
  }


});
