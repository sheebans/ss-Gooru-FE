import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @dependency service:goal
   */
  goalService: Ember.inject.service("api-sdk/goal"),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-goal-form'],


  // -------------------------------------------------------------------------
  // Actions
  actions: {

    onStatusChange: function(newValue) {
      const goal = this.get('goal');
      goal.set('status', newValue);
    },

    onTypesChange: function(newValue) {
      this.set('type', newValue);
    },

    create: function() {
      if (this.get("onCreate")) {
        this.sendAction("onCreate", this.get("goal"));
      }
    },

    update: function() {
      if (this.get("onUpdate")) {
        this.sendAction("onUpdate", this.get("goal"));
      }
    },

    cancelEdit: function() {
      if (this.get("onCancelEdit")) {
        this.sendAction("onCancelEdit");
      }
    },

    cancel: function() {
      if (this.get("onCancel")) {
        this.sendAction("onCancel");
      }
    }

  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function() {
    this.$('.form-group .title input').focus();
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Goal} goal information
   */
  goal: null,

  /**
   * @property {boolean}
   */
  isEditView: null,

  /**
   * @property {string} name of the create action
   */
  onCreate: null,

  /**
   * @property {string} name of the update action
   */
  onUpdate: null,

  /**
   * @property {string} name of the cancel edit action
   */
  onCancelEdit: null,

  /**
   * @property {string} name of the cancel action
   */
  onCancel: null,

  /**
   * @property {Array} Returns the list of possible status to fill component
   */
  statusOptions: Ember.computed(function() {
    return this.get('goalService').getGoalStatusOptions();
  }),

  /**
   * @property {String} Goal type
   */
  type: "",

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
  })

});
