var AudioTape = require('../src/AudioTape');
var DateUtil = require('./DateUtil');

describe('AudioTape test suite', function () {
  var tape;

  beforeEach(function () {
    tape = new AudioTape();
  });

  test('all texts fit', function () {
    var label = tape.makeLabel('CBCSignal', DateUtil.createDate(2009, 11, 3, 8, 20), 2, 59, 0, 0);
    var expected = ['CBCSignal 0911030820', 'Start0:00 dur2:59'];
    assertLabel(expected, label);
  });

  test('title shortened', function () {
    var label = tape.makeLabel('CBCSignal Is Too Long', DateUtil.createDate(2009, 11, 3, 8, 20), 2, 59, 0, 0);
    var expected = ['CBCSignal Is To 0911030820', 'Start0:00 dur2:59'];
    assertLabel(expected, label);
  });

  function assertLabel(expected, label) {
    expect(expected).toEqual(label);
  }
});
