import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';


moduleForComponent('player/resources/gru-url-player', 'Integration | Component | player/resources/gru url player', {
  integration: true
});

test('Url player layout', function (assert) {

  assert.expect(2);

  const resource = Ember.Object.create(
    {
      "id": 12,
      "order": 2,
      "resourceType": "resource/url",
      "resourceFormat": "video",
      "url": "http://www.water4all.org/us/"
    });

  this.set('resource', resource);
  this.render(hbs`{{player/resources/gru-url-player resource=resource}}`);

  var $component = this.$(); //component dom element

  T.exists(assert, $component.find(".gru-url-player iframe"), "Missing url player element");
  assert.equal($component.find("iframe").attr("src"), "http://www.water4all.org/us/", "Wrong url");
});

