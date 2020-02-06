var moment = require('moment');
var Media = require('./Media');

function Disc() {
  this.labelHeight = function () {
    return 3;
  };

  this.labelWidth = function () {
    return 20;
  };

  Media.call(this);

  this.makeLabel = function (title, recorder, recordingDate, startAtMinutes, startAtSeconds, durationMinutes, durationSeconds) {
    return this.createLabel(title, recordingDate, durationMinutes, durationSeconds);
  };

  function dateInLongForm(date) {
    var longFormDate = moment(date).format('D MMM YYYY HH:mm');
    return longFormDate;
  }

  function formatTime(minutes, seconds) {
    var result = '';
    if (minutes >= 60) {
      result = Math.floor(minutes / 60) + ':';
      minutes %= 60;
    }
    if (minutes < 10) {result += '0';}
    result += minutes + ':';
    if (seconds < 10) {result += '0';}
    result += seconds;
    return result;
  }

  this.createLabel = function (title, recordingDate, durationMinutes, durationSeconds) {
    var label = new Array(this.labelHeight());
    label[0] = this.fitTitleTo(title, this.labelWidth());
    label[1] = dateInLongForm(recordingDate);
    label[2] = 'Duration ' + formatTime(durationMinutes, durationSeconds);
    return label;
  };
}

module.exports = Disc;
