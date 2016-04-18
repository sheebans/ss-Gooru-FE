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
     *Action triggered when click the course title or image
     */
    selectCourse: function() {
      this.sendAction("onSelectCourse", this.get("course"));
    },
    /**
     *Action triggered when select remix the course
     */
    remixCourse:function(){
      this.sendAction("onRemixCourse");
    },
    /**
     *Action triggered when select edit the course
     */
    editCourse:function(){
      this.sendAction("onEditCourse", this.get("course"));
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Course} course
   */
  course: null,
  /**
   * @property {Boolean} course
   */
  isOwner:false,

  /**
   * Edit course action
   * @property {string}
   */
  onEditCourse: null,

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
