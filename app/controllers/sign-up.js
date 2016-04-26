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

      profile.validate().then(function ({model, validations}) {
        if (validations.get('isValid') && birthDayDate !== '') {
          profile.set('dateOfBirth', birthDayDate);
          controller.get("profileService").createProfile(profile)
            .then(function (profile) {
              controller.get("sessionService")
                .signUp(profile).then(function () {
                // Trigger action in parent
                controller.send('signUp');
              });
            });
        }
        controller.set('didValidate', true);
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
                  password: null,
                  firstName: null,
                  lastName: null,
                  email: null
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
