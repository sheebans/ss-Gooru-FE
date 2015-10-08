import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('sign-up-form', 'Integration | Component | sign up form', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('sign up form renders', function(assert) {
  assert.expect(10);

  this.render(hbs`{{sign-up-form}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("div.sign-up-form"), "Root element not found");
  T.exists(assert, $component.find("div.sign-up-container"), "Container element not found");

  var $form = $component.find("form");
  T.exists(assert, $form, "Missing sign up form");
  T.exists(assert, $form.find("#username"), "Missing username field");
  T.exists(assert, $form.find("#firstName"), "Missing firstName field");
  T.exists(assert, $form.find("#lastName"), "Missing lastName field");
  T.exists(assert, $form.find("#email"), "Missing email field");
  T.exists(assert, $form.find("#password"), "Missing password field");
  T.exists(assert, $form.find("#rePassword"), "Missing confirm password field");
  T.exists(assert, $form.find("button.btn-sign-up"), "Missing sign up button");

});
