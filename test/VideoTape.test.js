var DateUtil = require('./DateUtil');
var VideoTape = require('../src/VideoTape');
var VideoTapeSize = require('../src/VideoTapeSize');

describe('VideoTape test suite', function () {
  test('broadcast all texts fit', function () {
    var videoTape = new VideoTape(VideoTapeSize.BROADCAST);
    var expected = [
      'The Moon Landing',
      'Recorded by: NASA',
      'Recorded on: Sun, 20 Jul 1969 20:17:00',
      'Start at 11:21 duration 20:39'
    ];
    var label = videoTape.makeLabel('The Moon Landing', 'NASA', DateUtil.createDate(1969, 7, 20, 20, 17), 11, 21, 20, 39);
    expect(expected).toEqual(label);
  });

  test('broadcast too long title is elided', function () {
    var videoTape = new VideoTape(VideoTapeSize.BROADCAST);
    var tooLongTitle = '12345678901234567890123456789012345678901';
    var expectedTitle = '123456789012345678901234567890123456789>';
    var label = videoTape.makeLabel(tooLongTitle, 'NASA', DateUtil.createDate(1969, 7, 20, 20, 17), 11, 21, 20, 39);
    expect(expectedTitle).toBe(label[0]);
  });

  test('broadcast too long recorder is elided', function () {
    var videoTape = new VideoTape(VideoTapeSize.BROADCAST);
    var tooLongRecorder = 'abcdefghijklmnopqrstuvwxyzabcdef';
    var expectedRecorder = 'Recorded by: abcdefghijklmnopqrstuvwxyz>';
    var label = videoTape.makeLabel('title', tooLongRecorder, DateUtil.createDate(1969, 7, 20, 20, 17), 11, 21, 20, 39);
    expect(expectedRecorder).toBe(label[1]);
  });

  test('single digit times are rendered as two digits', function () {
    var videoTape = new VideoTape(VideoTapeSize.BROADCAST);
    var label = videoTape.makeLabel('title', 'NASA',
      DateUtil.createDate(1969, 7, 20, 20, 17), 1, 2, 3, 9);
    var expectedTimes = 'Start at 01:02 duration 03:09';
    expect(expectedTimes).toBe(label[3]);
  });

  test('sixty minutes and over are rendered as hours with no leading zero', function () {
    var videoTape = new VideoTape(VideoTapeSize.BROADCAST);
    var label = videoTape.makeLabel('title', 'NASA', DateUtil.createDate(1969, 7, 20, 20, 17), 131, 2, 233, 9);
    var expectedTimes = 'Start at 2:11:02 duration 3:53:09';
    expect(expectedTimes).toBe(label[3]);
  });

  test('home all texts fit', function () {
    var videoTape = new VideoTape(VideoTapeSize.HOME);
    var expected = [
      'Moon 6907202017',
      'S:11:21 D:20:39'
    ];
    var label = videoTape.makeLabel('Moon', null, DateUtil.createDate(1969, 7, 20, 20, 17), 11, 21, 20, 39);
    expect(expected).toEqual(label);
  });

  test('home too long title is truncated', function () {
    var videoTape = new VideoTape(VideoTapeSize.HOME);
    var expectedTitle = 'Moon Land 6907202017';
    var label = videoTape.makeLabel('Moon Landing', null, DateUtil.createDate(1969, 7, 20, 20, 17), 11, 21, 20, 39);
    expect(expectedTitle).toBe(label[0]);
  });

  test('home single digit times are rendered as two digits', function () {
    var videoTape = new VideoTape(VideoTapeSize.HOME);
    var label = videoTape.makeLabel('title', null, DateUtil.createDate(1969, 7, 20, 20, 17), 1, 2, 3, 9);
    var expectedTimes = 'S:01:02 D:03:09';
    expect(expectedTimes).toBe(label[1]);
  });
});
