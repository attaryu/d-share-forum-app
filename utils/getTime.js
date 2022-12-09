import moment from 'moment';

function getTime(date) {
  const time = moment(date).startOf('minute').fromNow();
  const selectedDay = /([0-9]|a) (day|days)/gi;
  const afterOneDayCheck = selectedDay.test(time)
    ? moment(date).format('dddd, DD MMM YYYY')
    : time;

  return afterOneDayCheck;
}

export default getTime;
