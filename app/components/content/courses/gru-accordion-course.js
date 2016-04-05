import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import BuilderMixin from 'gooru-web/mixins/content/builder';
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
export default Ember.Component.extend(BuilderMixin, {


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion-course', 'gru-accordion'],


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
    },

    closeAllUnits: function () {
      this.get('items').forEach(function (builderItem) {
        builderItem.set('isExpanded', false);
      });
    }

  }


  // -------------------------------------------------------------------------
  // Properties


});
