import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Unit from 'gooru-web/models/content/unit';
import PlayerAccordionCourse from 'gooru-web/components/content/courses/play/gru-accordion-course';

/**
 * Content Builder: Accordion Course
 *
 * Component responsible for listing a set of units
 *
 * @module
 * @augments /components/content/courses/play/gru-accordion-course
 *
 */
export default PlayerAccordionCourse.extend({


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    addUnit: function () {
      var unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
        title: null
      });
      var builderItem = BuilderItem.create({
        isEditing: true,
        data: unit
      });
      // Close all units before presenting the form for the new unit
      this.actions.closeAllUnits.apply(this);
      this.get('items').pushObject(builderItem);
    },

    cancelAddUnit: function (builderItem) {
      this.get('items').removeObject(builderItem);
      builderItem.destroy();
    },

    removeUnit: function () {
      Ember.Logger.log('Unit should be removed');
    }

  }

});
