import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';
import { moduleFor, test } from 'ember-qunit';
import MapSuggestion from 'gooru-web/models/map/map-suggestion';

moduleFor('model:map/map-location', 'Unit | Model | map/map-location', {
  unit: true
});

test('hasPreTestSuggestions', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.PRE_TEST }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.POST_TEST })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(model.get("hasPreTestSuggestions"), "Should have pre test suggestions");
});

test('hasPreTestSuggestions not so', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.POST_TEST }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.BENCHMARK })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(!model.get("hasPreTestSuggestions"), "Should not have pre test suggestions");
});

test('hasPostTestSuggestions', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.PRE_TEST }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.POST_TEST })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(model.get("hasPostTestSuggestions"), "Should have post test suggestions");
});

test('hasPostTestSuggestions not so', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.PRE_TEST }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.BENCHMARK })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(!model.get("hasPostTestSuggestions"), "Should not have post test suggestions");
});

test('hasBenchmarkSuggestions', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.BENCHMARK }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.POST_TEST })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(model.get("hasBenchmarkSuggestions"), "Should have benchmark suggestions");
});

test('hasBenchmarkSuggestions not so', function (assert) {
  const suggestions = [
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.PRE_TEST }),
    MapSuggestion.create({ type: ASSESSMENT_SUB_TYPES.POST_TEST })
  ];
  const model = this.subject({
    suggestions: suggestions
  });

  assert.ok(!model.get("hasBenchmarkSuggestions"), "Should not have benchmark suggestions");
});
