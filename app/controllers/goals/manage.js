import Ember from 'ember';
import createGoalValidations from 'gooru-web/validations/create-goal';
import Goal from 'gooru-web/models/goal/goal';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @dependency service:goal
   */
  goalService: Ember.inject.service("api-sdk/goal"),

  /**
   * @dependency service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @dependency service:i18n
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Goal} goal
   */
  goal: null,

  /**
   * @property {String} Goal type
   */
  type: "",

  /**
   * @property {Array} Returns the list of possible status to fill component
   */
  statusOptions: Ember.computed(function() {
    return this.get('goalService').getGoalStatusOptions();
  }),


  typeOptions: Ember.computed(function() {
    let options = [
      {id: 'Completion',
        name: 'Completion'},
      {id: 'Performance',
        name: 'Performance'},
      {id: 'Improvement',
        name: 'Improvement'},
      {id: 'Teamwork',
        name: 'Teamwork'},
      {id: 'Growth',
        name: 'Growth'},
      {id: 'Mindset',
        name: 'Mindset'},
      {id: 'Seek help',
        name: 'Seek help'},
      {id: 'Help another',
        name: 'Help another'}
    ];
    return options;
  }),


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    showNewGoalForm: function() {
      $('.new-goal').slideDown();
      $('#goalTitleId').focus();
    },

    onTypesChange: function(newValue) {
      this.set('type', newValue);
    },

    onStatusChange: function(newValue) {
      const goal = this.get('goal');
      goal.set('status', newValue);
    },

    create: function () {
      const controller = this;
      const goal = controller.get('goal');

      controller.get('goalService').createGoal(goal)
        .then(function () {
          var message = controller.get('i18n').t('goals.create.created-success-msg',{goalTitle: goal.get('title')}).string;
          controller.get('notifications').success(message);
        });

    }
  },



  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */

  resetProperties(){
    var controller = this;
    var newGoalProfile = Goal.extend(createGoalValidations);
    var goal = newGoalProfile.create(Ember.getOwner(this).ownerInjection(), {});
    controller.set('goal', goal);
  }


});
