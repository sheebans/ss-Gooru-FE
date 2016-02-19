import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-navigation', 'Integration | Component | player/gru navigation', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Not submitted layout', function(assert) {
  assert.expect(3);

  this.render(hbs`{{player/gru-navigation}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-navigation");
  T.exists(assert, $navigation, "Missing navigation section");
  T.exists(assert, $navigation.find(".navigation-bar span"), "Missing clickable span");
  T.exists(assert, $navigation.find("button.finish-collection"), "Missing finish collection button");
});

test('Submitted layout', function(assert) {
  assert.expect(3);

  this.render(hbs`{{player/gru-navigation submitted=true}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-navigation");
  T.exists(assert, $navigation, "Missing navigation section");
  T.exists(assert, $navigation.find(".navigation-bar span"), "Missing clickable span");
  T.exists(assert, $navigation.find("button.view-report"), "Missing view report button");
});


test('Layout when navigator is opened', function(assert) {
  assert.expect(2);

  this.on('parentAction', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onOpenNavigator='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $menuButton = $component.find(".navigation-bar span");

  assert.ok($menuButton, "Missing menu button");
  $menuButton.click();
});

test('Finish collection', function(assert) {
  assert.expect(2);

  this.on('onFinishCollection', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onFinishCollection='onFinishCollection' submitted=false}}`);
  var $component = this.$(); //component dom element
  var $finishButton = $component.find("button.finish-collection");

  assert.ok($finishButton, "Missing finish button");
  $finishButton.click();
});

test('View Report', function(assert) {
  assert.expect(2);

  this.on('onViewReport', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.render(hbs`{{player/gru-navigation onViewReport='onViewReport' submitted=true}}`);
  var $component = this.$(); //component dom element
  var $viewReportButton = $component.find("button.view-report");

  assert.ok($viewReportButton, "Missing submit all button");
  $viewReportButton.click();
});
