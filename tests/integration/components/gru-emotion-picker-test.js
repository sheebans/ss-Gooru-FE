import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import {emotions} from '../../../utils/constants';

moduleForComponent('gru-emotion-picker', 'Integration | Component | gru emotion picker', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Emotion Picker', function(assert) {
  var emotionsList = emotions();
  this.render(hbs`{{gru-emotion-picker}}`);

  var $component = this.$(); //component dom element
  var $emotionPicker = $component.find(".gru-emotion-picker");
  T.exists(assert, $emotionPicker, 'Missing emotion picker');

  const $emotions = $component.find(".emotics");
  assert.equal($emotions.length,emotionsList.length, "Incorrect number of emotions");

  emotionsList.forEach(function(emotion){
    T.exists(assert, $emotionPicker.find("."+emotion.emotion), 'Missing emotion ');
  });
});
test('Click emotion', function(assert) {
  assert.expect(1);
  var emotionsList = emotions();

  this.on('onChangeEmotionAction', function(attributes){
    assert.deepEqual(attributes, emotionsList[0].emotion, 'submitted emotion');
  });

  this.render(hbs`{{gru-emotion-picker onChangeEmotionAction='onChangeEmotionAction'}}`);
  var $component = this.$(); //component dom element
  var $emotionPicker = $component.find("div.emotion-picker");
  $emotionPicker.find("ul.emotions-list li.pa-sm-5:eq(0) div").click();

});
