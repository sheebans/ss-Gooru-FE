import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  classService: Ember.inject.service("api-sdk/class"),

  applicationController: Ember.inject.controller('application'),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Actions



  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when then active classes are visible
   * @property {boolean}
   */
  showActiveClasses: true,

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {myClasses}
   */
  myClasses: Ember.computed.alias('applicationController.myClasses'),

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed.filterBy("myClasses.classes", "isArchived", false),


  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed('myClasses.memberList', function() {
    return this.getActiveClasses(this.get('myClasses.memberList'));
  }),


  hasClasses:Ember.computed('totalJoinedClasses',function(){
    return this.get('totalJoinedClasses') > 0;
  }),


// -------------------------------------------------------------------------
// Methods

  /**
   * Return the number of active classes on specific list
   */
  getActiveClasses:function(list){
    var component = this;
    var totalActiveClasses = Ember.A();
    list.forEach(function(item){
      let activeItem = component.get('activeClasses').findBy('id',item);
      if(activeItem){
        totalActiveClasses.addObject(activeItem);
      }
    });

    return totalActiveClasses.length;
  }
});


