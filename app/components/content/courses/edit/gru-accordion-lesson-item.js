import PlayerAccordionLessonItem from 'gooru-web/components/content/courses/play/gru-accordion-lesson-item';

/**
 * Course content viewer: Accordion Lesson Item
 *
 * Component responsible for presenting a collection/assessment within a lesson.
 * It is meant to be used inside of an {@link ./gru-accordion-unit|Accordion Lesson}
 *
 * @module
 * @augments Ember/Component
 */
export default PlayerAccordionLessonItem.extend({


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
   * @prop {String} courseId - ID of the course this unit belongs to
   */
  courseId: null

});
