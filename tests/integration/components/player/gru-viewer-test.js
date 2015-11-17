import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-viewer', 'Integration | Component | player/gru viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('Narration', function (assert) {


  assert.expect(3);

  const narration = Ember.Object.create({
      'image-url': '76514d68-5f4b-48e2-b4bc-879b745f3d70.png',
      'message': 'Some message here'
    }),
    resourceMockA = Ember.Object.create({
      id: 1,
      'name': 'Resource #3',
      'type': 'question',
      narration: narration
    });

  this.set("resource", resourceMockA);

  this.render(hbs`{{player/gru-viewer resource=resource}}`);

  var $component = this.$(); //component dom element
  const $gruViewer = $component.find(".gru-viewer");
  T.exists(assert, $gruViewer, "Missing narration section");
  T.exists(assert, $gruViewer.find(".narration img.avatar"), "Missing autor image");
  T.exists(assert, $gruViewer.find(".narration .message"), "Missing narration");
});
