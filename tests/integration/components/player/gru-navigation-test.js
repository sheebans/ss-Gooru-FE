import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-navigation', 'Integration | Component | player/gru navigation', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Navigation', function(assert) {


  assert.expect(3);

  this.render(hbs`{{player/gru-navigation}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-navigation");
  T.exists(assert, $navigation, "Missing navigation section");
  T.exists(assert, $navigation.find("span.hamburger-icon"), "Missing hamburger icon");
  T.exists(assert, $navigation.find("span.x-icon"), "Missing close icon");
});

test('Close player', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onCloseContentPlayer='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $closeButton = $component.find(".gru-navigation span.x-icon");
  $closeButton.click();
});

