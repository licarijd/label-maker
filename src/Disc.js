var moment = require('moment');
var Media = require('./Media');
var { SECONDS_IN_A_MINUTE } = require('../src/constants')

function Disc() {
  this.labelHeight = 3;
  this.labelWidth = 20;

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
    if (minutes >= SECONDS_IN_A_MINUTE) {
      result = Math.floor(minutes / SECONDS_IN_A_MINUTE) + ':';
      minutes %= SECONDS_IN_A_MINUTE;
    }
    if (minutes < 10) {result += '0';}
    result += minutes + ':';
    if (seconds < 10) {result += '0';}
    result += seconds;
    return result;
  }

  this.createLabel = function (title, recordingDate, durationMinutes, durationSeconds) {
    var label = new Array(this.labelHeight);
    label[0] = this.fitTitleTo(title, this.labelWidth);
    label[1] = dateInLongForm(recordingDate);
    label[2] = 'Duration ' + formatTime(durationMinutes, durationSeconds);
    return label;
  };
}

module.exports = Disc;
