import { moduleFor, test } from 'ember-qunit';
import UnitModel from 'gooru-web/models/content/unit';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

moduleFor('serializer:content/unit', 'Unit | Serializer | content/unit');

test('serializeCreateUnit', function (assert) {
  const serializer = this.subject();

  const modelInstance = UnitModel.create({
    bigIdeas: 'Big ideas text',
    children: [],
    essentialQuestions: 'Essential Questions text',
    id: 'unit-id-123',
    lessonsTotal: 0,
    sequence: 1,
    title: 'Unit Title'
  });

  const expected = {
    title: modelInstance.get('title'),
    big_ideas: modelInstance.get('bigIdeas'),
    essential_questions: modelInstance.get('essentialQuestions'),
    taxonomy: [],
    creator_system: CREATOR_SYSTEM
  };

  const modelObject = serializer.serializeCreateUnit(modelInstance);
  assert.deepEqual(modelObject, expected, 'Serializer response');
});
