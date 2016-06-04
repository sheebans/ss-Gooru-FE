import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';

moduleForComponent('taxonomy/gru-taxonomy-picker', 'Integration | Component | taxonomy/gru taxonomy picker', {
  integration: true
});

/*
 TODO for David to check
test('it renders a shortcut list of taxonomy tags, a browse selector and a list of selected taxonomy tags', function(assert) {

  var shortcuts = [];
  var selected = [];
  var taxonomyItems = generateTaxonomyTestTree(3);
  var root = taxonomyItems[0];

  shortcuts.push(root.find(['100', '200']));
  shortcuts.push(root.find(['100', '201']));

  selected.push(root.find(['100', '200', '301']));
  selected.push(root.find(['100', '200', '302']));
  selected.push(root.find(['100', '201', '310']));

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      selected=selected
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.ok($component.length, 'Component');

  assert.equal($component.find('.shortcut-list li').length, 2, 'Number of shortcut tags');
  assert.ok($component.find('.taxonomy.gru-browse-selector').length, 'Browse selector');
  assert.equal($component.find('.selected-list li').length, 3, 'Number of selected tags');
});

test('it opens the browse selector to the location of the first shortcut tag by default', function(assert) {

  var taxonomyItems = generateTaxonomyTestTree(3);
  var root = taxonomyItems[0];

  var shortcuts = [
    root.find(['100', '201']),
    root.find(['100', '200'])
  ];

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.equal($component.find('.shortcut-list li').length, 2, 'Number of shortcut tags');
  assert.ok($component.find('.shortcut-list li:eq(0) .gru-taxonomy-tag').hasClass('active'), 'First shortcut tag is active');
  assert.notOk($component.find('.shortcut-list li:eq(1) .gru-taxonomy-tag').hasClass('active'), 'Second shortcut tag is not active');

  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li').length, 3, 'Number of items in the last panel');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li:first-child > label > div > strong').text(), 'Item : 3 : 1 : 0', 'First item -last panel');
});

test('it opens the browse selector to a specific location after clicking on a shortcut tag', function(assert) {

  var taxonomyItems = generateTaxonomyTestTree(3, null, 2);
  var root1 = taxonomyItems[0];
  var root2 = taxonomyItems[1];

  var shortcuts = [
    root1.find(['100', '200']),
    root2.find(['101']),
    root1.find(['100', '201']),
    root2.find(['101', '212'])
  ];

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  var $shortcutTags = $component.find('.shortcut-list');
  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');

  assert.equal($component.find('.shortcut-list li').length, 4, 'Number of shortcut tags');
  assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').text(), 'Item : 2 : 0 : 0', 'First item -second panel');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li:first-child > label > div > strong').text(), 'Item : 3 : 0 : 0', 'First item -last panel');

  // Click on shortcut #2
  $shortcutTags.find('li:eq(1) .gru-taxonomy-tag .toggle').click();
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 1, 'One shortcut active at a time');
  assert.ok($shortcutTags.find('li:eq(1) .gru-taxonomy-tag').hasClass('active'), 'Active class on selected shortcut');

  assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').text(), 'Item : 2 : 1 : 0', 'First item -second panel, shortcut #2 clicked');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li').length, 0, 'No items -last panel, shortcut #2 clicked');

  // Click on shortcut #3
  $shortcutTags.find('li:eq(2) .gru-taxonomy-tag .toggle').click();
  assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').text(), 'Item : 2 : 0 : 0', 'First item -second panel, shortcut #3 clicked');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li:first-child > label > div > strong').text(), 'Item : 3 : 1 : 0', 'First item -last panel, shortcut #3 clicked');

  // Click on shortcut #4
  $shortcutTags.find('li:eq(3) .gru-taxonomy-tag .toggle').click();
  assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').text(), 'Item : 2 : 1 : 0', 'First item -second panel, shortcut #4 clicked');
  assert.equal($browseSelector.find('ul.browse-panel.level-3 > li:first-child > label > div > strong').text(), 'Item : 3 : 2 : 0', 'First item -last panel, shortcut #4 clicked');
});

test('it clears any active shortcuts after clicking on a browse selector item', function(assert) {

  var taxonomyItems = generateTaxonomyTestTree(3);
  var root = taxonomyItems[0];

  var shortcuts = [
    root.find(['100', '200']),
    root.find(['100', '201'])
  ];

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  var $shortcutTags = $component.find('.shortcut-list');
  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');

  assert.equal($component.find('.shortcut-list li').length, 2, 'Number of shortcut tags');
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 1, 'Number of active shortcuts by default');

  // Click on item in the browse selector
  $browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').click();
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 0, 'No shortcuts active');

  // Click on second shortcut
  $shortcutTags.find('li:eq(1) .gru-taxonomy-tag .toggle').click();
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 1, 'Number of active shortcuts');
  assert.ok($shortcutTags.find('li:eq(1) .gru-taxonomy-tag').hasClass('active'), 'Second shortcut is active');

  // Click on item in the browse selector
  $browseSelector.find('ul.browse-panel.level-2 > li:first-child > a').click();
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 0, 'No shortcuts active');
});

test('it adds/removes a tag from the selected tags after it has been checked/unchecked in the browse selector', function(assert) {

  var taxonomyItems = generateTaxonomyTestTree(3);
  var root = taxonomyItems[0];

  var shortcuts = [
    root.find(['100', '200']),
    root.find(['100', '201'])
  ];

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  var $shortcutTags = $component.find('.shortcut-list');
  var $selectedTags = $component.find('.selected-list');
  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');

  assert.equal($selectedTags.find('li').length, 0, 'Number of selected tags');

  // Check items
  $browseSelector.find('ul.level-3 > li:eq(0) > label > input').click();
  $browseSelector.find('ul.level-3 > li:eq(2) > label > input').click();
  assert.equal($selectedTags.find('li').length, 2, 'Number of selected tags -2 checked');

  // Uncheck item
  $browseSelector.find('ul.level-3 > li:eq(0) > label > input').click();
  assert.equal($selectedTags.find('li').length, 1, 'Number of selected tags -1 checked');

  // Check item from another level (second selected tag)
  $shortcutTags.find('li:eq(1) .gru-taxonomy-tag .toggle').click();
  $browseSelector.find('ul.level-3 > li:eq(1) > label > input').click();
  assert.equal($selectedTags.find('li').length, 2, 'Number of selected tags -2 checked (mixed)');
  assert.equal($selectedTags.find('li:eq(0) .gru-taxonomy-tag > span').text(), 'Item : 3 : 0 : 2', 'First selected tag text');
  assert.equal($selectedTags.find('li:eq(1) .gru-taxonomy-tag > span').text(), 'Item : 3 : 1 : 1', 'Second selected tag text');
});

test('it unchecks a tag in the browse selector after its tags are removed from the selected tags', function(assert) {

  var taxonomyItems = generateTaxonomyTestTree(3);
  var root = taxonomyItems[0];

  var shortcuts = [
    root.find(['100', '200']),
    root.find(['100', '201'])
  ];

  var selected = [
    root.find(['100', '200', '301']),
    root.find(['100', '200', '302']),
    root.find(['100', '201', '310'])
  ];

  this.set('taxonomyItems', taxonomyItems);
  this.set('shortcuts', shortcuts);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2', 'Level 3']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      shortcuts=shortcuts
      selected=selected
      panelHeaders=panelHeaders }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  var $shortcutTags = $component.find('.shortcut-list');
  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');
  var $selectedTags = $component.find('.selected-list');

  assert.equal($selectedTags.find('li').length, 3, 'Number of selected tags');
  assert.equal($selectedTags.find('li:eq(0) .gru-taxonomy-tag > span').text(), 'Item : 3 : 0 : 1', 'First selected tag text');
  assert.equal($selectedTags.find('li:eq(1) .gru-taxonomy-tag > span').text(), 'Item : 3 : 0 : 2', 'Second selected tag text');
  assert.equal($selectedTags.find('li:eq(2) .gru-taxonomy-tag > span').text(), 'Item : 3 : 1 : 0', 'Third selected tag text');
  assert.equal($browseSelector.find('ul.level-3 > li > label > input[type="checkbox"]:checked').length, 2, 'Items checked for sub-level 1');

  // Remove all selected tags
  $selectedTags.find('li:eq(0) .gru-taxonomy-tag > button.remove').click();
  assert.equal($browseSelector.find('ul.level-3 > li > label > input[type="checkbox"]:checked').length, 1, 'Items checked for sub-level 1 -one unchecked');

  $selectedTags.find('li:eq(0) .gru-taxonomy-tag > button.remove').click();
  assert.equal($browseSelector.find('ul.level-3 > li > label > input[type="checkbox"]:checked').length, 0, 'Items checked for sub-level 1 -two unchecked');

  $shortcutTags.find('li:eq(1) .gru-taxonomy-tag .toggle').click();
  assert.equal($browseSelector.find('ul.level-3 > li > label > input[type="checkbox"]:checked').length, 1, 'Items checked for sub-level 2');

  $selectedTags.find('li:eq(0) .gru-taxonomy-tag > button.remove').click();
  assert.equal($browseSelector.find('ul.level-3 > li > label > input[type="checkbox"]:checked').length, 0, 'Items checked for sub-level 2 -one unchecked');
  assert.equal($selectedTags.find('li').length, 0, 'Number of selected tags -after removing them');
});

test('it calls an external action when the save button is clicked', function(assert) {
  var selected = [];
  var taxonomyItems = generateTaxonomyTestTree(2);
  var root = taxonomyItems[0];

  selected.push(root.find(['100', '200']));
  selected.push(root.find(['100', '201']));

  this.set('taxonomyItems', taxonomyItems);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2']);

  this.on('externalAction', function(selectedTags) {
    assert.ok(true, 'External action called');
    assert.ok(selected, selectedTags, 'External action receives list of selected tags as parameter');
  });

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      taxonomyItems=taxonomyItems
      selected=selected
      panelHeaders=panelHeaders
      onSave=(action 'externalAction')}}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.ok($component.length, 'Component');

  assert.ok($component.find('.actions .cancel').length, 'Cancel button');
  assert.ok($component.find('.actions .save').length, 'Save button');

  $component.find('.actions .save').click();
});
*/
