import Ember from "ember";
import {KEY_CODES} from "gooru-web/config/config";
import { jwt_decode } from 'ember-cli-jwt-decode';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service("session"),

  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Submit a message to the relevant location in firebase
    submitMessage: function() {
      const db = this.get('firebaseApp').database();
      const channelId = this.channels[0].uuid;
      var user = this.get('firebaseApp').auth().currentUser;
      if (user) {
        var fullname = this.userInfo.firstName + ' ' + this.userInfo.lastName;
        var photo = this.userInfo.avatarUrl;
        var messageRef = db.ref().child("messages/" + channelId);
        var newKey = messageRef.push().key;
        db.ref("messages/" + channelId + "/" + newKey).set({
          message: this.get("message"),
          username: this.get('session.userData.username'),
          userId: this.get('session.userData.gooruUId'),
          fullname: fullname,
          photo: photo,
          createdTime: firebase.database.ServerValue.TIMESTAMP,
          messageId: newKey
        });
        //Move the location in message pane to the bottom
        Ember.run.later((function() {
        $('.message-row-container').scrollTop($('.message-row-container-inner').height());
        }), 100);
        this.set("message", '');
      }
    },
    //Upload file to firebase storage
    submitFile: function(){
      const db = this.get('firebaseApp').database();
      const storage =  this.get('firebaseApp').storage();
      const channelId = this.channels[0].uuid;
      var user = this.get('firebaseApp').auth().currentUser;
      //Only allow this functionality if the user is signed into firebase
      if (user) {
        //Gather document information
        let image = document.getElementById('mediaCapture');
        let file = image.files[0];
        var fullname = this.userInfo.firstName + ' ' + this.userInfo.lastName;
        var currentUser = user;
        var photo = this.userInfo.avatarUrl;
        //Create a reference to the messages table for this particular channel
        var messageRef = db.ref().child("messages/" + channelId);
        var newKey = messageRef.push().key;
          //store the file onto firebase storage based on the current user's id
          storage.ref(currentUser.uid + '/' + Date.now() + '/' + file.name)
            .put(file, {contentType: file.type})
            .then(function(snapshot) {
            var filePath = snapshot.metadata.fullPath;

            //push a new message containing the file information
            db.ref().child("messages/" + channelId + "/" + newKey).set({
              username: this.get('session.userData.username'),
              userId: this.get('session.userData.gooruUId'),
              fullname: fullname,
              message: storage.ref(filePath).toString(),
              photoUrl: file,
              photo: photo,
              fileType: file.type,
              fileSize: file.size,
              fileName: file.name,
              messageId: newKey,
              createdTime: firebase.database.ServerValue.TIMESTAMP
            });
          }.bind(this));
        //Move the location in message pane to the bottom
        Ember.run.later((function() {
        $('.message-row-container').scrollTop($('.message-row-container-inner').height());
        }), 100);
        this.set("message", '');
      }
    },
    //remove a message from the message pane and firebase
    removeMessage: function(message){
      const auth = this.get('firebaseApp').auth();
      const db = this.get('firebaseApp').database();
      const channelId = this.channels[0].uuid;
      //Check user id against authenticated firebase id - if it's the same then we can remove the message
      if(message.userId === auth.currentUser.uid){
        db.ref().child("messages/" + channelId +"/"+message.messageId).remove();
        //return from this method since we are done
        return;
      }
      //Decode the JWT provided to firebase - need to look into the users role
      auth.currentUser.getToken().then(function(val){
       var decodedVal = jwt_decode(val);
       //if the user is a teacher, then we allow them to remove anyones message
       if(decodedVal.user_category === "teacher"){
        db.ref().child("messages/" + channelId+"/"+message.messageId).remove();
       }
     });
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
  "class": null,

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

  // Returns true if user is signed-in. Otherwise false and displays a message.
  checkSignedInWithMessage : function() {
    const auth = this.get('firebaseApp').auth();
    // Return true if the user is signed in Firebase
    if (auth.currentUser) {
      return true;
    }else{
      return false;
    }
  },
    hideChannels: function(){
      this.toggleProperty('showChannels');
      //Ember.$('#channel').hide();
    }
});
