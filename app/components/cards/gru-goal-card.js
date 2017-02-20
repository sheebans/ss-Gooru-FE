import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-goal-card'],

  classNameBindings: ['expanded:expanded:collapsed', 'isEdition:edit-view'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    toggle: function() {
      this.set('expanded', !this.get('expanded'));
    },

    editView: function() {
      let goal = this.get('goal');
      let tmpGoal = goal.copy();
      this.set('tmpGoal', tmpGoal);
      this.set('isEdition', true);
    },

    update: function() {
      if (this.get('onUpdate')) {
        let goal = this.get('goal');
        let tmpGoal = this.get('tmpGoal');
        var properties = goal.modelProperties().concat(['startDate', 'endDate']);
        goal.merge(tmpGoal, properties);
        this.sendAction("onUpdate", goal);
        this.set('isEdition', false);
      }
    },

    cancelEditGoal: function() {
      this.set('isEdition', false);
    },

    delete: function() {
      if (this.get("onDelete")) {
        this.sendAction("onDelete", this.get("goal"));
      }
    }

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Goal} goal information
   */
  goal: null,

  /**
   * @property {Goal} original goal information
   */
  tmpGoal: null,

  /**
   * @property {boolean}
   */
  expanded: false,

  /**
   * @property {boolean}
   */
  isEdition: false,

  /**
   * @property {string} name of the delete action
   */
  onDelete: null,

  /**
   * @property {string} name of the update action
   */
  onUpdate: null

});
