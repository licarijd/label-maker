var Media = require('./Media');

function AudioTape() {
  this.labelHeight = function () {
    return 2;
  };

  this.labelWidth = function () {
    return 25;
  };

  Media.call(this);

  function formatTime(minutes, seconds) {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  this.makeLabel = function (title, recorder, recordingDate, durationMinutes, durationSeconds, startAtMinutes, startAtSeconds) {
    var label = new Array(this.labelHeight());
    label[0] = this.fitTitleTo(title, 15) + ' ' + this.dateInTenDigitFormat(recordingDate);
    label[1] = 'Start' + formatTime(startAtMinutes, startAtSeconds) + ' dur' + formatTime(durationMinutes, durationSeconds);
    return label;
  };
}

module.exports = AudioTape;
