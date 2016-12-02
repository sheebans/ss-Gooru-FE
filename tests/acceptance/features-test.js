import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | features', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Verifying header.enable feature default value', function(assert) {
  visit('/home');
  andThen(function() {
    assert.equal(currentURL(), '/home');

    const $gruHeader = find(".gru-header");
    T.exists(assert, $gruHeader, "Missing header");
  });
});

test('Verifying collections.player.reactions feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id');

  andThen(function () {
    assert.equal(currentURL(), '/player/all-resource-types-collection-id?resourceId=image-resource-id');

    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer.find(".main .gru-navigation .reaction-bar"), "Missing reaction bar");
  });
});

test('Verifying collections.player.showReportLink feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id');

  andThen(function () {
    assert.equal(currentURL(), '/player/all-resource-types-collection-id?resourceId=image-resource-id');

    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer.find(".aside .gru-navigator .see-usage-report"), "Missing see report link");
  });
});

test('Verifying collections.player.showCollectionName feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id');

  andThen(function () {
    assert.equal(currentURL(), '/player/all-resource-types-collection-id?resourceId=image-resource-id');

    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer.find(".aside .gru-navigator .navigator-subheader"), "Missing see collection name");
  });
});

test('Verifying collections.player.showBackLink feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id');

  andThen(function () {
    assert.equal(currentURL(), '/player/all-resource-types-collection-id?resourceId=image-resource-id');

    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer.find(".aside .gru-navigator .navigator-header .lesson-title"), "Missing back navigation link");
  });
});

test('Verifying collections.player.showRemix feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id');

  andThen(function () {
    assert.equal(currentURL(), '/player/all-resource-types-collection-id?resourceId=image-resource-id');

    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer.find(".aside .gru-navigator .navigator-header .remix-btn"), "Missing remix button");
  });
});

