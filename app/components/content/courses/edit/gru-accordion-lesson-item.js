import PlayerAccordionLessonItem from 'gooru-web/components/content/courses/play/gru-accordion-lesson-item';
import {CONTENT_TYPES} from 'gooru-web/config/config';
import ModalMixin from 'gooru-web/mixins/modal';
import Ember from 'ember';

/**
 * Course content viewer: Accordion Lesson Item
 *
 * Component responsible for presenting a collection/assessment within a lesson.
 * It is meant to be used inside of an {@link ./gru-accordion-unit|Accordion Lesson}
 *
 * @module
 * @augments Ember/Component
 */
export default PlayerAccordionLessonItem.extend(ModalMixin,{
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    edit: function(item) {
      var route = item.get('isCollection') ? "content.collections.edit" : "content.assessments.edit";
      this.get('router').transitionTo(route, item.get("id"));
    },
    /**
     * Delete selected unit
     *
     */
    deleteItem: function (builderItem) {
      let component = this;
      var model = null;
      if(builderItem.get('isCollection')){
        model= {
          content: this.get('model'),
          index:this.get('index'),
          parentName:this.get('courseTitle'),
          deleteMethod: function () {
            return this.get('collectionService').deleteCollection(this.get('model.id'));
          }.bind(this),
          type: CONTENT_TYPES.COLLECTION,
          callback:{
            success:function(){
              component.get('onDeleteLessonItem')(builderItem);
            }
          }
        };
      }else{
        model= {
          content: this.get('model'),
          index:this.get('index'),
          parentName:this.get('courseTitle'),
          deleteMethod: function () {
            return this.get('assessmentService').deleteAssessment(this.get('model.id'));
          }.bind(this),
          type: CONTENT_TYPES.ASSESSMENT,
          callback:{
            success:function(){
              component.get('onDeleteLessonItem')(builderItem);
            }
          }
        }
      }
      this.actions.showModal.call(this,
        'content.modals.gru-delete-content',
        model, null, null, null, false);
    }

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} courseId - ID of the course this unit belongs to
   */
  courseId: null

});
