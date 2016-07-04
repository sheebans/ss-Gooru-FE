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

test('Select subscript', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .subscript").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-supsub .mq-sub"),"Subscript missing");
  });
});

test('Select superscript', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .superscript").click();
  return wait().then(function () {
    T.exists(assert,$component.find(".math-field .mq-root-block .mq-supsub .mq-sup"),"Superscript missing");
  });
});

//test('Select over left arrow', function(assert) {
//
//  this.set('showExpressionsPanel',true);
//
//  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
//  const $component = this.$();
//  $component.find(".tab-content .over-left-arrow").click();
//  return wait().then(function () {
//    T.exists(assert,$component.find(".math-field .mq-root-block .mq-overarrow.mq-arrow-left"),"Over arrow left missing");
//  });
//});
//
//test('Select over right arrow', function(assert) {
//
//  this.set('showExpressionsPanel',true);
//
//  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
//  const $component = this.$();
//  $component.find(".tab-content .over-right-arrow").click();
//  return wait().then(function () {
//    T.exists(assert,$component.find(".math-field .mq-root-block .mq-overarrow.mq-arrow-right"),"Over arrow right missing");
//  });
//});

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
test('Select plus', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .plus").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block span:nth-child(1)")), '+', 'Wrong plus icon');
  });
});
test('Select minus', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .minus").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block span:nth-child(1)")), '−', 'Wrong minus icon');
  });
});
test('Select div', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .div").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '÷', 'Wrong div icon');
  });
});
test('Select cdot', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .cdot").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '·', 'Wrong cdot icon');
  });
});

test('Select not equal', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .not-equal").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '≠', 'Wrong not equal icon');
  });
});
test('Select less', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .less").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '<', 'Wrong less icon');
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
test('Select less-equal', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .less-equal").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '≤', 'Wrong greater-equal icon');
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
test('Select sim', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .sim").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '~', 'Wrong similar icon');
  });
});

test('Select approx', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .approx").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-binary-operator")), '≈', 'Wrong approx icon');
  });
});
test('Select alpha', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .alpha").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block var")), 'α', 'Wrong alpha icon');
  });
});

test('Select ()', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .pmatrix").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(1)")), '(', 'Should be (');
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(3)")), ')', 'Should be )');
  });
});

test('Select {}', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .Bmatrix").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(1)")), '{', 'Should be {');
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(3)")), '}', 'Should be }');
  });
});

test('Select ||', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .vmatrix").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(1)")), '|', 'Should be |');
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-non-leaf span:nth-child(3)")), '|', 'Should be |');
  });
});

test('Select angle', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .angle").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing angle icon");
  });
});

test('Select measured angle', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .measuredangle").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing measured icon icon");
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


test('Select perpendicular', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .bot").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing perpendicular icon");
  });
});

test('Select parallel', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .parallel").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing parallel icon");
  });
});
test('Select sigma', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .sigma").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing sigma icon");
  });
});
test('Select theta', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .theta").click();
  return wait().then(function () {
    T.exists(assert,  $component.find(".math-field .mq-root-block span"), "Missing theta icon");
  });
});
test('Select pi', function(assert) {

  this.set('showExpressionsPanel',true);

  this.render(hbs`{{gru-rich-text-editor showExpressionsPanel=showExpressionsPanel}}`);
  const $component = this.$();
  $component.find(".tab-content .pi").click();
  return wait().then(function () {
    assert.equal(T.text($component.find(".math-field .mq-root-block .mq-nonSymbola")), 'π', 'Incorrect pi icon');
  });
});
