var Media = require('./Media');
var { TITLE_FIT_TO_LENGTH } = require('../src/constants')

function AudioTape() {
  this.labelHeight = 2;

  this.labelWidth = 25;

  Media.call(this);

  function formatTime(minutes, seconds) {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  this.makeLabel = function (title, recordingDate, durationMinutes, durationSeconds, startAtMinutes, startAtSeconds) {
    var label = new Array(this.labelHeight);
    label[0] = this.fitTitleTo(title, TITLE_FIT_TO_LENGTH) + ' ' + this.dateInTenDigitFormat(recordingDate);
    label[1] = 'Start' + formatTime(startAtMinutes, startAtSeconds) + ' dur' + formatTime(durationMinutes, durationSeconds);
    return label;
  };
}

module.exports = AudioTape;
