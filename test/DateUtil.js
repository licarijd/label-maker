function DateUtil() {}

DateUtil.createDate = function (year, month, day, hours, minutes) {
  return new Date(year, (month - 1), day, hours, minutes);
};

module.exports = DateUtil;
