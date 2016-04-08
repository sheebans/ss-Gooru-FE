import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
//import wait from 'ember-test-helpers/wait';

moduleForComponent('gru-select-date-picker', 'Integration | Component | gru select date picker', {
  integration: true
});

test('Layout', function(assert) {

  this.render(hbs`{{gru-select-date-picker}}`);

  let $component = this.$();
  T.exists(assert, $component.find(".birth-day-date"), "Missing birth-day-date wrapper");
  assert.equal(T.text($component.find(".birth-day-date .required")), 'Birthday', 'Wrong birthday label');
  T.exists(assert, $component.find(".birth-months"), "Missing birth-months field");
  T.exists(assert, $component.find(".birth-days"), "Missing birth-days field");
  T.exists(assert, $component.find(".birth-years"), "Missing birth-years field");
  assert.equal($component.find('select.selectpicker').length, 3, 'Number of selectpickers is incorrect');
});

//test('it shows an error message if the months selectpicker is left blank', function (assert) {
//
//  this.render(hbs`{{gru-select-date-picker}}`);
//
//  let $component = this.$();
//
//  const $birthDayDateField = $component.find(".birth-day-date");
//
//  assert.ok(!$birthDayDateField.find(".error-messages .error").length, 'Title error message not visible');
//
//  $birthDayDateField.find("select.selectpicker.months").click();
//  $birthDayDateField.find("select.selectpicker.months").val('01');
//  $birthDayDateField.find("select.selectpicker.days").val(null);
//  $birthDayDateField.find("select.selectpicker.years").val(null);
//  $birthDayDateField.blur();
//
//  return wait().then(function () {
//    assert.ok($birthDayDateField.find(".error-messages .error").length, 'Title error message visible');
//    $birthDayDateField.find("select.selectpicker.months").val('01');
//    $birthDayDateField.find("select.selectpicker.days").val('01');
//    $birthDayDateField.find("select.selectpicker.years").val('2000');
//    $birthDayDateField.blur();
//
//    return wait().then(function () {
//      assert.ok(!$birthDayDateField.find(".error-messages .error").length, 'Title error message was hidden');
//    });
//  });
//});
