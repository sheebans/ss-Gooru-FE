import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('gru-profile-card', 'Integration | Component | gru profile card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Profile Card Layout', function(assert) {
  assert.expect(4);
  const user = Ember.Object.create(
    {
      "id": 10,
      "avatarUrl": "assets/gooru/profile.png",
      "username":"John"
    });
  this.set('user', user);

  this.render(hbs`{{gru-profile-card user=user}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("div.gru-profile-card"), "Profile Card not found");

  var $avatar =$component.find('img.avatar');
  T.exists(assert, $avatar, "Missing user avatar");


  var $userName =$component.find('.user-name');
  T.exists(assert, $userName, "Missing  user name");
  assert.equal(T.text($userName), "John", "Incorrect  user name");

});
