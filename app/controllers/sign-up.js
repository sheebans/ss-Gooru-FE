import Ember from 'ember';
import User from 'gooru-web/models/profile/profile';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function() {
      const controller = this;
      const user = controller.get('user');
      const validDate = controller.validDateSelectPicker();
      user.validate().then(function ({model, validations}) {
       if (validations.get('isValid') && validDate!=='') {
          //to do
        }
        controller.set('didValidate', true);
      });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * init event
   */
  init() {
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {
                  username: null,
                  password: null,
                  firstName: null,
                  lastName: null,
                  email: null
                });
    this.set('user', user);
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('user', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Profile} user
   */
  user: null,

  /**
   * To show error birth message or not
   * @property {Boolean}
   */
 // validDate: true,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * validate Date SelectPicker
   * @returns {Boolean}
   */
  validDateSelectPicker: function(){
    var monthSelected = $('.selectpicker.months option:selected').val();
    var daySelected = $('.selectpicker.days option:selected').val();
    var yearSelected = $('.selectpicker.years option:selected').val();
    var birthDayDate = '';

    if (monthSelected || daySelected || yearSelected){
      birthDayDate = monthSelected +'/'+ daySelected +'/'+ yearSelected;
    }

    return birthDayDate;
  }
});
