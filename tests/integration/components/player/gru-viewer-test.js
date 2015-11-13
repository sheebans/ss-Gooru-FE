import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-viewer', 'Integration | Component | player/gru viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Narration', function(assert) {


  assert.expect(3);

  this.render(hbs`{{player/gru-viewer}}`);

  var $component = this.$(); //component dom element
  const $narration = $component.find(".gru-viewer");
  T.exists(assert, $narration, "Missing narration section");
  T.exists(assert, $narration.find(".avatar-container img.autor"), "Missing autor image");
  T.exists(assert, $narration.find(".message"), "Missing narration");
});
