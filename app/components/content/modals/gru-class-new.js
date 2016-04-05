import Ember from 'ember';
import Class from 'gooru-web/models/content/class';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modal', 'gru-class-new'],

  // -------------------------------------------------------------------------
  // Actions

    actions: {

      createClass: function () {
        const newClass = this.get('newClass');
        newClass.validate().then(function ({ model, validations }) {
          if (validations.get('isValid')) {
            Ember.logger("Class Valid");
          }
          this.set('didValidate', true);
        }.bind(this));
      }

    },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var newClass = Class.create(Ember.getOwner(this).ownerInjection(), {
      title: null,
      class_sharing: 'open'
    });
    this.set('newClass', newClass);
    this.set('currentClassSharing', Ember.computed.alias('newClass.classSharing'));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Class} class
   */
  newClass: null,

  /**
   * @type {String} open or restricted, tells the component which radio is checked.
   */
  currentClassSharing: null

});
