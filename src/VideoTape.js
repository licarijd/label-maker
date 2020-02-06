var moment = require('moment');
var Media = require('./Media');
var VideoTapeSize = require('./VideoTapeSize');

function VideoTape(size) {
  console.log(VideoTapeSize[size].width)
  this.labelHeight = VideoTapeSize[size].height
  this.labelWidth = VideoTapeSize[size].width

  Media.call(this);

  function formatTime(minutes, seconds) {
    var result = '';
    if (minutes >= 60) {
      result = Math.floor(minutes / 60) + ':';
      minutes %= 60;
    }
    result += (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    return result;
  }

  function dateInLongForm(date) {
    var longFormDate = moment(date).format('ddd, D MMM YYYY HH:mm:ss');
    return longFormDate;
  }

  function fitRecorderTo(recorder, length) {
    if (recorder.length > length - 1) {
      return recorder.substring(0, length - 1) + '>';
    }
    return recorder;
  }

  this.makeLabel = function (title, recorder, recordingDate, startAtMinutes, startAtSeconds, durationMinutes, durationSeconds) {
    var label;
    if (size === VideoTapeSize.HOME.name) {
      label = new Array(2);
      label[0] = this.fitTitleTo(title, 9) + ' ' + this.dateInTenDigitFormat(recordingDate);
      // hidden bug here: if values are way too large the label will be wider than 20
      label[1] = 'S:' + formatTime(startAtMinutes, startAtSeconds) + ' D:' + formatTime(durationMinutes, durationSeconds);
    } else if (size === VideoTapeSize.BROADCAST.name) {
      label = [
        this.fitTitleTo(title, 40),
        'Recorded by: ' + fitRecorderTo(recorder, 40 - 'Recorded by: '.length),
        'Recorded on: ' + dateInLongForm(recordingDate),
        'Start at ' + formatTime(startAtMinutes, startAtSeconds) + ' duration ' + formatTime(durationMinutes, durationSeconds)
      ];
    }

    return label;
  };
}

module.exports = VideoTape;
