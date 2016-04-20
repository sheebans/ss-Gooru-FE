import { moduleFor, test } from 'ember-qunit';
import QuestionModel from 'gooru-web/models/content/question';

moduleFor('serializer:content/question', 'Unit | Serializer | content/question');

test('serializeCreateQuestion', function(assert) {
  const serializer = this.subject();
  const questionObject = QuestionModel.create({
    title: 'question-title',
    type: 'MA'
  });
  const expected = {
    'title': 'question-title',
    content_subformat: 'multiple_answer_question', //subformat is converted at the serializer
    'visible_on_profile': true
  };
  const response = serializer.serializeCreateQuestion(questionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateQuestion', function(assert) {
  const serializer = this.subject();
  const questionObject = QuestionModel.create({
    title: 'question-title',
    //type: 'MA',
    text: 'This is the question text?',
    isVisibleOnProfile: false
  });
  const expected = {
    'title': 'question-title',
    description: 'This is the question text?',
    //content_subformat: 'multiple_answer_question', //subformat is converted at the serializer
    'visible_on_profile': false
  };
  const response = serializer.serializeUpdateQuestion(questionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeReadQuestion', function(assert) {
  const serializer = this.subject();
  const questionData = {
    id: "abcd",
    title: 'question-title',
    content_subformat: 'multiple_answer_question',
    description: 'any desc',
    publish_status: 'published',
    taxonomy: ["a", "b"]
  };

  const question = serializer.normalizeReadQuestion(questionData);
  assert.equal(question.get("id"), 'abcd', 'Wrong id');
  assert.equal(question.get("title"), 'question-title', 'Wrong title');
  assert.equal(question.get("text"), 'any desc', 'Wrong description');
  assert.equal(question.get("publishStatus"), 'published', 'Wrong publish');
  assert.equal(question.get("standards").length, 2, 'Wrong standards');
  assert.equal(question.get("type"), 'MA', 'Wrong format'); //format is converted at the normalizer
  assert.equal(question.get('isVisibleOnProfile'), true, 'Wrong format');
});
