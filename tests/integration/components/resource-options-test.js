import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('resource-options', 'Integration | Component | resource options', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('resource-options-menu', function(assert) {
  assert.expect(22);

  this.render(hbs`{{resource-options}}`); //render the component
  var $component = this.$(); //component dom element
  var $resourceMenu = $component.find(".resource-options-menu");
  T.exists(assert, $resourceMenu, "Missing resource menu");

  var $video = $component.find(".video-option");
  T.exists(assert, $video, "Missing video option");
  T.exists(assert, $video.find(".video"), "Missing video icon");
  assert.equal(T.text($video), "Video", "Incorrect video label text");

  var $webpage = $component.find(".webpage-option");
  T.exists(assert, $webpage, "Missing webpage option");
  T.exists(assert, $webpage.find(".webpage"), "Missing webpage icon");
  assert.equal(T.text($webpage), "Webpage", "Incorrect webpage label text");

  var $interactive = $component.find(".interactive-option");
  T.exists(assert, $interactive, "Missing interactive option");
  T.exists(assert, $interactive.find(".interactive"), "Missing interactive icon");
  assert.equal(T.text($interactive), "Interactive", "Incorrect interactive label text");

  var $question = $component.find(".question-option");
  T.exists(assert, $question, "Missing question option");
  T.exists(assert, $question.find(".question"), "Missing question icon");
  assert.equal(T.text($question), "Question", "Incorrect question label text");

  var $image = $component.find(".image-option");
  T.exists(assert, $image, "Missing image option");
  T.exists(assert, $image.find(".image"), "Missing image icon");
  assert.equal(T.text($image), "Image", "Incorrect image label text");

  var $audio = $component.find(".audio-option");
  T.exists(assert, $audio, "Missing audio option");
  T.exists(assert, $audio.find(".audio"), "Missing audio icon");
  assert.equal(T.text($audio), "Audio", "Incorrect audio label text");

  var $OER = $component.find(".oer-option");
  T.exists(assert, $OER, "Missing OER option");
  assert.equal(T.text($OER.find('a')), "OER", "Incorrect OER label text");

  var $stars = $component.find(".stars");
  T.exists(assert, $stars, "Missing stars option");



});
