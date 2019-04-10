function getDateDelta (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return ({
    year,
    month,
    day,
    hour,
    minute,
    second
  })
};

function fmt (array) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i]
    if (typeof item === 'undefined') {
      array.splice(i, 1)
      i--
    } else if (item.toString().length === 1) {
      array.splice(i, 1, '0' + item)
    }
  };
  return (array)
};

function ymd (y, m, d) {
  return (fmt([y, m, d]).join('-'))
};

function relative (timestamp) {
  var oldMillisecond = timestamp * (timestamp.toString().length === 10 ? 1000 : 1)
  var date = new Date()
  var newMillisecond = date.getTime()
  var old = getDateDelta(date)
  var now = getDateDelta(date)
  var oneMin = 60 * 1000
  var oneHour = 60 * oneMin
  var oneDay = 24 * oneHour
  var oneMonth = 30 * oneDay
  var result
  var timeDist = newMillisecond - oldMillisecond
  if (timeDist < oneMin) {
    result = '刚刚'
  } else if (timeDist < oneHour) {
    result = Math.floor(timeDist / oneMin) + '分钟前'
  } else if (timeDist < oneDay) {
    result = Math.ceil(timeDist / oneHour) + '小时前'
  } else if (timeDist < oneMonth) {
    var oldDays = Math.ceil(oldMillisecond / oneDay)
    var newDays = Math.ceil(newMillisecond / oneDay)
    result = (newDays - oldDays) + '天前'
  } else if (old.year === now.year) {
    result = Math.floor(timeDist / oneMonth) + '月前'
  } else {
    result = ymd(old.year, old.month, old.day)
  };
  return (result)
};
export default {
  relative
}
