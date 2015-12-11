import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('gru-sign-in', 'Integration | Component | gru sign in', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('sign in form renders', function(assert) {
  assert.expect(11);

  this.render(hbs`{{gru-sign-in}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("div.gru-sign-in"), "Root element not found");

  var $loginGooruTitle =$component.find('.login-gooru');
  T.exists(assert, $loginGooruTitle, "Missing login gooru title");
  assert.equal(T.text($loginGooruTitle), "Log in to your Gooru account", "Incorrect login gooru title text");

  var $connectButton =$component.find('.connect-button');
  T.exists(assert, $connectButton, "Missing  google connect button");
  assert.equal(T.text($connectButton), "Log in with Google", "Incorrect  google connect button text");

  var $form = $component.find("form");
  T.exists(assert, $form, "Missing sign in form");
  T.exists(assert, $form.find("#signin_username"), "Missing username field");
  T.exists(assert, $form.find("#signin_password"), "Missing password field");
  T.exists(assert, $form.find("div.forgot-password a"), "Missing forgot password link");
  T.exists(assert, $form.find("div.sign-in-button-section button"), "Missing sign un button");

  T.exists(assert, $component.find("span.sign-up-here button"), "Missing sign up here link");
});
