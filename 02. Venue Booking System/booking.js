const bookingData = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2019-09-28 13:00:00",
    endTime: "2019-09-28 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2019-09-28 14:00:00",
    endTime: "2019-09-28 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2019-09-28 16:00:00",
    endTime: "2019-09-28 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2019-09-29 13:00:00",
    endTime: "2019-09-29 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2019-09-29 16:00:00",
    endTime: "2019-09-29 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2019-09-30 09:00:00",
    endTime: "2019-10-04 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2019-09-19 09:00:00",
    endTime: "2019-09-23 19:00:00",
    title: "Thai Tech Innovation 2019",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2019-09-28 10:00:00",
    endTime: "2019-09-28 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2019-09-30 18:00:00",
    endTime: "2019-09-30 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2019-10-04 14:00:00",
    endTime: "2019-10-06 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

function isRoomAvailable(roomId, startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return !bookingData.some((booking) => {
    if (booking.roomId === roomId) {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return start < bookingEnd && end > bookingStart;
    }
    return false;
  });
}

// Example usage:
console.log(
  isRoomAvailable("A101", "2019-09-28 15:00:00", "2019-09-28 16:00:00")
); // Should return true
console.log(
  isRoomAvailable("A101", "2019-09-28 13:30:00", "2019-09-28 14:30:00")
); // Should return false
console.log(
  isRoomAvailable("A101", "2019-09-28 15:30:00", "2019-09-29 11:00:00")
); // Should return false

function getBookingsForRoom(roomId, weekNo) {
  const baselineDate = new Date("2019-09-01");
  baselineDate.setHours(0, 0, 0, 0);

  const startOfRequestedWeek = new Date(baselineDate);
  const endOfRequestedWeek = new Date(baselineDate);

  switch (weekNo) {
    case 1:
      startOfRequestedWeek.setDate(1);
      endOfRequestedWeek.setDate(7);
      break;
    case 2:
      startOfRequestedWeek.setDate(8);
      endOfRequestedWeek.setDate(14);
      break;
    case 3:
      startOfRequestedWeek.setDate(15);
      endOfRequestedWeek.setDate(21);
      break;
    case 4:
      startOfRequestedWeek.setDate(22);
      endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
      endOfRequestedWeek.setDate(1);
      endOfRequestedWeek.setDate(endOfRequestedWeek.getDate() - 1);
      break;
    case 5:
      startOfRequestedWeek.setDate(29);
      endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
      endOfRequestedWeek.setDate(0);
      break;
    case "today":
      startOfRequestedWeek.setDate(22);
      endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
      endOfRequestedWeek.setDate(1);
      endOfRequestedWeek.setDate(endOfRequestedWeek.getDate() - 1);
      break;
    case "wholeMonth":
      startOfRequestedWeek.setDate(1);
      endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
      endOfRequestedWeek.setDate(0);
      break;
    default:
      return [];
  }

  const filteredBookings = bookingData.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);

    if (booking.roomId !== roomId) {
      return false;
    }

    return (
      bookingStartTime >= startOfRequestedWeek &&
      bookingStartTime < endOfRequestedWeek
    );
  });

  filteredBookings.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return filteredBookings;
}

// Example usage:
// Should return whole month
const roomId = "A101";
const weekNo = "wholeMonth";
const result = getBookingsForRoom(roomId, weekNo);
