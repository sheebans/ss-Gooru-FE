import Ember from "ember";
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Class navigation
 *
 * Component responsible for enabling more flexible navigation options for the class.
 * For example, where {@link class/gru-class-navigation.js}} allows access the class information and navigate through the menu options.
 * @module
 * @see controllers/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {

    /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['community-channel'],

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

  channels: null,

  messages: null,

  currentUser: null,

  actions: {
    /**
     * Submit a new message
     *
     * @param current user data, list of channels, and message to be sent
     *
     * @returns void
     */
    submitMessage: function(currentUser, channels, message) {
        channels = this.get('channels');
        currentUser = this.get('currentUser');
        message = this.get('message');
        const service = this;
        const db = this.get('firebaseApp').database();
        const channelId = channels[0].uuid;
        var user = this.get('firebaseApp').auth().currentUser;
        if (user) {
          var fullname = currentUser.firstName + ' ' + currentUser.lastName;
          var photo = currentUser.avatarUrl;
          var messageRef = db.ref().child("messages/" + channelId);
          var newKey = messageRef.push().key;
          db.ref("messages/" + channelId + "/" + newKey).set({
            message: message,
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

    //submit a file to firebase storage
    submitFile: function(currentUser, channels, fileToSend){
        channels = this.get('channels');
        currentUser = this.get('currentUser');
        fileToSend = document.getElementById('mediaCapture')
        const db = this.get('firebaseApp').database();
        const storage =  this.get('firebaseApp').storage();
        const channelId = channels[0].uuid;
        var user = this.get('firebaseApp').auth().currentUser;
        //Only allow this functionality if the user is signed into firebase
        if (user) {
          //Gather document information
          let image = fileToSend;
          let file = image.files[0];
          var fullname = currentUser.firstName + ' ' + currentUser.lastName;
          var photo = currentUser.avatarUrl;
          //var currentUser = user;
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
    //remove a message from firebase
    removeMessage: function(message,channels){
      channels = this.get('channels');
      const auth = this.get('firebaseApp').auth();
      const db = this.get('firebaseApp').database();
      const channelId = channels[0].uuid;
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
  }
});
