import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

moduleForComponent('taxonomy/gru-taxonomy-tag', 'Integration | Component | taxonomy/gru taxonomy tag', {
  integration: true
});

test('it renders a taxonomy tag correctly', function(assert) {

  var taxonomyItem = TaxonomyItem.create({
    id: "term-123",
    label: "Taxonomy item text"
  });
  this.set('taxonomyItem', taxonomyItem);
  this.set('isActive', false);
  this.set('isReadonly', false);
  this.set('isRemovable', false);
  this.render(hbs`{{
    taxonomy/gru-taxonomy-tag
      model=taxonomyItem
      isActive=isActive
      isReadonly=isReadonly
      isRemovable=isRemovable
  }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');
  assert.ok($component.length, 'Component');

  assert.notOk($component.hasClass('active'), 'Active class by default');
  assert.notOk($component.hasClass('read-only'), 'Read only class by default');
  assert.notOk($component.find('button.remove').length, 'Remove button by default');
  assert.ok($component.find('button.toggle').length, 'Toggle button by default');
  assert.equal($component.find('button.toggle').text(), 'Taxonomy item text', 'Tag text');

  this.set('isActive', true);
  assert.ok($component.hasClass('active'), 'Active');

  this.set('isReadonly', true);
  assert.ok($component.hasClass('read-only'), 'Read-only');
  assert.notOk($component.find('button.toggle').length, 'Toggle button -read-only');
  assert.equal($component.find('> span').text(), 'Taxonomy item text', 'Tag text -read-only');

  this.set('isRemovable', true);
  assert.ok($component.find('button.remove').length, 'Removable');
});

test('if it is not read-only, it toggles its state and calls an external action when the tag is clicked', function(assert) {
  assert.expect(3);

  var taxonomyItem = TaxonomyItem.create({
    id: "term-123",
    label: "Taxonomy item text"
  });
  this.set('taxonomyItem', taxonomyItem);

  this.on('externalAction', function() {
    assert.ok(true, 'External action called');
  });

  this.render(hbs`{{taxonomy/gru-taxonomy-tag
      model=taxonomyItem
      isActive=false
      onSelect=(action 'externalAction')
  }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');

  assert.notOk($component.hasClass('active'), 'Active class');

  // Toggle tag's state
  $component.find('button.toggle').click();

  assert.ok($component.hasClass('active'), 'Active class -after toggle');
});

test('it calls an external action when its remove button is clicked', function(assert) {
  assert.expect(1);

  var taxonomyItem = TaxonomyItem.create({
    id: "term-123",
    label: "Taxonomy item text"
  });
  this.set('taxonomyItem', taxonomyItem);

  this.on('externalAction', function() {
    assert.ok(true, 'External action called');
  });

  this.render(hbs`{{taxonomy/gru-taxonomy-tag
      model=taxonomyItem
      isRemovable=true
      onRemove=(action 'externalAction')
  }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-tag');
  $component.find('button.remove').click();
});
