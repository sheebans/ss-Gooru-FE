import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-goal-card', 'Integration | Component | cards/gru goal card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
    this.inject.service('i18n');
  }
});

var mockGoal = Ember.Object.create({
  "id": "goal-id",
  "title": "My Fitness Goal",
  "description": "This is Description to Goal",
  "start_date": 1409175049,
  "end_date": 1409175049,
  "status": "not_started",
  "reflection": "need to do better"
});

test('Class Card Layout', function(assert) {

  this.set('goal', mockGoal);

  this.render(hbs`{{cards/gru-goal-card goal=goal}}`);

  var $component = this.$(); //component dom element

  const $goalCard = $component.find(".gru-goal-card");
  const $panel = $goalCard.find(".panel");
  const $panelHeading = $panel.find(".panel-heading");
  const $panelBody = $panel.find(".panel-body");
  const $panelFooter = $panel.find(".panel-footer");

  T.exists(assert, $goalCard, "Missing goal card section");
  T.exists(assert, $panel, "Missing goal card panel");
  T.exists(assert, $panelHeading, "Missing goal card panel heading");
  T.exists(assert, $panelBody, "Missing goal card panel body");
  T.exists(assert, $panelFooter, "Missing goal card panel footer");

  T.exists(assert, $panelHeading.find(".icon"), "Missing goal icon title");
  T.exists(assert, $panelHeading.find(".title"), "Missing goal title");
  assert.equal(T.text($panelHeading.find(".title")), 'My Fitness Goal', 'Wrong text title');

  T.exists(assert, $panelBody.find(".date"), "Missing goal icon date");
  T.exists(assert, $panelBody.find(".status"), "Missing goal status");
  assert.notEqual(T.text($panelBody.find(".date")), '', 'date not empty');
  assert.equal(T.text($panelBody.find(".status")), 'Status - Not Started', 'Wrong text status');

  T.exists(assert, $panelFooter.find(".expand"), "Missing expand icon");
  T.exists(assert, $panelFooter.find(".actions"), "Missing goal actions");
  T.exists(assert, $panelFooter.find(".actions .edit-item"), "Missing goal edit action");
  T.exists(assert, $panelFooter.find(".actions .delete-item"), "Missing goal delete action");
});
