import GruTheme from 'gooru-web/utils/gru-theme';
import { module, test } from 'qunit';

module('Unit | Utility | gru theme');

test('cssUrl', function (assert) {
  const theme = GruTheme.create({
    id : "london"
  });
  assert.equal(theme.get("cssUrl"), 'assets/themes/london/styles.css', "Wrong css url");
});
