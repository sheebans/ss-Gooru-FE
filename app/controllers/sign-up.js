import Ember from 'ember';
import User from 'gooru-web/models/profile/profile';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function() {
      const controller = this;
      const user = controller.get('user');

      console.log('months', $('#signUpForm select.months').val());

      user.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          //to do
        }
        controller.set('didValidate', true);
      });

    }
  },

  init() {
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {
                  username: null,
                  password: null,
                  firstName: null,
                  lastName: null,
                  email: null
                });
    var birthDays = [];
    var birthYears = [];

    var currentTime = new Date();

    // returns the current year (four digits)
    var year = currentTime.getFullYear();

    Ember.run.schedule("afterRender",this,function() {

      $('.selectpicker').selectpicker();

      $('#signUpForm select').on('change', function(e) {
        //console.log('change', $(this).val());
        //$('#signUpForm').validate().element($(this));
      });
      $('#signUpForm select.days').on('change', function(e) {
       // console.log('change', $(this).val());
        //$('#signUpForm').validate().element($(this));
      });
      $('#signUpForm select.years').on('change', function(e) {
       // console.log('change', $(this).val());
        //$('#signUpForm').validate().element($(this));
      });
    });

    for (let d = 1; d <= 31; d++) {
      birthDays.push(d);
    }

    for (let y = 1900; y <= year; y++) {
      birthYears.push(y);
    }

    this.set('user', user);
    this.set('birthDays', birthDays);
    this.set('birthYears', birthYears);

  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('birthDays', null);
    this.set('birthYears', null);
  },


  // -------------------------------------------------------------------------
  // Properties

  user: null,


});
