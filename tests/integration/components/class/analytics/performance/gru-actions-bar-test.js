import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/gru-actions-bar', 'Integration | Component | class/analytics/performance/gru actions bar', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Class Performance Actions Bar with student mode', function(assert) {
  const collectionLevel = false;

  this.on('selectFilterBy', function(item) {
    assert.equal(item, 'collection', "Incorrect selected menu class item");
  });
  this.set('collectionLevel', collectionLevel);

  this.render(hbs`{{class.analytics.performance.gru-actions-bar mode='student' selectedFilterBy='assessment' onFilterSelected='selectFilterBy' collectionLevel=collectionLevel}}`);

  var $component = this.$(); //component dom element
  const $actions = $component.find(".gru-actions-bar");
  T.exists(assert, $actions, "Missing actions bar section");
  //T.exists(assert, $actions.find(".share"), "Missing share button");
  T.notExists(assert, $actions.find(".edit"), "Edit button shouldn't be visible for student mode");
  //T.exists(assert, $actions.find(".download"), "Missing download button");
  T.exists(assert, $actions.find(".full-screen"), "Missing full-screen button");

  T.exists(assert, $actions.find(".assessment"), "Missing assessment filter button");
  T.exists(assert, $actions.find(".collection"), "Missing collection filter button");

  //assessment button selected
  T.exists(assert, $actions.find(".assessment.selected"), "Missing selected assessment button");
  T.notExists(assert, $actions.find(".collection.selected"), "collection button should not be selected");
});


test('Class Performance Actions Bar with teacher mode', function(assert) {
  const collectionLevel = false;

  this.on('selectFilterBy', function(item) {
    assert.equal(item, 'collection', "Incorrect selected menu class item");
  });

  this.set('collectionLevel', collectionLevel);

  this.render(hbs`{{class.analytics.performance.gru-actions-bar mode='teacher' selectedFilterBy='collection' onFilterSelected='selectFilterBy' collectionLevel=collectionLevel}}`);

  var $component = this.$(); //component dom element
  const $actions = $component.find(".gru-actions-bar");
  T.exists(assert, $actions, "Missing actions bar section");
  T.exists(assert, $actions.find(".edit"), "Missing edit button");
  T.notExists(assert, $actions.find(".share"), "Share button shouldn't be visible for student mode");
  //T.exists(assert, $actions.find(".download"), "Missing download button");
  T.exists(assert, $actions.find(".full-screen"), "Missing full-screen button");

  T.exists(assert, $actions.find(".assessment"), "Missing assessment filter button");
  T.exists(assert, $actions.find(".collection"), "Missing collection filter button");

  //collection button selected
  T.exists(assert, $actions.find(".collection.selected"), "Missing selected collection button");
  T.notExists(assert, $actions.find(".assessment.selected"), "assessment button should not be selected");
});


test('Download action', function(assert) {
  assert.expect(2);

  this.on('myDownload', function() {
    assert.ok(true, "This should be called once");
  });

  this.render(hbs`{{class.analytics.performance.gru-actions-bar onDownload='myDownload'}}`);

  var $component = this.$(); //component dom element
  const $button = $component.find(".gru-actions-bar .download");
  T.exists(assert, $button, "Missing download button");
  $button.click();
});

test('Calling external action when pressing the full screen button', function (assert) {
  assert.expect(2);

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('isFullScreenMode', true);

  this.render(hbs`{{class.analytics.performance.gru-actions-bar onToggleFullScreen=(action 'externalAction')}}`);

  var $component = this.$(); //component dom element
  const $button = $component.find(".gru-actions-bar .full-screen");

  T.exists(assert, $button, "Missing view full screen button");
  $button.click();
});
