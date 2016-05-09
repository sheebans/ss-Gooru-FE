import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import QuestionModel from 'gooru-web/models/content/question';
import AnswerModel from 'gooru-web/models/content/answer';

moduleFor('serializer:content/question', 'Unit | Serializer | content/question');

test('serializeCreateQuestion', function(assert) {
  const serializer = this.subject();
  const questionObject = QuestionModel.create({
    title: 'question-title',
    description: 'question-desc',
    type: 'MA'
  });
  const response = serializer.serializeCreateQuestion(questionObject);
  assert.equal(response["title"], "question-title", "Wrong title");
  assert.equal(response["description"], "question-desc", "Wrong description");
  assert.equal(response["content_subformat"], "multiple_answer_question", "Wrong sub format");
  assert.equal(response["visible_on_profile"], true, "Wrong visible on profile");
});

test('serializeUpdateQuestion', function(assert) {
  const serializer = this.subject();
  const question = QuestionModel.create({
    title: 'Question title',
    //type: 'MA',
    text: 'This is the question text?',
    isVisibleOnProfile: false,
    answers: Ember.A([
      AnswerModel.create({
        sequence: 1,
        isCorrect: false,
        text: 'Answer #1 text',
        type: 'text'
      }),
      AnswerModel.create({
          sequence: 2,
          isCorrect: true,
          text: 'Answer #2 text',
          type: 'text'
      }),
      AnswerModel.create({
        sequence: 3,
        isCorrect: false,
        text: 'Answer #3 text',
        type: 'text'
      })
    ])
  });
  const response = serializer.serializeUpdateQuestion(question);

  assert.equal(response.title, 'Question title', 'Wrong title');
  assert.equal(response.description, 'This is the question text?', 'Wrong description');
  assert.equal(response['visible_on_profile'], false, 'Wrong visible_on_profile');
  assert.equal(response.answer.length, 3, 'Wrong answer array length');
});

test('serializeAnswer', function(assert) {
  const serializer = this.subject();
  const answer = AnswerModel.create({
    isCorrect: true,
    text: 'Answer #1 text',
    type: 'text'
  });
  const response = serializer.serializerAnswer(answer, 1);

  assert.equal(response.sequence, 1, 'Wrong sequence');
  assert.equal(response['is_correct'], 1, 'Wrong is_correct');
  assert.equal(response['answer_text'], 'Answer #1 text', 'Wrong answer_text');
  assert.equal(response['answer_type'], 'text', 'Wrong answer_type');
});

test('normalizeReadQuestion', function(assert) {
  const serializer = this.subject();
  const questionData = {
    id: 'abcd',
    title: 'question-title',
    content_subformat: 'multiple_answer_question',
    description: 'any desc',
    publish_status: 'published',
    taxonomy: ['a', 'b'],
    answer: [
      {
        'sequence': 1,
        'is_correct': 0,
        'answer_text': 'Answer #1 text',
        'answer_type': 'text'
      },
      {
        'sequence': 2,
        'is_correct': 1,
        'answer_text': 'Answer #2 text',
        'answer_type': 'text'
      },
      {
        'sequence': 3,
        'is_correct': 0,
        'answer_text': 'Answer #3 text',
        'answer_type': 'text'
      }
    ]
  };

  const question = serializer.normalizeReadQuestion(questionData);
  assert.equal(question.get('id'), 'abcd', 'Wrong id');
  assert.equal(question.get('title'), 'question-title', 'Wrong title');
  assert.equal(question.get('text'), 'any desc', 'Wrong description');
  assert.equal(question.get('publishStatus'), 'published', 'Wrong publish');
  assert.equal(question.get('standards').length, 2, 'Wrong standards');
  assert.equal(question.get('type'), 'MA', 'Wrong format'); //format is converted at the normalizer
  assert.equal(question.get('isVisibleOnProfile'), true, 'Wrong format');
  assert.equal(question.get('answers').length, 3, 'Wrong answers array length');
});

test('normalizeAnswer', function(assert) {
  const serializer = this.subject();
  const answerData = {
    'sequence': 1,
    'is_correct': 0,
    'answer_text': 'Answer #1 text',
    'answer_type': 'text'
  };
  const answer = serializer.normalizeAnswer(answerData);

  assert.equal(answer.get('sequence'), 1, 'Wrong sequence');
  assert.equal(answer.get('isCorrect'), false, 'Wrong isCorrect');
  assert.equal(answer.get('text'), 'Answer #1 text', 'Wrong text');
  assert.equal(answer.get('type'), 'text', 'Wrong type');
});
