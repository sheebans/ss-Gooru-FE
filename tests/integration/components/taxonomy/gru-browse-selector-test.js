import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';
import BrowseItem from 'gooru-web/models/taxonomy/browse-item';

moduleForComponent('taxonomy/gru-browse-selector', 'Integration | Component | taxonomy/gru browse selector', {
  integration: true
});

/**
 * Generates a tree data structure for testing the browse selector
 * @param {Number} levels - total number of parent/children levels in the tree
 * @param {Number} lastLevels - number of sub-levels in the last level of the tree
 * @param {BrowseItem} parent - parent item for all the items created in the current level or sub-level
 * @param {Number} inc - number by which the number of items in each level will increase
 * @param {Number} currentLevel - current tree level or sub-level being built (starts at 1)
 * @return {BrowseItem[][] ...} - the list of browse items in the first level
 */
function generateTestTree(levels = 1, lastLevels = 0, parent = null, inc = 1, currentLevel = 1) {
  var totalItems = currentLevel * inc;
  var items = [];

  if (currentLevel <= levels + lastLevels) {

    for (let i = 0; i < totalItems; i++) {
      let parentId = (parent) ? parent.get('item.id') : 0;

      let taxonomyItem = TaxonomyItem.create({
        id: '' + currentLevel + i,
        label: 'Item : ' + currentLevel + ' : ' + parentId + ' : ' + i
      });

      let browseItem = BrowseItem.create({
        parent: parent,
        item: taxonomyItem,
        level: currentLevel
      });

      generateTestTree(levels, lastLevels, browseItem, inc, currentLevel + 1);
      items.push(browseItem);
    }

    if (parent) {
      // Link all items to parent
      parent.set('children', items);
    }

    return items;
  }
}

test("it renders the browse panels", function(assert) {

  var data = generateTestTree(1, 0, null, 2);
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);
  this.render(hbs`{{taxonomy/gru-browse-selector data=data headers=headers}}`);

  const $component = this.$('.taxonomy.gru-browse-selector');
  assert.ok($component.length, 'Component');
  assert.equal($component.find('> ol > li').length, 3, 'Number of browse panels');

  $component.find('> ol > li').each(function(index) {
    var $this = $(this);
    var level = index + 1;

    assert.equal($this.find('> strong').text(), headers[index], 'Panel title ' + level);
    assert.ok($this.find('> ul').hasClass('browse-panel'), 'Panel browse class ' + level);
    assert.ok($this.find('> ul').hasClass('level-' + (index + 1)), 'Panel level class ' + level);

    if (index === 0) {
      assert.equal($this.find('> ul > li').length, 2, 'Number of items in level ' + level);
    } else {
      assert.equal($this.find('> ul > li').length, 0, 'Number of items in level ' + level);
    }
  });

});

test("it can populate the the browse panels per a specific item path", function(assert) {

  var data = generateTestTree(3);
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);
  this.set('selectedPath', ['10', '20', '30']);  // IDs of the selected nodes
  this.render(hbs`{{taxonomy/gru-browse-selector data=data headers=headers selectedPath=selectedPath}}`);

  const $component = this.$('.taxonomy.gru-browse-selector');
  assert.equal($component.find('> ol > li').length, 3, 'Number of browse panels');

  $component.find('> ol > li').each(function(index) {
    assert.equal($(this).find('> ul > li').length, index + 1, 'Number of items in level ' + (index + 1));

    if (index === 2) {
      assert.equal($(this).find('> ul > li:first-child > label > span').text(), 'Item : 3 : 20 : 0', 'Correct item label');
    }
  });
});

test("it calls an external deferred action when clicking an item that is not in the last browse panel and navigates to that item", function(assert) {

  var data = generateTestTree(3);
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);
  this.set('selectedPath', ['10', '20', '30']);  // IDs of the selected nodes

  this.on('externalAction', function() {
    assert.ok('true', 'External action called');
  });

  this.render(hbs`
    {{taxonomy/gru-browse-selector
      data=data
      headers=headers
      selectedPath=selectedPath
      onSelectItem=(action 'externalAction') }}`);

  const $component = this.$('.taxonomy.gru-browse-selector');

  assert.equal($component.find('> ol > li:last-child > ul > li:first-child span').text(), 'Item : 3 : 20 : 0', 'Label of first item in the last panel');

  // Click on the second item in the second panel
  $component.find('> ol > li:eq(1) a:eq(1)').click();

  assert.equal($component.find('> ol > li:last-child > ul > li:first-child span').text(), 'Item : 3 : 21 : 0', 'Label of first item in the last panel after click');
});

test("it loads sub-level items async", function(assert) {

  const rootItem = BrowseItem.create({
    parent: null,
    item: TaxonomyItem.create({
      id: '10',
      label: 'Item : 1 : 0 : 0'
    }),
    level: 1,
    children: []
  });

  function fetchChildrenFor(node) {

    const childNode = BrowseItem.create({
      parent: node,
      item: TaxonomyItem.create({
        id: '20',
        label: 'Item : 2 : 10 : 0'
      }),
      level: 2
    });

    assert.ok('true', 'Async action called');
    return Ember.RSVP.resolve([ childNode ]);
  }

  var data = [ rootItem ];
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);

  this.on('externalAction', function() {
    // Load child into rootItem asynchronously
    fetchChildrenFor(rootItem).then(function(childrenList) {
      rootItem.set('children', childrenList);
    });
  });

  this.render(hbs`{{taxonomy/gru-browse-selector data=data headers=headers onSelectItem=(action 'externalAction')}}`);

  const $component = this.$('.taxonomy.gru-browse-selector');
  assert.ok($component.length, 'Component');

  assert.equal($component.find('> ol > li:eq(0) > ul > li').length, 1, 'Number of items in level 1');
  assert.equal($component.find('> ol > li:eq(1) > ul > li').length, 0, 'Number of items in level 2');

  // Click on the root item
  $component.find('> ol > li:eq(0) a:eq(0)').click();

  return wait().then(function () {
    assert.equal($component.find('> ol > li:eq(0) > ul > li').length, 1, 'Number of items in level 1 -after clicking on root item');
    assert.equal($component.find('> ol > li:eq(1) > ul > li').length, 1, 'Number of items in level 2 -after clicking on root item');
  });
});

test("it keeps track of checked items", function(assert) {

  var data = generateTestTree(3);
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);
  this.set('selectedPath', ['10', '20', '30']);  // IDs of the selected nodes

  this.render(hbs`
    {{taxonomy/gru-browse-selector
      data=data
      headers=headers
      selectedPath=selectedPath }}`);

  const $component = this.$('.taxonomy.gru-browse-selector');
  const $firstPanel = $component.find('> ol > li:eq(0) > ul');
  const $secondPanel = $component.find('> ol > li:eq(1) > ul');
  const $lastPanel = $component.find('> ol > li:eq(2) > ul');

  assert.equal($lastPanel.find('> li').length, 3, 'Number of items in the last panel');
  assert.equal($lastPanel.find('> li input[type="checkbox"]:checked').length, 0, 'Number of checked items');

  // Check the first two items
  $lastPanel.find('> li input:eq(0)').click();
  $lastPanel.find('> li input:eq(1)').click();

  assert.equal($lastPanel.find('> li input[type="checkbox"]:checked').length, 2, 'Number of checked items -after checking two');
  assert.ok($firstPanel.find('> li:first-child').hasClass('selected'), 'Parent selected?');
  assert.ok($secondPanel.find('> li:first-child').hasClass('selected'), 'Grand parent selected?');

  // Uncheck the first item
  $lastPanel.find('> li input:eq(0)').click();
  assert.equal($lastPanel.find('> li input[type="checkbox"]:checked').length, 1, 'Number of checked items -after unchecking one');
  assert.ok($firstPanel.find('> li:first-child').hasClass('selected'), 'Parent selected? -after unchecking one');
  assert.ok($secondPanel.find('> li:first-child').hasClass('selected'), 'Grand parent selected? -after unchecking one');

  // Uncheck the other item
  $lastPanel.find('> li input:eq(1)').click();
  assert.equal($lastPanel.find('> li input[type="checkbox"]:checked').length, 0, 'Number of checked items -after unchecking the other');
  assert.notOk($firstPanel.find('> li:first-child').hasClass('selected'), 'Parent selected? -after unchecking the other');
  assert.notOk($secondPanel.find('> li:first-child').hasClass('selected'), 'Grand parent selected? -after unchecking the other');
});

test("it displays exceeding levels of data as accordions in the last browse panel", function(assert) {

  var data = generateTestTree(3);
  var headers = ['Header Level 1', 'Header Level 2', 'Header Level 3'];

  this.set('data', data);
  this.set('headers', headers);
  this.set('selectedPath', ['10', '20', '30']);  // IDs of the selected nodes

  this.render(hbs`
    {{taxonomy/gru-browse-selector
      data=data
      headers=headers
      selectedPath=selectedPath }}`);

  const $component = this.$('.taxonomy.gru-browse-selector');

  assert.expect(0);
});
