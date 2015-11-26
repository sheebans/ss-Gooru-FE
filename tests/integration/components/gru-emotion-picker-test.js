import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('gru-emotion-picker', 'Integration | Component | gru emotion picker', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Emotion Picker', function(assert) {
  this.render(hbs`{{gru-emotion-picker}}`);

  const $component = this.$(); //component dom element
  const $emotionPicker = $component.find(".gru-emotion-picker");

  T.exists(assert, $emotionPicker, 'Missing emotion picker');

  const $emotions = $component.find(".emotion");
  assert.equal($emotions.length, 5, "Incorrect number of emotions displayed");

  assert.ok($emotions.first().hasClass('need-help'));
  assert.ok($emotions.last().hasClass('can-explain'));
});

test('Click emotion', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(emotion){
    assert.equal('1', emotion);
  });

  this.render(hbs`{{gru-emotion-picker onChangeEmotion='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $emotionPicker = $component.find("div.emotion-picker");
  $emotionPicker.find(".emotions-list li:first-child .emotion").click();
});

test('Verify selected emotion', function(assert) {
  assert.expect(1);

  this.set('ratingScore', 3);

  this.render(hbs`{{gru-emotion-picker ratingScore=ratingScore}}`);
  var $component = this.$(); //component dom element
  var $emotionPicker = $component.find("div.emotion-picker");
  var $selectedEmotion = $emotionPicker.find(".emotions-list li:eq(2) .emotion");
  assert.ok($selectedEmotion.hasClass('active'));
});
