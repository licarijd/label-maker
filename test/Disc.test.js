var DateUtil = require('./DateUtil');
var Disc = require('../src/Disc');

describe('Disc test suite', function () {
  var disc;

  beforeEach(function () {
    disc = new Disc();
  });

  test('all texts fit', function () {
    var expected = [
      "Valentine's Party",
      '14 Feb 2009 20:00',
      'Duration 20:39'
    ];
    var label = disc.makeLabel("Valentine's Party", null,
      DateUtil.createDate(2009, 2, 14, 20, 0), -1, -1, 20, 39);
    expect(expected).toEqual(label);
  });

  test('too long title is truncated', function () {
    var expectedTitle = "Valentine's Party Tr";
    var label = disc.makeLabel("Valentine's Party Truncated", null,
      DateUtil.createDate(2009, 2, 14, 20, 0), -1, -1, 80, 39);
    expect(expectedTitle).toBe(label[0]);
  });

  test('single digit duration times are rendered as two digits', function () {
    var label = disc.makeLabel('title', undefined, DateUtil.createDate(2009, 2, 14, 20, 0), -1, -1, 2, 3);
    var expectedTimes = 'Duration 02:03';
    expect(expectedTimes).toBe(label[2]);
  });

  test('sixty minutes and over are rendered as hours with no leading zero', function () {
    var label = disc.makeLabel('title', undefined, DateUtil.createDate(2009, 2, 14, 20, 0), -1, -1, 333, 13);
    var expectedTimes = 'Duration 5:33:13';
    expect(expectedTimes).toBe(label[2]);
  });
});
