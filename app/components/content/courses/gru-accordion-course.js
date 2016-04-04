import Ember from 'ember';
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

  }


  // -------------------------------------------------------------------------
  // Properties


});
