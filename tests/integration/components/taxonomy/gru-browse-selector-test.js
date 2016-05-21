import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';
import BrowseItem from 'gooru-web/models/taxonomy/browse-item';
import { generateBrowseTestTree } from 'gooru-web/utils/taxonomy';

moduleForComponent('taxonomy/gru-browse-selector', 'Integration | Component | taxonomy/gru browse selector', {
  integration: true
});

test("it renders the browse panels", function(assert) {

  var data = generateBrowseTestTree(1, 0, 2);
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

  var data = generateBrowseTestTree(3);
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

test("it calls an external action when clicking an item that is not in the last browse panel and navigates to that item", function(assert) {

  var data = generateBrowseTestTree(3);
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
    id: '10',
    label: 'Item : 1 : 0 : 0',
    level: 1,
    children: []
  });

  function fetchChildrenFor(node) {

    const childNode = BrowseItem.create({
      parent: node,
      id: '20',
      label: 'Item : 2 : 10 : 0',
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

  var data = generateBrowseTestTree(3);
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

  var data = generateBrowseTestTree(2, 3);
  var headers = ['Header Level 1', 'Header Level 2'];

  this.set('data', data);
  this.set('headers', headers);
  this.set('selectedPath', ['10']);  // IDs of the selected nodes

  this.render(hbs`
    {{taxonomy/gru-browse-selector
      data=data
      headers=headers
      selectedPath=selectedPath }}`);

  const $component = this.$('.taxonomy.gru-browse-selector');
  assert.equal($component.find('> ol > li').length, 2, 'Number of panel');

  const $lastPanel = $component.find('> ol > li:last-child');
  const $item = $lastPanel.find('> ul > li:first-child');

  assert.equal($lastPanel.find('> ul > li').length, 2, 'Number of items in the last panel');
  assert.ok($item.find('> ul').length, 'First item in the last panel has a sublevel');
  assert.ok($item.find('> ul > li:first-child > ul').length, 'First sublevel has a sublevel');
  assert.notOk($item.find('> ul > li:first-child > ul > li ul').length, 'More than 2 sublevels');
  assert.equal($item.find('ul').length,
    $item.find('ul.collapse').length, 'All sub levels should be collapsible by default');
  assert.notOk($item.find('ul.in').length, 'All sub levels should be collapsed by default');

  // Expand the first sublevel of the first item
  $item.find('> button').click();
  assert.ok($item.find('> ul').hasClass('in'), 'Sublevel expanded');

  // Expand the first sublevel of the sublevel
  $item.find('> ul > li:first-child > button').click();
  assert.ok($item.find('> ul > li:first-child > ul').hasClass('in'), 'Sublevel expanded -inside sublevel');

  // Collapse the first sublevel of the sublevel
  $item.find('> ul > li:first-child > button').click();
  assert.notOk($item.find('> ul > li:first-child > ul').hasClass('in'), 'Sublevel collapsed -inside sublevel');
});
