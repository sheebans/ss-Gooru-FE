import Ember from 'ember';
import Class from 'gooru-web/models/content/class';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Class service API SDK
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modal', 'gru-class-new'],

  // -------------------------------------------------------------------------
  // Actions

    actions: {

      createClass: function () {
        const component = this;
        const newClass = this.get('newClass');
        newClass.validate().then(function ({ model, validations }) {
          if (validations.get('isValid')) {
            component.get('classService')
                .createClass(newClass)
                .then(function(newClass) {
                  component.get('router').transitionTo('class', { classId : newClass.get('id') });
                },

                function() {
                  const message = component.get('i18n').t('common.errors.class-not-created').string;
                  component.get('notifications').error(message);
                }
              );
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
      classSharing: 'open'
    });
    this.set('newClass', newClass);
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
  currentClassSharing:  Ember.computed.alias('newClass.classSharing')

});
