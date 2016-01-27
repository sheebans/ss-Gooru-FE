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

  classNames:['gru-course-card'],

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
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Course} course
   */
  course: null,

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
    var subjectsList = this.get("course.subjects");
    var subjects = "";
    subjectsList.forEach(function(object){
      subjects+=" "+object+" |";
    });
    return subjects.substr(0, subjects.length-1);
  }),



});
