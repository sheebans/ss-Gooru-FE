import { moduleFor, test } from 'ember-qunit';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

moduleFor('model:taxonomy/taxonomy-item', 'Unit | Model | taxonomy/taxonomy-item', {
  unit: true
});

test('getPath with no ancestors', function (assert) {

  var model = this.subject({
    id: 'ti-1',
    level: 1,
    parent: null
  });

  assert.deepEqual(model.getPath(), ['ti-1'], "path");
});

test('getPath with ancestors', function (assert) {

  var model = this.subject({
    id: 'ti-3',
    level: 3,
    parent: TaxonomyItem.create({
      id: 'ti-2',
      level: 2,
      parent: TaxonomyItem.create({
        id: 'ti-1',
        level: 1,
        parent: null
      })
    })
  });

  assert.deepEqual(model.getPath(), ['ti-1', 'ti-2', 'ti-3'], "path");
});

test('find', function (assert) {

  var child3BA = TaxonomyItem.create({
    id: 'ti-3BA',
    children: []
  });

  var child2A = TaxonomyItem.create({
    id: 'ti-2A',
    children: []
  });

  var child2B = TaxonomyItem.create({
    id: 'ti-2B',
    children: [
      child3BA
    ]
  });

  var model = this.subject({
    id: 'ti-1A',
    children: [
      child2A,
      child2B
    ]
  });

  assert.equal(model.find(undefined), null, "no result -undefined");
  assert.equal(model.find(undefined), null, "no result -null");
  assert.equal(model.find([]), null, "no result -empty array");
  assert.equal(model.find(['ti-1A']), model, "result -level 1");
  assert.equal(model.find(['ti-1B']), null, "no result -level 1");
  assert.equal(model.find(['ti-1A', 'ti-2A']), child2A, "result -level 2 A");
  assert.equal(model.find(['ti-1A', 'ti-2B']), child2B, "result -level 2 B");
  assert.equal(model.find(['ti-1A', 'ti-2A', 'ti-3AA']), null, "no result -level 3");
  assert.equal(model.find(['ti-1A', 'ti-2B', 'ti-3BA']), child3BA, "result -level 3");
});

