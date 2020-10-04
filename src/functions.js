export function getToday() {
  var now = new Date(),
    ampm = 'AM',
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds();
  if (h >= 12) {
    if (h > 12) h -= 12;
    ampm = 'PM';
  } else if (h === 0) {
    h = 12;
  }

  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;

  const dt = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  return dt + '\n' + h + ':' + m + ' ' + ampm;
}

export function getScheduleInfo(day, period_1, period_2, period_3, period_4, period_5, period_6, period_7, period_8) {
  const periods = [];
  if (day === 'A') {
    // A Day => 1, 2, 3, 4, 5, 6
    periods.push(period_1);
    periods.push(period_2);
    periods.push(period_3);
    periods.push(period_4);
    periods.push(period_5);
    periods.push(period_6);
  } else if (day === 'B') {
    // B Day => 8, 7, 6, 5, 4, 3
    periods.push(period_8);
    periods.push(period_7);
    periods.push(period_6);
    periods.push(period_5);
    periods.push(period_4);
    periods.push(period_3);
  } else if (day === 'C') {
    // C Day => 7, 8, 1, 2, 3, 4
    periods.push(period_7);
    periods.push(period_8);
    periods.push(period_1);
    periods.push(period_2);
    periods.push(period_3);
    periods.push(period_4);
  } else if (day === 'D') {
    // D Day => 6, 5, 4, 3, 2, 1
    periods.push(period_6);
    periods.push(period_5);
    periods.push(period_4);
    periods.push(period_3);
    periods.push(period_2);
    periods.push(period_1);
  } else if (day === 'E') {
    // E Day => 5, 6, 7, 8, 1, 2
    periods.push(period_5);
    periods.push(period_6);
    periods.push(period_7);
    periods.push(period_8);
    periods.push(period_1);
    periods.push(period_2);
  } else if (day === 'F') {
    // F Day => 4, 3, 2, 1, 8, 7
    periods.push(period_4);
    periods.push(period_3);
    periods.push(period_2);
    periods.push(period_1);
    periods.push(period_8);
    periods.push(period_7);
  } else if (day === 'G') {
    // G Day => 3, 4, 5, 6, 7, 8
    periods.push(period_3);
    periods.push(period_4);
    periods.push(period_5);
    periods.push(period_6);
    periods.push(period_7);
    periods.push(period_8);
  } else if (day === 'H') {
    // H Day => 2, 1, 8, 7, 6, 5
    periods.push(period_2);
    periods.push(period_1);
    periods.push(period_8);
    periods.push(period_7);
    periods.push(period_6);
    periods.push(period_5);
  }

  return periods;
}

function getSelectedRow(hr, mins) {
  var selectedRow = 0;
  if ((hr === 8) && (mins >= 25 && mins <= 35)) {
    selectedRow = 1;
  } else if ((hr === 8 && mins >= 40) || (hr === 9 && mins <= 25)) {
    selectedRow = 2;
  } else if ((hr === 9 && mins >= 30) || (hr === 10 && mins <= 15)) {
    selectedRow = 3;
  } else if ((hr === 10 && mins >= 20) || (hr === 10 && mins <= 50)) {
    selectedRow = 4;
  } else if ((hr === 10 && mins >= 55) || (hr === 11 && mins <= 40)) {
    selectedRow = 5;
  } else if ((hr === 11 && mins >= 45) || (hr === 12 && mins <= 20)) {
    selectedRow = 6;
  } else if ((hr === 12 && mins >= 25) || (hr === 13 && mins <= 10)) {
    selectedRow = 7;
  } else if ((hr === 13 && mins >= 15) || (hr === 14 && mins <= 5)) {
    selectedRow = 8;
  } else if ((hr === 14 && mins >= 10) || (hr === 15 && mins === 0)) {
    selectedRow = 9;
  } else if ((hr === 15 && mins >= 5) || (hr === 15 && mins <= 35)) {
    selectedRow = 10;
  }

  return selectedRow;
}

export function getRows(scheduleInfo, now) {
  const hr = now.getHours();
  const mins = now.getMinutes();

  const selectedRow = getSelectedRow(hr, mins);

  return [
    { key: "A", time: "8:25 AM - 8:35 AM", title: "Advisory", selected: selectedRow===1 },
    { key: "P1", time: "8:40 AM - 9:25 AM", title: scheduleInfo[0] || 'Free', selected: selectedRow===2 },
    { key: "P2", time: "9:30 AM - 10:15 AM", title: scheduleInfo[1] || 'Free', selected: selectedRow===3 },
    { key: "Z", time: "10:20 AM - 10:50 AM", title: "Zoom Community", selected: selectedRow===4 },
    { key: "P3", time: "10:55 AM - 11:40 AM", title: scheduleInfo[2] || 'Free', selected: selectedRow===5 },
    { key: "L", time: "11:45 AM - 12:20 PM", title: "Lunch", selected: selectedRow===6 },
    { key: "P4", time: "12:25 PM - 1:10 PM", title: scheduleInfo[3] || 'Free', selected: selectedRow===7 },
    { key: "P5", time: "1:15 PM - 2:05 PM", title: scheduleInfo[4] || 'Free', selected: selectedRow===8 },
    { key: "P6", time: "2:10 PM - 3:00 PM", title: scheduleInfo[5] || 'Free', selected: selectedRow===9 },
    { key: "H", time: "3:05 PM - 3:35 PM", title: 'Extra Help', selected: selectedRow===10 }
  ];
}