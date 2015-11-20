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


  assert.expect(3);

  this.render(hbs`{{player/gru-navigation}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-navigation");
  T.exists(assert, $navigation, "Missing navigation section");
  T.exists(assert, $navigation.find("button.hamburger-icon"), "Missing hamburger icon");
  T.exists(assert, $navigation.find("button.x-icon"), "Missing close icon");
});

test('Close player', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onClosePlayer='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $closeButton = $component.find(".gru-navigation button.x-icon");
  $closeButton.click();
});

test('Layout when navigator is opened', function(assert) {
  assert.expect(5);

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onOpenNavigator='parentAction' isNavigatorOpen=false}}`);
  var $component = this.$(); //component dom element
  var $menuButton = $component.find(".hamburger-icon");
  assert.ok($menuButton, "Navigation menu button is missing");
  assert.ok(!$menuButton.hasClass('hidden'), "Navigation menu button should be visible");

  $menuButton.click();
  assert.ok($component.find(".hamburger-icon").hasClass('hidden'), "Navigation menu button should hide after clicking on it");
  T.exists(assert, $component.find(".content.margin-navigator"), "Missing margin-left class in the content panel");
});
