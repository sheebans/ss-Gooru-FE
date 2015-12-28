import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('gru-user-teaser', 'Integration | Component | gru user teaser', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('User Tease Layout', function(assert) {

  assert.expect(4);
  this.render(hbs`{{gru-user-teaser}}`);

  var $component = this.$(); //component dom element
  const $userTeaser = $component.find(".gru-user-teaser");
  T.exists(assert, $userTeaser, "Missing user teaser section");
  T.exists(assert, $userTeaser.find("img.avatar"), "Missing user profile picture");
  T.exists(assert, $userTeaser.find(".user-full-name a"), "Missing first user fullname link");
  T.exists(assert, $userTeaser.find(".total-users-left p"), "Missing total users left");
});
