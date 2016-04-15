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
    'short_title': 'question-title',
    content_subformat: 'multiple_answer_question' //subformat is converted at the serializer
  };
  const response = serializer.serializeCreateQuestion(questionObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateQuestion', function(assert) {
  const serializer = this.subject();
  const questionObject = QuestionModel.create({
    title: 'question-title',
    type: 'MA',
    text: 'This is the question text?'
  });
  const expected = {
    'short_title': 'question-title',
    title: 'This is the question text?',
    content_subformat: 'multiple_answer_question' //subformat is converted at the serializer
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
  assert.equal('abcd', question.get("id"), 'Wrong id');
  assert.equal('question-title', question.get("title"), 'Wrong title');
  assert.equal('any desc', question.get("description"), 'Wrong description');
  assert.equal('published', question.get("publishStatus"), 'Wrong publish');
  assert.equal(2, question.get("standards").length, 'Wrong standards');
  assert.equal('MA', question.get("type"), 'Wrong format'); //format is converted at the normalizer
});
