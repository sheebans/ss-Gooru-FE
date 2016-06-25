import { moduleForComponent, test } from 'ember-qunit';
import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

moduleForComponent('taxonomy/gru-taxonomy-picker', 'Integration | Component | taxonomy/gru taxonomy picker', {
  integration: true
});

test('it renders a shortcut list of taxonomy tags, a browse selector and a list of selected taxonomy tags', function(assert) {

  var subject = TaxonomyRoot.create({
    courses: generateTaxonomyTestTree(1, null, 3)
  });
  var parent1Id = '0-100';
  var parent2Id = '0-102';
  var child1Id = '0-100-200';
  var child2Id = '0-102-220';

  var shortcuts = [
    TaxonomyTagData.create({ id: parent1Id }),
    TaxonomyTagData.create({ id: parent2Id })
  ];

  var selected = [
    TaxonomyTagData.create({ id: child1Id }),
    TaxonomyTagData.create({ id: child2Id })
  ];

  this.on('loadData', function(path) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

      if (path[0] === parent1Id) {

        assert.deepEqual(path, [parent1Id], 'Load data for first course');
        let taxonomyItem = TaxonomyItem.create({
          id: child1Id,
          level: 2
        });
        resolve([taxonomyItem]);

      } else if (path[0] === parent2Id) {

        assert.deepEqual(path, [parent2Id], 'Load data for third course');
        let taxonomyItem = TaxonomyItem.create({
          id: child2Id,
          level: 2
        });
        resolve([taxonomyItem]);

      } else {
        assert.notOk('true', 'Load data');
        reject();
      }
    });
  });

  this.set('subject', subject);
  this.set('shortcuts', shortcuts);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      browseSelectorText="Taxonomy Picker Title"
      maxLevels=2
      onSearchPath=(action 'loadData')
      panelHeaders=panelHeaders
      selected=selected
      selectedTextKey="Text for Selected Tags"
      shortcuts=shortcuts
      shortcutText="Text for Shortcut Tags"
      subject=subject }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.ok($component.length, 'Component');
  assert.equal($component.find('.shortcut-list .gru-taxonomy-tag').length, 2, 'Number of shortcut tags');
  assert.ok($component.find('.taxonomy.gru-browse-selector').length, 'Browse selector');

  return wait().then(function () {
    assert.equal($component.find('.selected-list .gru-taxonomy-tag').length, 2, 'Number of selected tags');
  });
});

test('it opens the browse selector to the location of the first selected tag by default', function(assert) {

  var subject = TaxonomyRoot.create({
    courses: generateTaxonomyTestTree(1, null, 3)
  });
  var parent1Id = '0-100';
  var parent2Id = '0-102';
  var childA = '0-100-200';
  var childB = '0-102-220';

  var shortcuts = [];
  var selected = [
    TaxonomyTagData.create({ id: childB }),
    TaxonomyTagData.create({ id: childA })
  ];

  this.on('loadData', function(path) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

      if (path[0] === parent1Id) {

        assert.deepEqual(path, [parent1Id], 'Load data for first course');
        let taxonomyItem = TaxonomyItem.create({
          id: childA,
          title: 'Item : 2 : 0 : 0',
          level: 2
        });
        resolve([taxonomyItem]);

      } else if (path[0] === parent2Id) {

        assert.deepEqual(path, [parent2Id], 'Load data for third course');
        let taxonomyItem = TaxonomyItem.create({
          id: childB,
          title: 'Item : 2 : 2 : 0',
          level: 2
        });
        resolve([taxonomyItem]);

      } else {
        assert.notOk('true', 'Load data');
        reject();
      }
    });
  });

  this.set('subject', subject);
  this.set('shortcuts', shortcuts);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      browseSelectorText="Taxonomy Picker Title"
      maxLevels=2
      onSearchPath=(action 'loadData')
      panelHeaders=panelHeaders
      selected=selected
      selectedTextKey="Text for Selected Tags"
      shortcuts=shortcuts
      shortcutText="Text for Shortcut Tags"
      subject=subject }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.equal($component.find('.selected-list .gru-taxonomy-tag').length, 2, 'Number of selected tags');

  return wait().then(function () {
    var $browseSelector = $component.find('.taxonomy.gru-browse-selector');
    assert.equal($browseSelector.find('ul.browse-panel.level-2 > li').length, 1, 'Number of items in the last panel');
    assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > label > div > strong').text(), 'Item : 2 : 2 : 0', 'First item -last panel');
  });
});

test('it opens the browse selector to a specific location after clicking on a shortcut tag', function(assert) {

  var subject = TaxonomyRoot.create({
    courses: generateTaxonomyTestTree(1, null, 3)
  });
  var parent1Id = '0-100';
  var parent2Id = '0-102';
  var childA = '0-100-200';
  var childB = '0-102-220';

  var shortcuts = [
    TaxonomyTagData.create({ id: parent1Id }),
    TaxonomyTagData.create({ id: parent2Id })
  ];

  var selected = [];

  this.on('loadData', function(path) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

      if (path[0] === parent1Id) {

        assert.deepEqual(path, [parent1Id], 'Load data for first course');
        let taxonomyItem = TaxonomyItem.create({
          id: childA,
          title: 'Item : 2 : 0 : 0',
          level: 2
        });
        resolve([taxonomyItem]);

      } else if (path[0] === parent2Id) {

        assert.deepEqual(path, [parent2Id], 'Load data for third course');
        let taxonomyItem = TaxonomyItem.create({
          id: childB,
          title: 'Item : 2 : 2 : 0',
          level: 2
        });
        resolve([taxonomyItem]);

      } else {
        assert.notOk('true', 'Load data');
        reject();
      }
    });
  });

  this.set('subject', subject);
  this.set('shortcuts', shortcuts);
  this.set('selected', selected);
  this.set('panelHeaders', ['Level 1', 'Level 2']);

  this.render(hbs`{{
    taxonomy/gru-taxonomy-picker
      browseSelectorText="Taxonomy Picker Title"
      maxLevels=2
      onSearchPath=(action 'loadData')
      panelHeaders=panelHeaders
      selected=selected
      selectedTextKey="Text for Selected Tags"
      shortcuts=shortcuts
      shortcutText="Text for Shortcut Tags"
      subject=subject }}`);

  const $component = this.$('.taxonomy.gru-taxonomy-picker');
  assert.ok($component.length, 'Component');

  var $browseSelector = $component.find('.taxonomy.gru-browse-selector');
  var $shortcutTags = $component.find('.shortcut-list');

  assert.equal($browseSelector.find('ul.browse-panel.level-2 > li').length, 0, 'Number of items in the last panel');
  assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 0, 'No shortcuts active by default');

  // Click on shortcut #1
  $shortcutTags.find('li:eq(0) .gru-taxonomy-tag .toggle').click();

  return wait().then(function () {
    assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 1, 'One shortcut active at a time');
    assert.ok($shortcutTags.find('li:eq(0) .gru-taxonomy-tag').hasClass('active'), 'Active class on selected shortcut');
    assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > label > div > strong').text(), 'Item : 2 : 0 : 0', 'Last panel item -first shortcut');

    // Click on shortcut #2
    $shortcutTags.find('li:eq(1) .gru-taxonomy-tag .toggle').click();
    return wait().then(function () {
      assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 1, 'One shortcut active at a time');
      assert.ok($shortcutTags.find('li:eq(1) .gru-taxonomy-tag').hasClass('active'), 'Active class on selected shortcut');
      assert.equal($browseSelector.find('ul.browse-panel.level-2 > li:first-child > label > div > strong').text(), 'Item : 2 : 2 : 0', 'Last panel item -second shortcut');

      // Click on item in the browse selector
      $browseSelector.find('ul.browse-panel.level-1 > li:first-child > a').click();
      assert.equal($shortcutTags.find('li .gru-taxonomy-tag.active').length, 0, 'No shortcuts active');
    });
  });
});

/*
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
