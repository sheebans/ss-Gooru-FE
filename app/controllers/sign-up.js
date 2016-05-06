import Ember from 'ember';
import Profile from 'gooru-web/models/profile/profile';
import Env from 'gooru-web/config/environment';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  /**
   * @property {Service} Session service
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function () {
      const controller = this;
      const profile = controller.get('profile');
      const birthDayDate = controller.validDateSelectPicker();

      if(controller.get('didValidate') === false) {
        var username = Ember.$('.gru-input-mixed-validation.username input').val();
        var email = Ember.$('.gru-input-mixed-validation.email input').val();
        var password = Ember.$('.gru-input.password input').val();
        var rePassword = Ember.$('.gru-input.rePassword input').val();
        var firstName = Ember.$('.gru-input.firstName input').val();
        var lastName = Ember.$('.gru-input.lastName input').val();
        profile.set('username', username);
        profile.set('usernameAsync', username);
        profile.set('password', password);
        profile.set('rePassword', rePassword);
        profile.set('email', email);
        profile.set('emailAsync', email);
        profile.set('firstName', firstName);
        profile.set('lastName', lastName);
      }

      profile.validate().then(function ({model, validations}) {
        if (validations.get('isValid') && birthDayDate !== '') {
          profile.set('dateOfBirth', birthDayDate);
          controller.get("profileService").createProfile(profile)
            .then(function (profile) {
              controller.get("sessionService")
                .signUp(profile).then(function () {
                controller.set('didValidate', true);
                // Trigger action in parent
                controller.send('signUp');
              });
            });
        } else {
          controller.set('submitFlag', true);
        }
        controller.set('dateValidated', true);
      });
    },

    close: function () {
      var controller = this;
      controller.set('showChildLayout',false);
      controller.send('closeSignUp');
    },

    /**
     * Triggered when the gru-select-date-picker options are selected
     * @param {*} item
     */
    validDate: function(){
      const controller = this;
      const birthDayDate = controller.validDateSelectPicker();

      if (controller.calculateAge(birthDayDate)>=13){
        controller.set('showChildLayout',false);
      }
      else {
        controller.set('showChildLayout',true);
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * init event
   */
  init() {
    this._super(...arguments);
    var profile = Profile.create(Ember.getOwner(this).ownerInjection(), {
                  username: null,
                  usernameAsync: null,
                  password: null,
                  firstName: null,
                  lastName: null,
                  email: null,
                  emailAsync: null
                });
    this.set('profile', profile);
    this.set('googleSignUpUrl', Env['google-sign-in'].url);
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('profile', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Profile} profile
   */
  profile: null,

  /**
   * @type {String} monthSelected
   */
  monthSelected: null,

  /**
   * @type {String} daySelected
   */
  daySelected: null,

  /**
   * @type {String} yearSelected
   */
  yearSelected: null,

  /**
   * Show child layout or not
   * @property {Boolean}
   */

  showChildLayout: false,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * @param {Boolean } dateValidated - value used to check if birthdate has been validated or not
   */
  dateValidated: false,

  /**
   * Submit has been performed
   * @property {Boolean}
   */
  submitFlag: true,
  // -------------------------------------------------------------------------
  // Methods

  /**
   * validate Date SelectPicker
   * @returns {Boolean}
   */
  validDateSelectPicker: function(){
    var controller = this;
    var monthSelected = $('.selectpicker.months option:selected').val();
    var daySelected = $('.selectpicker.days option:selected').val();
    var yearSelected = $('.selectpicker.years option:selected').val();
    var birthDayDate = '';

    controller.set('monthSelected', controller.getMonthName(monthSelected));
    controller.set('daySelected', daySelected);
    controller.set('yearSelected', yearSelected);

    if (monthSelected || daySelected || yearSelected){
      birthDayDate = monthSelected +'/'+ daySelected +'/'+ yearSelected;
    }

    return birthDayDate;
  },

  /**
   * get month name of monthSelected
   * @param {String} monthSelected
   * @returns {String}
   */
  getMonthName: function (monthSelected){
    const i18n = this.get('i18n');
    const monthNames = [i18n.t("sign-up.dateOfBirth.months.january"),
                        i18n.t("sign-up.dateOfBirth.months.february"),
                        i18n.t("sign-up.dateOfBirth.months.march"),
                        i18n.t("sign-up.dateOfBirth.months.april"),
                        i18n.t("sign-up.dateOfBirth.months.may"),
                        i18n.t("sign-up.dateOfBirth.months.june"),
                        i18n.t("sign-up.dateOfBirth.months.july"),
                        i18n.t("sign-up.dateOfBirth.months.august"),
                        i18n.t("sign-up.dateOfBirth.months.september"),
                        i18n.t("sign-up.dateOfBirth.months.october"),
                        i18n.t("sign-up.dateOfBirth.months.november"),
                        i18n.t("sign-up.dateOfBirth.months.december")];

    return monthNames.objectAt(parseInt(monthSelected)-1);
  },

  /**
   * calculate age of user
   * @param {String} dateOfBirth
   * @returns {Number}
   */
  calculateAge: function  (dateOfBirth) {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age--;
    }
    return age;
  }
});
