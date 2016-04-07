import { moduleFor, test } from 'ember-qunit';
import ClassModel from 'gooru-web/models/content/class';

moduleFor('serializer:content/class', 'Unit | Serializer | content/class');

test('serializeCreateClass', function(assert) {
  const serializer = this.subject();
  const classObject = ClassModel.create({
    title: 'class-title',
    classSharing: 'open'
  });
  const expected = {
    title: 'class-title',
    class_sharing: 'open'
  };
  const response = serializer.serializeCreateClass(classObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});
