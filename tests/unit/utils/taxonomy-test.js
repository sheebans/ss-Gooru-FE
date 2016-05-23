import { module, test } from 'qunit';
import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

module('Unit | Utility | taxonomy');

test('Create taxonomy test tree: one node', function (assert) {

  var tree = generateTaxonomyTestTree();

  var result = TaxonomyItem.create({
    id: '10',
    label: 'Item : 1 : 0 : 0',
    level: 1,
    parent: null
  });

  assert.deepEqual(tree, [result], 'One node');
});

test('Create taxonomy test tree: one node with 2 children', function (assert) {

  var tree = generateTaxonomyTestTree(2);

  var parent = TaxonomyItem.create({
    id: '10',
    label: 'Item : 1 : 0 : 0',
    level: 1,
    parent: null
  });

  var children = [
    TaxonomyItem.create({
      id: '20',
      label: 'Item : 2 : 10 : 0',
      level: 2
    }),
    TaxonomyItem.create({
      id: '21',
      label: 'Item : 2 : 10 : 1',
      level: 2
    })
  ];

  // Set up references
  parent.set('children', children);
  children[0].set('parent', parent);
  children[1].set('parent', parent);

  assert.deepEqual(tree, [parent], 'One node with 2 children');
});

test('Create taxonomy test tree: one node, 2 children, 3 grandchildren (per child)', function (assert) {

  var tree = generateTaxonomyTestTree(3);

  var parent = TaxonomyItem.create({
    id: '10',
    label: 'Item : 1 : 0 : 0',
    level: 1,
    parent: null
  });

  var children = [
    TaxonomyItem.create({
      id: '20',
      label: 'Item : 2 : 10 : 0',
      level: 2
    }),
    TaxonomyItem.create({
      id: '21',
      label: 'Item : 2 : 10 : 1',
      level: 2
    })
  ];

  var children2A = [
    TaxonomyItem.create({
      id: '30',
      label: 'Item : 3 : 20 : 0',
      level: 3
    }),
    TaxonomyItem.create({
      id: '31',
      label: 'Item : 3 : 20 : 1',
      level: 3
    }),
    TaxonomyItem.create({
      id: '32',
      label: 'Item : 3 : 20 : 2',
      level: 3
    })
  ];

  var children2B = [
    TaxonomyItem.create({
      id: '30',
      label: 'Item : 3 : 21 : 0',
      level: 3
    }),
    TaxonomyItem.create({
      id: '31',
      label: 'Item : 3 : 21 : 1',
      level: 3
    }),
    TaxonomyItem.create({
      id: '32',
      label: 'Item : 3 : 21 : 2',
      level: 3
    })
  ];

  // Set up references
  parent.set('children', children);
  children[0].set('parent', parent);
  children[1].set('parent', parent);

  children[0].set('children', children2A);
  children2A[0].set('parent', children[0]);
  children2A[1].set('parent', children[0]);
  children2A[2].set('parent', children[0]);

  children[1].set('children', children2B);
  children2B[0].set('parent', children[1]);
  children2B[1].set('parent', children[1]);
  children2B[2].set('parent', children[1]);

  assert.deepEqual(tree, [parent], 'One node, 2 children, 3 grandchildren (per child)');
});

test('Create taxonomy test tree: two nodes with 4 children each', function (assert) {

  var tree = generateTaxonomyTestTree(2, null, 2);

  var parent1 = TaxonomyItem.create({
    id: '10',
    label: 'Item : 1 : 0 : 0',
    level: 1,
    parent: null
  });

  var parent2 = TaxonomyItem.create({
    id: '11',
    label: 'Item : 1 : 0 : 1',
    level: 1,
    parent: null
  });

  var children1 = [
    TaxonomyItem.create({
      id: '20',
      label: 'Item : 2 : 10 : 0',
      level: 2
    }),
    TaxonomyItem.create({
      id: '21',
      label: 'Item : 2 : 10 : 1',
      level: 2
    }),
    TaxonomyItem.create({
      id: '22',
      label: 'Item : 2 : 10 : 2',
      level: 2
    }),
    TaxonomyItem.create({
      id: '23',
      label: 'Item : 2 : 10 : 3',
      level: 2
    })
  ];

  var children2 = [
    TaxonomyItem.create({
      id: '20',
      label: 'Item : 2 : 11 : 0',
      level: 2
    }),
    TaxonomyItem.create({
      id: '21',
      label: 'Item : 2 : 11 : 1',
      level: 2
    }),
    TaxonomyItem.create({
      id: '22',
      label: 'Item : 2 : 11 : 2',
      level: 2
    }),
    TaxonomyItem.create({
      id: '23',
      label: 'Item : 2 : 11 : 3',
      level: 2
    })
  ];

  // Set up references
  parent1.set('children', children1);
  parent2.set('children', children2);

  children1[0].set('parent', parent1);
  children1[1].set('parent', parent1);
  children1[2].set('parent', parent1);
  children1[3].set('parent', parent1);

  children2[0].set('parent', parent2);
  children2[1].set('parent', parent2);
  children2[2].set('parent', parent2);
  children2[3].set('parent', parent2);

  assert.deepEqual(tree, [parent1, parent2], 'Two nodes with 4 children each');
});
