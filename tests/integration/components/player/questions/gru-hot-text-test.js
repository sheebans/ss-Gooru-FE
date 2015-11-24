import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-hot-text', 'Integration | Component | player/questions/gru hot text', {
  integration: true
});

test('getWordItems', function(assert) {
  assert.expect(1);
  //this.render(hbs`{{player/questions/gru-hot-text}}`);

  //var $component = this.$(); //component dom element
  var component = this.subject();
  //
  assert.deepEqual(component.getWordItems("text"), [1], "Wrong items");
});
