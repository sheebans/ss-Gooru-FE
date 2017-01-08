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
    submitMessage: function() {
      const db = this.get('firebaseApp').database();
      const channelId = this.channels[0].uuid;
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
      Ember.run.later((function() {
      $('.message-row-container').scrollTop($('.message-row-container-inner').height());
      }), 100);
      this.set("message", '');
    },
    submitFile: function(){
      const auth = this.get('firebaseApp').auth();
      const db = this.get('firebaseApp').database();
      const storage =  this.get('firebaseApp').storage()
      const channelId = this.channels[0].uuid;
      //var file = this.get("file");
      //console.log('file is',file);
      let image = document.getElementById('mediaCapture');
      let file = image.files[0];        
      // Check if the user is signed-in
      if (this.checkSignedInWithMessage()) {
        // We add a message with a loading icon that will get updated with the shared image.
        var fullname = this.userInfo.firstName + ' ' + this.userInfo.lastName;
        var currentUser = auth.currentUser;
        var photo = this.userInfo.avatarUrl;
        var messageRef = db.ref().child("messages/" + channelId);
        //console.log('File contains',file);
        var newKey = messageRef.push().key;
        //db.ref().child("messages/" + channelId+"/"+newKey).set({
          db.ref().child("messages/" + channelId).push({
          username: this.get('session.userData.username'),
          userId: this.get('session.userData.gooruUId'),
          fullname: fullname, 
          message: file.name,
          photoUrl: file,
          photo: photo,
          fileType: file.type,
          fileSize: file.size,
          fileName: file.name
        }).then(function(data) {
          //console.log('in then with data which contains',data);
          // Upload the image to Firebase Storage.
          storage.ref(currentUser.uid + '/' + Date.now() + '/' + file.name)
              .put(file, {contentType: file.type})
              .then(function(snapshot) {
                // Get the file's Storage URI and update the chat message placeholder.
                var filePath = snapshot.metadata.fullPath;
                data.update({message: storage.ref(filePath).toString()});
                //console.log('filepath updated',storage.ref(filePath).toString());
                //console.log('data contains',data);
                //console.log('data key',data.path.o[2]);
                data.update({messageId: data.path.o[2]});
              }.bind(this)).catch(function(error) {
              });
        }.bind(this));
      }
    },
    removeMessage: function(message){
      const auth = this.get('firebaseApp').auth();
      const db = this.get('firebaseApp').database();
      const storage =  this.get('firebaseApp').storage()
      const channelId = this.channels[0].uuid;

      /*if(message.userId == auth.currentUser.uid){
        //console.log('user is the same user');
      }else{
        //console.log('this is not the same user');
      }*/

      if(message.userId == auth.currentUser.uid){
        db.ref().child("messages/" + channelId +"/"+message.messageId).remove();
      }

      auth.currentUser.getToken().then(function(val){
       var decodedVal = jwt_decode(val);
       //console.log(decodedVal);
       if(decodedVal.user_category == "teacher"){
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
      console.log('user not signed in');
      return false;
    }
  },
    hideChannels: function(){
      //console.log('going to hide channels soon');
      //console.log('Getting channel div',Ember.$('#channel'));
      this.toggleProperty('showChannels');
      //Ember.$('#channel').hide();
    }
});
