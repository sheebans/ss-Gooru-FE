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
   * @property {Goal[]} goals
   */
  goals: null,

  /**
   * @property {Boolean} Indicates if the form component should be displayed
   */
  showForm: false,


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    showNewGoalForm: function() {
      this.resetProperties();
      this.set('showForm', true);
    },

    cancelCreation: function () {
      this.closeCreateGoalForm();
      this.resetProperties();
    },

    createGoal: function (goal) {
      const controller = this;
      const goals = controller.get('goals');

      controller.get('goalService').createGoal(goal)
        .then(function () {
          controller.closeCreateGoalForm();
          let message = controller.get('i18n').t('goals.create.created-success-msg',{goalTitle: goal.get('title')}).string;
          controller.get('notifications').success(message);
          goals.pushObject(goal);
        });
    },

    updateGoal: function (goal) {
      const controller = this;
      const goalId = goal.get('id');

      controller.get('goalService').updateGoal(goal, goalId)
        .then(function () {
          let message = controller.get('i18n').t('goals.update.updated-success-msg').string;
          controller.get('notifications').success(message);
        });
    },

    deleteGoal: function(goal) {
      const controller = this;
      controller.get('goalService').deleteGoal(goal.get("id")).then(function(){
        let message = controller.get('i18n').t('goals.delete.deleted-success-msg').string;
        controller.get('notifications').success(message);
        const goals = controller.get('goals');
        goals.removeObject(goal);
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
  },

  closeCreateGoalForm(){
    $('#createGoalForm')[0].reset();
    this.set('showForm', false);
  }

});
