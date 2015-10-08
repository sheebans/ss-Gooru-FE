import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('sign-up-form', 'Integration | Component | sign in form', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('sign in form renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{sign-in-form}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("div.sign-in-form"), "Root element not found");

  var $form = $component.find("form");
  T.exists(assert, $form, "Missing sign in form");
  T.exists(assert, $form.find("#signin_username"), "Missing username field");
  T.exists(assert, $form.find("#signin_password"), "Missing password field");
});
