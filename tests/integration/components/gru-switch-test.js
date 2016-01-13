import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('gru-switch', 'Integration | Component | gru switch', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Switch Layout', function(assert) {
  assert.expect(4);
  const switchOptions = Ember.A([Ember.Object.create({
    'label': "Option A",
    'value': 'some-value'
  }), Ember.Object.create({
    'label': "Option B",
    'value': 'some-value'
  })]);

  this.set('switchOptions', switchOptions);
  this.render(hbs`{{gru-switch switchOptions=switchOptions}}`);

  const $component = this.$(); //component dom element
  const $switch = $component.find(".gru-switch");

  T.exists(assert, $switch, 'Missing switch component');
  T.exists(assert, $switch.find(".optionA"), 'Missing first option');
  T.exists(assert, $switch.find(".optionB"), 'Missing second option');
  T.exists(assert, $switch.find(".switch"), 'Missing switch');

});

test('Switch', function(assert) {
  assert.expect(6);

  this.on('parentAction', function(option){
    var counter = 0;
    var $switch = $component.find(".gru-switch");
    if (counter === 0) {
      assert.equal("Option B", option.label);
      T.notExists(assert, $switch.find(".optionA.active"), 'Option A should be inactive');
      T.exists(assert, $switch.find(".optionB.active"), 'Option B should be active');
    } else {
      assert.equal("Option A", option.label);
      T.notExists(assert, $switch.find(".optionB.active"), 'Option B should be inactive');
      T.exists(assert, $switch.find(".optionA.active"), 'Option A should be active');
    }
    counter++;
  });

  const switchOptions = Ember.A([Ember.Object.create({
    'label': "Option A",
    'value': 'some-value'
  }), Ember.Object.create({
    'label': "Option B",
    'value': 'some-value'
  })]);
  this.set('switchOptions', switchOptions);
  this.render(hbs`{{gru-switch switchOptions=switchOptions onOptionSwitch='parentAction'}}`);

  var $component = this.$(); //component dom element
  var $switch = $component.find(".switch");
  $switch.find("a").click();
  $switch.find("a").click();
});
