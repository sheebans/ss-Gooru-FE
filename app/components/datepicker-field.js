import Ember from 'ember';

export default Ember.Component.extend({

  placeholder: null,

  /**
   * @property {string} on select date action
   */
  onSelectDateAction: "onSelectDate",

  didInsertElement: function() {
    var component = this;
    var $component = component.$('.datepicker-icon');
    $component.datepicker({
      autoclose: true
    });
    $component.on("changeDate", function() {
      var dateValue = $component.datepicker('getFormattedDate');
      component.$('#datepicker').val(dateValue);
      component.sendAction("onSelectDateAction", dateValue);
    });
  }

});
