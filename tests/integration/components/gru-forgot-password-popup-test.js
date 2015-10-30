import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-forgot-password-popup', 'Integration | Component | gru forgot password popup', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Forgot Password Popup', function(assert) {
  assert.expect(8);

  this.render(hbs`{{gru-forgot-password-popup}}`); //render the component
  var $component = this.$(); //component dom element
  const $forgotPassword = $component.find(".forgot-password-section");
  T.exists(assert, $forgotPassword, "Missing forgot password section");
  T.exists(assert, $forgotPassword.find(".title"), "Missing title");
  T.exists(assert, $forgotPassword.find(".description"), "Missing description");
  T.exists(assert, $forgotPassword.find(".username-or-email"), "Missing username or email input");
  T.exists(assert, $forgotPassword.find(".forgot-password-submit"), "Missing submit button");

  const $footer = $component.find(".footer");
  T.exists(assert, $footer, "Missing footer section");
  T.exists(assert, $footer.find('.footer-description'), "Missing footer description");
  T.exists(assert, $footer.find('.support-mail'), "Missing support email");
});
