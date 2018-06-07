import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class-setting'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),

  /**
   * This holds the object of class
   * @type {Object}
   */
  class: null,

  /**
   * This holds the setting object of class
   * @type {Object}
   */
  setting: Ember.computed.alias('class.setting'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when rescope setting toggle button got clicked
     * @param  {Boolean} rescope
     */
    onToggleRescopeSetting: function(rescope) {
      let classId = this.get('class.id');
      this.sendAction('onUpdateRescopeSetting', classId, rescope);
    }
  }
});
