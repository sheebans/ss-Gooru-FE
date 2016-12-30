import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {

  queryParams: {
    refresh: {
      refreshModel: true
    }
  },


  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),
  
  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);
  
  var channels = [];
  var messages = [];
  const db = this.get('firebaseApp').database();
  var userInfo = this.get('profileService').findByCurrentUser().then(function(value) {
    var channelRef = db.ref().child("channels/");
      channelRef.once('value').then(function(snapshot) {
      if (!snapshot.hasChild(classId)) {
            var newKey = channelRef.child(classId).push().key;
            var creator = classPromise.creatorId;
            var fullName = value.firstName + ' ' + value.lastName;
            var postData = {
              creatorId: creator,
              channelName: classPromise.title,
              owners: {
                [creator] : {
                  fullname: fullName
                }
              },
              uuid: newKey
            };   
            db.ref().child("channels/"+classId + "/" + newKey).set(postData);
            for (var i=0; i<currentClass.members.length; i++) {
              db.ref().child("channels/"+classId).once("value").then(function(snapshot){
                snapshot.forEach(function(channelSnapshot) {
                  db.ref().child("channels/"+classId+"/"+channelSnapshot.val().uuid+"/participants/"+currentClass.members[i].id).set({
                    user:"newuser"
                  });
                });
              });         
            }
          }
        });
        var dbChannelRef = channelRef.child(classId);
        dbChannelRef.on('value', function(snapshot) {
          snapshot.forEach(function(channelSnapshot) {
            var channelId = channelSnapshot.child("uuid").val();
            var messageRef = db.ref().child("messages/" + channelId);
            const storage = route.get('firebaseApp').storage();
            messageRef.on('value',function(snapshot) {
              messages.clear();
              snapshot.forEach(function(messageSnapshot) {
                var mes = messageSnapshot.val().message;
                var tmp = messageSnapshot.val();
                // If the image is a Firebase Storage URI we fetch the URL.
                  console.log('mes contains',mes);
                  console.log('full message object',tmp);
                  if (mes.startsWith('gs://')) {
                    console.log('mes starts with gs',mes);
                    //imgElement.src = "https://www.google.com/images/spin-32.gif"; // Display a loading image first.
                    //messages.pushObject(tmp);
                    storage.refFromURL(mes).getMetadata().then(function(metadata) {
                      mes = metadata.downloadURLs[0];
                      tmp.imageURL = mes;
                      messages.pushObject(tmp);
                    });
                  }else{
                    messages.pushObject(messageSnapshot.val());
                  }
              });
            });
            console.log('Messages contains after setImageUrl',messages);
            channels.pushObject(channelSnapshot.val());
            return true;
          });
        });
    
        return value;
    });
  
    return Ember.RSVP.hash({
      class: classPromise,
      members: membersPromise
    }).then(function(hash) {
      const aClass = hash.class;
      const members = hash.members;
      const courseId = aClass.get('courseId');

      let visibilityPromise = Ember.RSVP.resolve([]);
      let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

      if (courseId) {
        visibilityPromise = route.get('classService').readClassContentVisibility(classId);
        coursePromise = route.get('courseService').fetchById(courseId);
      }

      return Ember.RSVP.hash({
        contentVisibility: visibilityPromise,
        course: coursePromise
      }).then(function (hash) {
        const contentVisibility = hash.contentVisibility;
        const course = hash.course;
        aClass.set('owner', members.get('owner'));
        aClass.set('collaborators', members.get('collaborators'));
        aClass.set('members', members.get('members'));
        return Ember.RSVP.hash({
          class: aClass,
          course: course,
          members: members,
          units: course.get('children') || [],
          contentVisibility: contentVisibility,
      channels:channels,
      messages:messages,
      userInfo:userInfo
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("class", model.class);
    controller.set("course", model.course);
    controller.set("units", model.units);
    controller.set("contentVisibility", model.contentVisibility);
  controller.set('channels', model.channels);
    controller.set('messages', model.messages);
    controller.set('userInfo', model.userInfo);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get("controller");
      const aClass = controller.get('class');
      const isTeacher = aClass.isTeacher(this.get("session.userId"));
      controller.selectMenuItem(item);
      const queryParams = {
        queryParams: {
          filterBy: 'assessment'
        }
      };

      if ((item === "analytics.performance") && isTeacher){
        route.transitionTo('class.analytics.performance.teacher.course', queryParams);
      } else if ((item === "analytics.performance") && !isTeacher) {
        route.transitionTo('class.analytics.performance.student', queryParams);
      } else {
        route.transitionTo('class.' + item);
      }
    },
    /**
     * Gets a refreshed list of content visible
     */
    updateContentVisible: function(contentId, visible) {
      const route = this;
      const controller = route.get("controller");
      let contentVisibility = controller.get('contentVisibility');
      contentVisibility.setAssessmentVisibility(contentId,visible ? 'on' :'off');
    },
     // Sets the URL of the given img element with the URL of the image stored in Firebase Storage.
    setImageUrl: function(imageUri) {
      const storage = route.get('firebaseApp').storage();
      // If the image is a Firebase Storage URI we fetch the URL.
      if (imageUri.startsWith('gs://')) {
        //imgElement.src = "https://www.google.com/images/spin-32.gif"; // Display a loading image first.
        storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
          return metadata.downloadURLs[0];
        });
      }else{
        return imageUri;
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * This event handlers reset some class properties when leaving the route
   */
  handleDeactivate: function() {
    this.get("controller").exitFullScreen();
  }.on('deactivate')

});
