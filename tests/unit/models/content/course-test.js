import Ember from "ember";
import Unit from 'gooru-web/models/content/unit';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:content/course', 'Unit | Model | content/course', {
  unit: true
});

test('get a child unit index', function (assert) {

  var model = this.subject({
    children: Ember.A([
      Unit.create({
        id: '123',
        title: 'Unit#1'
      }),
      Unit.create({
        id: '456',
        title: 'Unit#2'
      }),
      Unit.create({
        id: '789',
        title: 'Unit#3'
      })
    ])
  });

  var unit = Unit.create({
    id: '456',
    title: 'Unit#2'
  });

  assert.equal(model.getChildUnitIndex(unit), 2, "wrong unit index");
});
