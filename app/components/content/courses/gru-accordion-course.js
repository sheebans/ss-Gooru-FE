import Ember from 'ember';
import Unit from 'gooru-web/models/content/unit';

/**
 * Content Builder: Accordion Course
 *
 * Component responsible for listing a set of units
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend({


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion-course', 'gru-accordion'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

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
   * @prop {Ember.RSVP.Promise | Content/Unit[]} items
   */
  items: null,

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
  })

});
