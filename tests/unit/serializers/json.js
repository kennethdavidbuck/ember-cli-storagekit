import { moduleForModel, test } from 'ember-qunit';

moduleForModel('object', 'Unit | Serializer | object', {});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
