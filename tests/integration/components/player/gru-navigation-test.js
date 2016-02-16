import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-navigation', 'Integration | Component | player/gru navigation', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Layout', function(assert) {


  assert.expect(2);

  this.render(hbs`{{player/gru-navigation}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-navigation");
  T.exists(assert, $navigation, "Missing navigation section");
  T.exists(assert, $navigation.find("button.hamburger-icon"), "Missing hamburger icon");
});


test('Layout when navigator is opened', function(assert) {
  assert.expect(2);

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onOpenNavigator='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $menuButton = $component.find(".hamburger-icon");

  assert.ok($menuButton, "Missing menu button");
  $menuButton.click();
});
