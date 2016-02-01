import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('reports/assessment/gru-mastery', 'Integration | Component | reports/assessment/gru mastery', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Mastery Layout', function (assert) {
  assert.expect(5);

  const learningTargets = Ember.A([Ember.Object.create({
    'label': "Option A",
    'value': 'some-value'
  }), Ember.Object.create({
    'label': "Option B",
    'value': 'some-value'
  })]);

  this.set('learningTargets', learningTargets);

  this.render(hbs`{{reports/assessment/gru-mastery learningTargets=learningTargets}}`);

  const $component = this.$(); //component dom element
  const $mastery = $component.find(".gru-mastery");

  T.exists(assert, $mastery, 'Missing mastery component');
  T.exists(assert, $mastery.find('h2'), 'Missing mastery title');
  T.exists(assert, $mastery.find('.grading-scale-legend'), 'Missing grading scale legend');
  T.exists(assert, $mastery.find('.learning-target'), 'Missing learning target');
  assert.equal($mastery.find('.learning-target').length,2, "Incorrect number of learning targets");

});

