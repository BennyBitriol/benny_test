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

document.addEventListener("DOMContentLoaded", function () {
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      roomId: params.get("roomId") || "A101",
      weekNo: params.get("weekNo") || "thisWeek",
    };
  }

  function getBookingsForRoom(roomId, weekNo) {
    const baselineDate = new Date("2019-09-01");
    baselineDate.setHours(0, 0, 0, 0);

    const startOfRequestedWeek = new Date(baselineDate);
    const endOfRequestedWeek = new Date(baselineDate);

    switch (weekNo) {
      case "nextWeek":
        startOfRequestedWeek.setDate(29);
        endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
        endOfRequestedWeek.setDate(0);
        break;
      case "thisWeek":
        startOfRequestedWeek.setDate(new Date().getDate());
        endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth());
        endOfRequestedWeek.setDate(new Date().getDate());
        endOfRequestedWeek.setDate(endOfRequestedWeek.getDate() + 6);
        break;
      case "wholeMonth":
        startOfRequestedWeek.setDate(1);
        endOfRequestedWeek.setMonth(endOfRequestedWeek.getMonth() + 1);
        endOfRequestedWeek.setDate(0);
        break;
      default:
        return [];
    }

    return bookingData
      .filter((booking) => {
        const bookingStartTime = new Date(booking.startTime);
        return (
          booking.roomId === roomId &&
          bookingStartTime >= startOfRequestedWeek &&
          bookingStartTime < endOfRequestedWeek
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  }

  function updatePageData() {
    const { roomId, weekNo } = getQueryParams();
    const bookings = getBookingsForRoom(roomId, weekNo);

    document.getElementById("room-id").innerText = roomId || "No Data";

    document.getElementById("upcoming-day").innerText = "";
    document.getElementById("upcoming-date").innerText = "";
    const upcomingBookingsContainer =
      document.getElementById("upcoming-bookings");
    upcomingBookingsContainer.innerHTML = "";
    const timelineEventsContainer = document.getElementById("timeline-events");
    timelineEventsContainer.innerHTML = "";

    if (bookings.length > 0) {
      const firstBooking = bookings[0];
      const firstBookingDate = new Date(firstBooking.startTime);

      document.getElementById("upcoming-day").innerText =
        firstBookingDate.toLocaleString("en-US", { weekday: "long" });
      document.getElementById("upcoming-date").innerText =
        firstBookingDate.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
        });

      bookings.forEach((booking) => {
        const bookingElement = document.createElement("div");
        bookingElement.style.marginBottom = "1rem";

        const timeElement = document.createElement("div");
        timeElement.style.fontSize = "16px";
        timeElement.style.color = "#ffffff";
        timeElement.style.opacity = "50%";
        timeElement.innerText = `${booking.startTime.split(" ")[1]} - ${
          booking.endTime.split(" ")[1]
        }`;

        const titleElement = document.createElement("div");
        titleElement.style.fontSize = "20px";
        titleElement.style.color = "#ffffff";
        titleElement.style.marginTop = "0.5rem";
        titleElement.innerText = booking.title;

        bookingElement.appendChild(timeElement);
        bookingElement.appendChild(titleElement);

        upcomingBookingsContainer.appendChild(bookingElement);
      });

      document.getElementById(
        "timeline-header"
      ).innerText = `${firstBookingDate.toLocaleString("en-US", {
        weekday: "long",
      })} (${firstBookingDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
      })})`;

      bookings.forEach((booking) => {
        const li = document.createElement("li");

        const dateDiv = document.createElement("div");
        dateDiv.className = "timeline-date";
        dateDiv.innerText = booking.startTime.split(" ")[0];

        const eventDiv = document.createElement("div");
        eventDiv.className = "timeline-event";
        eventDiv.innerText = booking.title;

        li.appendChild(dateDiv);
        li.appendChild(eventDiv);
        timelineEventsContainer.appendChild(li);
      });
    } else {
      document.getElementById("timeline-header").innerText =
        "No events this week.";
    }
  }

  function handleMenuItemClick(event) {
    event.preventDefault();

    const menuItems = document.querySelectorAll("#menu a");
    menuItems.forEach((link) => link.classList.remove("selected"));

    const clickedItem = event.target;
    clickedItem.classList.add("selected");

    const sectionId = `#${clickedItem.id}`;
    const sectionElement = document.querySelector(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }

    const newQueryParams = new URLSearchParams(window.location.search);
    newQueryParams.set("weekNo", clickedItem.id.replace("Menu", ""));
    history.replaceState(
      null,
      "",
      `${window.location.pathname}?${newQueryParams}`
    );

    updatePageData();
  }

  const menuItems = document.querySelectorAll("#menu a");
  menuItems.forEach((item) => {
    item.addEventListener("click", handleMenuItemClick);
  });

  function setDefaultMenuSelection() {
    const params = getQueryParams();
    const defaultMenuId = `${params.weekNo}Menu`;

    const defaultMenuItem = Array.from(menuItems).find(
      (item) => item.id === defaultMenuId
    );

    if (defaultMenuItem) {
      defaultMenuItem.classList.add("selected");
      const sectionId = `#${defaultMenuItem.id}`;
      const sectionElement = document.querySelector(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (menuItems.length > 0) {
        menuItems[0].classList.add("selected");
        const sectionId = `#${menuItems[0].id}`;
        const sectionElement = document.querySelector(sectionId);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    updatePageData();
  }

  setDefaultMenuSelection();
});
