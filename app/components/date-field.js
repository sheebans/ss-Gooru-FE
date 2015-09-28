import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function() {
    self = this;

    $('.Uc-gooruCalendarIcon').datepicker({
      autoclose: true
    });
    $('.Uc-gooruCalendarIcon').on("changeDate", function() {
      var dateValue = $('.Uc-gooruCalendarIcon').datepicker('getFormattedDate');
      $('#datepicker').val(dateValue);
      var model = self.controller.get('model');
      model.set('dateOfBirth', dateValue);
    });
  }

});
