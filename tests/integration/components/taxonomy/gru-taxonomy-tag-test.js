import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

moduleForComponent('taxonomy/gru-taxonomy-tag', 'Integration | Component | taxonomy/gru taxonomy tag', {
  integration: true
});

test('it renders a taxonomy tag correctly', function(assert) {

  var taxonomyTag = TaxonomyTag.create({
    id: "term-123",
    label: "Taxonomy item text",
    isActive: false,
    isReadonly: false,
    isRemovable: false
  });
  this.set('taxonomyTag', taxonomyTag);

  this.render(hbs`{{taxonomy/gru-taxonomy-tag model=taxonomyTag}}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');
  assert.ok($component.length, 'Component');

  assert.notOk($component.hasClass('active'), 'Active class by default');
  assert.notOk($component.hasClass('read-only'), 'Read only class by default');
  assert.notOk($component.find('button.remove').length, 'Remove button by default');
  assert.ok($component.find('button.toggle').length, 'Toggle button by default');
  assert.equal($component.find('button.toggle').text(), 'Taxonomy item text', 'Tag text');

  this.set('taxonomyTag.isActive', true);
  assert.ok($component.hasClass('active'), 'Active');

  this.set('taxonomyTag.isReadonly', true);
  assert.ok($component.hasClass('read-only'), 'Read-only');
  assert.notOk($component.find('button.toggle').length, 'Toggle button -read-only');
  assert.equal($component.find('> span').text(), 'Taxonomy item text', 'Tag text -read-only');

  this.set('taxonomyTag.isRemovable', true);
  assert.ok($component.find('button.remove').length, 'Removable');
});

test('if it is not read-only, it toggles its state and calls an external action when the tag is clicked', function(assert) {
  assert.expect(3);

  var taxonomyTag = TaxonomyTag.create({
    id: "term-123",
    label: "Taxonomy item text",
    isActive: false
  });
  this.set('taxonomyTag', taxonomyTag);

  this.on('externalAction', function() {
    assert.ok(true, 'External action called');
  });

  this.render(hbs`{{taxonomy/gru-taxonomy-tag model=taxonomyTag onSelect=(action 'externalAction')}}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');

  assert.notOk($component.hasClass('active'), 'Active class');

  // Toggle tag's state
  $component.find('button.toggle').click();

  assert.ok($component.hasClass('active'), 'Active class -after toggle');
});

test('it calls an external action when its remove button is clicked', function(assert) {
  assert.expect(1);

  var taxonomyTag = TaxonomyTag.create({
    id: "term-123",
    label: "Taxonomy item text",
    isRemovable: true
  });
  this.set('taxonomyTag', taxonomyTag);

  this.on('externalAction', function() {
    assert.ok(true, 'External action called');
  });

  this.render(hbs`{{taxonomy/gru-taxonomy-tag model=taxonomyTag onRemove=(action 'externalAction')}}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');
  $component.find('button.remove').click();
});
