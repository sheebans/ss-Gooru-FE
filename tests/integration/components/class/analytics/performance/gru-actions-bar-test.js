import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/gru-actions-bar', 'Integration | Component | class/analytics/performance/gru actions bar', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Class Performance Actions Bar', function(assert) {
  assert.expect(9);

  this.on('selectFilterBy', function(item) {
    assert.equal(item, 'collection', "Incorrect selected menu class item");
  });

  this.render(hbs`{{class.analytics.performance.gru-actions-bar mode='student' selectedFilterBy='collection' onFilterSelected='selectFilterBy'}}`);

  var $component = this.$(); //component dom element
  const $actions = $component.find(".gru-actions-bar");
  T.exists(assert, $actions, "Missing actions bar section");
  T.exists(assert, $actions.find(".share"), "Missing share button");
  T.exists(assert, $actions.find(".download"), "Missing download button");
  T.exists(assert, $actions.find(".full-screen"), "Missing full-screen button");

  //drop down menu list
  const $dropMenu = $actions.find(".drop-menu");
  T.exists(assert, $dropMenu, "Missing view drop down menu");
  T.exists(assert, $dropMenu.find(".assessment"), "Missing assessment item in the view drop down menu");
  T.exists(assert, $dropMenu.find(".collection"), "Missing collection item in the view drop down menu");
  T.exists(assert, $dropMenu.find(".both"), "Missing both item in the view drop down menu");

  //drop down menu item Selected
  T.exists(assert, $dropMenu.find(".collection.selected"), "Missing selected collection item");
});
