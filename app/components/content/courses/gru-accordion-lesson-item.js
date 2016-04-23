import Ember from 'ember';

/**
 * Content Builder: Accordion Lesson Item
 *
 * Component responsible for presenting a collection/assessment within a lesson.
 * It is meant to be used inside of an {@link ./gru-accordion-unit|Accordion Lesson}
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion-lesson-item', 'view'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    edit: function(item) {
      var route = item.get('isCollection') ? "content.collections.edit" : "content.assessments.edit";
      this.get('router').transitionTo(route, item.get("id"));
    }

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Content/Lesson} lesson
   */
  model: null

});
