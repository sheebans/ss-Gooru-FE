/**
 * Course card
 *
 * Component responsible of showing the course information in cards, so that most useful information is summarized there.
 * @module
 * @see controllers/profile/about.js
 */

import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-course-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     *Action triggered when select edit the course
     */
    editCourse:function(){
      this.sendAction("onEditCourse", this.get("course"));
    },

    /**
     *Action triggered when select remix the course
     */
    remixCourse:function(){
      this.sendAction("onRemixCourse", this.get("course"));
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Course} course
   */
  course: null,

  /**
   * Edit course action
   * @property {string}
   */
  onEditCourse: null,

  /**
   * Remix course action
   * @property {string}
   */
  onRemixCourse: null,

  /**
   * flag that tells if you are owner of card or not.
   * @property {Boolean}
   */
  isOwner : false,
  /**
   * Edit enabled is a flag for whether the edit button is enabled or not.
   * @property {Boolean}
   */
  isEditEnabled: false,
  /**
   * Edit enabled is a flag for whether the remix button is enabled or not.
   * @property {Boolean} course
   */
  isRemixEnabled:false,
  /**
   * Edit enabled is a flag for whether the preview button is enabled or not.
   * @property {Boolean} course
   */
  isPreviewEnabled:false,

  /**
   * @property {Array} users
   */
  users:Ember.computed('course', function() {
    return this.get("course.remixedBy");
  }),
  /**
   * @property {String} subjects
   */
  subjects:Ember.computed('course', function() {
    // TODO Verify if this method is required
    /*
    var subjectsList = this.get("course.subjects");
    var subjects = "";
    subjectsList.forEach(function(object){
      subjects+=" "+object+" |";
    });
    return subjects.substr(0, subjects.length-1);
    */
    return "";
  })



});
