import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('reports/assessment/questions/gru-open-ended', 'Integration | Component | reports/assessment/questions/gru-open-ended', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Open ended Layout', function (assert) {
  assert.expect(2);

  const answer = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.";

  this.set('answer', answer);

  this.render(hbs`{{reports/assessment/questions/gru-open-ended userAnswer=answer}}`);

  const $component = this.$(); //component dom element
  const $answer = $component.find(".answer");

  T.exists(assert, $answer, 'Missing answer');

  assert.equal(T.text($answer), 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.', 'Wrong answer text');

});

test('Open ended Layout with out answer', function (assert) {
  assert.expect(2);

  this.render(hbs`{{reports/assessment/questions/gru-open-ended}}`);

  const $component = this.$(); //component dom element
  const $answer = $component.find(".answer");

  T.exists(assert, $answer, 'Missing answer');

  assert.equal(T.text($answer), 'N/A', 'Wrong answer text');

});

