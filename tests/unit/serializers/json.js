import { moduleForModel, test } from 'ember-qunit';

moduleForModel('object', 'Unit | Serializer | object', {
  // Specify the other units that are required for this test.
  needs: ['storagekit/serializer:json']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
