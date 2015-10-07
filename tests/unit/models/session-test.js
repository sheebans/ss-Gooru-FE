import { moduleForModel, test } from "ember-qunit";

moduleForModel("session", "Session Model", {
  needs: ["model:user"]
});

test("session content", function(assert) {
  var session = this.subject({
    username: "jefberpe",
    password: "pass123",
    sessionToken: "9b60fef5-6427-41bc-8928-7a34ce42ca98",
  });

  assert.equal(session.get("sessionToken"), "9b60fef5-6427-41bc-8928-7a34ce42ca98");
  assert.equal(session.get("username"), "jefberpe");
  assert.equal(session.get("password"), "pass123");
});
