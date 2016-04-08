import Ember from 'ember';

/**
 * Select Date Picker
 *
 * Component responsible to show the bootstrap selectpicker for a date.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-select-date-picker'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){

    $('.selectpicker').selectpicker();

    Ember.run.later(this, function() {

      $('.birth-day-date').on('focusout', function(e) {
        e.stopPropagation();

        var birthMonthSelected = this.get('birthMonthSelected');
        var birthDaySelected = this.get('birthDaySelected');
        var birthYearSelected = this.get('birthYearSelected');

       // this.set('showBirthMessage', false);
        this.set('focusLost', false);

        if (!birthMonthSelected || !birthDaySelected || !birthYearSelected){
          this.set('focusLost', true);
        }

      }.bind(this));

      $('.birth-day-date').on('focusin', function(e) {
        e.stopPropagation();
        this.set('focusLost', false);
       // this.set('showBirthMessage', false);
      }.bind(this));

    }.bind(this), 2000);

    $('.birth-day-date select.selectpicker.months').on('change', function(){
      var monthSelected = $('.selectpicker.months option:selected').val();
      this.set('birthMonthSelected', monthSelected);
    }.bind(this));

    $('.birth-day-date select.selectpicker.days').on('change', function(){
      var daySelected = $('.selectpicker.days option:selected').val();
      this.set('birthDaySelected', daySelected);
    }.bind(this));

    $('.birth-day-date select.selectpicker.years').on('change', function(){
      var yearSelected = $('.selectpicker.years option:selected').val();
      this.set('birthYearSelected', yearSelected);
    }.bind(this));
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

  /**
   * List of birthDays options
   *
   * @property {Array}
   */
  birthDays: function() {
    var birthDays = [];

    for (let d = 1; d <= 31; d++) {
      birthDays.push(("0"+d).slice(-2));
    }

    return birthDays;
  }.property(),

  /**
   * List of birthYears options
   *
   * @property {Array}
   */
  birthYears: function() {
    var birthYears = [];
    var currentTime = new Date();

    // returns the current year (four digits)
    var year = currentTime.getFullYear();

    for (let y = 1900; y <= year; y++) {
      birthYears.push(y);
    }

    return birthYears;
  }.property(),

  /**
   * Stores the day value has been selected
   * @property {Array}
   */
  birthDaySelected: null,

  /**
   * Stores the month value has been selected
   * @property {Array}
   */
  birthMonthSelected: null,

  /**
   * Stores the year value has been selected
   * @property {Array}
   */
  birthYearSelected: null,

  /**
   * Show validation error message or not
   * @property {Boolean}
   */

  wasSubmitted: false,

  showBirthMessage: Ember.computed('birthDaySelected', 'birthMonthSelected', 'birthYearSelected', 'focusLost', 'wasSubmitted', function() {
    return (!this.get('birthMonthSelected') || !this.get('birthDaySelected') || !this.get('birthYearSelected')) && (this.get('focusLost') || this.get('wasSubmitted'));
  })
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
