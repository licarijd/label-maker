var moment = require('moment');

function Media() {
  if (!this.labelWidth) {
    throw new Error('Must implement method "labelWidth"');
  }
  if (!this.labelHeight) {
    throw new Error('Must implement method "labelWidth"');
  }

  this.makeLabel = function (title, recorder, recordingDate, startAtMinutes, startAtSeconds, durationMinutes, durationSeconds) {};

  this.fitTitleTo = function (title, length) {
    if (length > 20) {
      // Over 20 characters: elide
      if (title.length > length - 1) {
        return title.substring(0, length - 1) + '>';
      }

      return title;
    }
    // Otherwise truncate (so we don't waste space on the elision marker)
    if (title.length > length) {
      return title.substring(0, length);
    }

    return title;
  };

  this.dateInTenDigitFormat = function (recordingDate) {
    return moment(recordingDate).format('YYMMDDHHmm');
  };
}

module.exports = Media;
