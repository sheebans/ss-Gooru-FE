import Ember from "ember";
import {KEY_CODES} from "gooru-web/config/config";
/*global firebase:true*/

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service("session"),

  firebase: Ember.inject.service("firebase"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Submit a message to the relevant location in firebase
    submitMessage: function() {
      this.get('firebase').submitMessage(this.userInfo,this.channels,this.get("message"));
        //Move the location in message pane to the bottom
        Ember.run.later((function() {
        $('.message-row-container').scrollTop($('.message-row-container-inner').height());
        }), 100);
        this.set("message", '');
    },
    //Upload file to firebase storage
    submitFile: function(){
      this.get('firebase').submitFile(this.userInfo,this.channels,document.getElementById('mediaCapture'));
        //Move the location in message pane to the bottom
        Ember.run.later((function() {
        $('.message-row-container').scrollTop($('.message-row-container-inner').height());
        }), 100);
        this.set("message", '');
      },
    //remove a message from the message pane and firebase
    removeMessage: function(message){
      this.get('firebase').removeMessage(message,this.channels);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The units presented to the user
   * @property {Unit}
   */
  units: null,

   /**
   * The menuItem selected
   * @property {String}
   */
   menuItem: null,

  /**
   * If analytics is fullScreen
   * @property {Boolean}
   */
  isFullScreen: false,

  showChannels: true,

 /**
   * Indicates if a user is a teacher of this class
   * @property {isTeacher}
   * @see {Class} class
   * @returns {bool}
   */
  isTeacher: Ember.computed('class', function() {
    return this.get('class').isTeacher(this.get("session.userId"));
  }),

  /**
   * Indicates if a user is a student of this class
   * @property {isStudent}
   * @see {Class} class
   * @returns {bool}
   */
  isStudent: Ember.computed('class', function() {
    return this.get('class').isStudent(this.get("session.userId"));
  }),

  // -------------------------------------------------------------------------
  // Observers

  setupSubscriptions: Ember.on('init', function () {
    var controller = this;
    Ember.$(window).on('keyup.exitFullScreen', function (e) {

      if (e.keyCode === KEY_CODES.ESCAPE && controller.get('isFullScreen')) {
        // Exit full screen mode
        controller.set('isFullScreen', false);
      }
    });

  }),

  removeSubscriptions: Ember.on('willDestroy', function () {
    Ember.$(window).off('keyup.exitFullScreen');
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Toggles the full screen mode for all class children pages
   */
  toggleFullScreen: function(){
    var isFullScreen = this.get('isFullScreen');
    this.set('isFullScreen', !isFullScreen);
  },

  /**
   * Exits the full screen mode for all class children pages
   */
  exitFullScreen: function(){
    this.set('isFullScreen', false);
  },

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item){
    this.set("menuItem", item);
  },
    hideChannels: function(){
      this.toggleProperty('showChannels');
      //Ember.$('#channel').hide();
    }
});
