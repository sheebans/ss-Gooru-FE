import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import wait from 'ember-test-helpers/wait';

moduleForComponent('gru-rich-text-editor', 'Integration | Component | gru rich text editor', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Layout', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  T.exists(assert,  $component.find(".bold"), "Missing bold button");

  T.exists(assert,  $component.find(".italic"), "Missing italic button");

  T.exists(assert,  $component.find(".underline"), "Missing underline button");

  T.exists(assert,  $component.find(".superscript"), "Missing superscript button");

  T.exists(assert,  $component.find(".subscript"), "Missing subscript button");

  T.exists(assert,  $component.find(".add-function"), "Missing add function button");

  T.exists(assert,  $component.find(".expressions-panel"), "Missing expression panel ");

  T.exists(assert,  $component.find(".equation-wrapper"), "Missing equation wrapper ");

  T.exists(assert,  $component.find(".math-field"), "Missing math field ");

  T.exists(assert,  $component.find(".actions button"), "Missing insert button ");

  T.exists(assert,$component.find(".tab-content .fraction"),"Missing fraction");

  T.exists(assert,$component.find(".tab-content .sqrt"),"Missing sqrt");

  T.exists(assert,$component.find(".tab-content .sqrtn"),"Missing sqrtn");

  T.exists(assert,$component.find(".tab-content .overline"),"Missing overline");

  T.exists(assert,$component.find(".tab-content .sum"),"Missing sum");

  T.exists(assert,$component.find(".tab-content .greater-equal"),"Missing greather-equal");

  T.exists(assert,$component.find(".tab-content .greater"),"Missing greather");

  T.exists(assert,$component.find(".tab-content .infinity"),"Missing infinity");

});
test('Select fraction', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .fraction").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-fraction"),"Fraction missing");
  });
});

test('Select sqrt', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .sqrt").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-sqrt-prefix"),"Squared root missing");
  });
});

test('Select sqrtn', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .sqrtn").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-nthroot"),"Magnitude  missing");
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-sqrt-prefix"),"Squared root missing");
  });
});

test('Select overline', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .overline").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-overline"),"Overline missing");
  });
});

test('Select sum', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .sum").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-to"),"Missing to");
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-large-operator big")), '∑', 'Wrong sum icon');
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-from"),"Missing from");
  });
});

test('Select greater-equal', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .greater-equal").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '≥', 'Wrong greater-equal icon');
  });
});

test('Select greater', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .greater").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '>', 'Wrong greater icon');
  });
});

test('Select infinity', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .infinity").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field span:nth-child(1)")), '∞', 'Wrong greater icon');
  });
});
