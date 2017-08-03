import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Edit Rubric', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/content/rubric/edit/123');

  andThen(function() {
    assert.equal(currentURL(), '/content/rubric/edit/123');

    var $container = find('.rubric.edit');
    assert.ok($container.length, 'Missing rubric controller');
    assert.ok(
      $container.find('.gru-rubric-edit').length,
      'Missing rubric edit component'
    );
  });
});

test('Cancel edit', function(assert) {
  visit('/content/rubric/edit/123');

  andThen(function() {
    assert.equal(currentURL(), '/content/rubric/edit/123');

    var $container = find('.rubric.edit');
    var $cancel = $container.find('.header button.cancel');
    click($cancel);
    andThen(function() {
      assert.equal(currentURL(), '/id-for-pochita/content/rubrics');
    });
  });
});

test('Preview edit', function(assert) {
  visit('/content/rubric/edit/123');

  andThen(function() {
    assert.equal(currentURL(), '/content/rubric/edit/123');

    var $container = find('.rubric.edit');
    var $preview = $container.find('.header .actions .preview');
    click($preview);
    andThen(function() {
      assert.equal(currentURL(), '/content/rubric/preview/123');
      var $preview = find('.rubric.preview');
      assert.ok(
        $preview.find('header .header-content .information h1').length,
        'Missing rubric title'
      );
      assert.ok(
        $preview.find('header .header-content .information .details .type')
          .length,
        'Missing rubric type'
      );
      assert.ok(
        $preview.find('header .header-content .information .tags').length,
        'Missing rubric taxonomy tags'
      );
      assert.ok(
        $preview.find('header .header-content .publisher').length,
        'Missing publisher'
      );
      assert.ok(
        $preview.find('header .header-content .publisher .created-by').length,
        'Missing created by label'
      );
      assert.ok(
        $preview.find('header .header-content .publisher img').length,
        'Missing publish image'
      );
      assert.ok(
        $preview.find('header .header-content .publisher .owner').length,
        'Missing publisher name'
      );
      assert.ok($preview.find('.preview').length, 'Missing preview section');
      assert.ok(
        $preview.find('.preview .header h2').length,
        'Missing rubric panel'
      );
      assert.ok(
        $preview.find('.preview .content.gru-preview-url').length,
        'Missing rubric preview iframe'
      );
      assert.ok(
        $preview.find('.preview .category-panel').length,
        'Missing category panel'
      );
    });
  });
});

test('Add a category and go to preview before save', function(assert) {
  visit('/content/rubric/edit/123');

  andThen(function() {
    assert.equal(currentURL(), '/content/rubric/edit/123');

    var $container = find('.rubric.edit');
    assert.equal(
      $container.find('.category-panel .content.rubric.gru-category').length,
      1,
      'Should have 1 category'
    );
    var $addCategory = $container.find('.category-panel a.add-category');
    click($addCategory);
    andThen(function() {
      assert.equal(
        $container.find('.category-panel .content.rubric.gru-category').length,
        2,
        'Should have 2 category'
      );
      var $preview = $container.find('.header .actions .preview');
      click($preview);
      andThen(function() {
        assert.equal(currentURL(), '/content/rubric/preview/123');
        var $preview = find('.rubric.preview');
        assert.equal(
          $preview.find('.preview .category-panel .content.rubric.gru-category')
            .length,
          1,
          'Should have only 1 category'
        );
      });
    });
  });
});
