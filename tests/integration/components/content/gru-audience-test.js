import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-audience', 'Integration | Component | content/gru audience', {
  integration: true
});

test('Audience Read Only Layout', function(assert) {

  this.render(hbs`
    {{content.gru-audience isEditing=false}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");

  assert.equal($audienceComponent.find('span.audience-label').text(), 'Audience', 'Incorrect title');
  assert.equal($audienceComponent.find('span.empty').text(), 'Not specified', 'Incorrect Message');
});

test('Audience Edit Layout', function(assert) {

  this.render(hbs`
    {{content.gru-audience isEditing=true}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");
  assert.equal($audienceComponent.find('span.audience-label').text(), 'Audience', 'Incorrect title');
  assert.ok($audienceComponent.find('.dropdown-toggle'), 'Missing Dropdown');
  assert.equal($audienceComponent.find('.dropdown-toggle').text().trim(), '+ Add', 'Incorrect Dropdown Label');
});
