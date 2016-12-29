import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/collections/gru-collection-skills-legend', 'Integration | Component | content/collections/gru collection skills legend', {
  integration: true,
  beforeEach: function () {
    this.i18n = this.container.lookup('service:i18n');
  }
});

test('Collection skills legend Layout', function (assert) {

  this.render(hbs`{{content/collections/gru-collection-skills-legend}}`);

  var $container = this.$("header.content.collections.gru-collection-skills-legend");
  assert.ok($container.length, "Component");

  const $legends = $container.find('> ul');
  assert.ok($legends.length, "List of Legends");
  assert.equal($legends.find('> li.legend').length, 4, "Number of legends");
  assert.ok($legends.find('> li.legend .circle').length, "Icon of the Legend");
});
