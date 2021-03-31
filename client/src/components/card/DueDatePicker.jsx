import Pikaday from "pikaday";
import React, { useEffect, useState } from "react";
import moment from "moment";

const DueDatePicker = ({ card }) => {
  const [picker, setPicker] = useState(null);

  useEffect(() => {
    if (!picker) {
      const newPicker = new Pikaday({
        field: document.querySelector(".datepicker-select-date input"),
        bound: false,
        container: document.getElementById("calendar-widget"),
        firstDay: 1,
        yearRange: 10,
        defaultDate: moment().add(1, "day").toDate(),
        setDefaultDate: true,
        format: "M/D/YYYY",
        i18n: {
          previousMonth: "Prev",
          nextMonth: "Next",
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        },
        toString(date, format) {
          return moment(date).format(format);
        },
      });

      newPicker.show();
      setPicker(newPicker);
    }
  }, [picker]);

  return (
    <>
      <header>
        <span>Change due date</span>
        <a href="#" className="icon-sm icon-close"></a>
      </header>
      <div className="content">
        <form>
          <div className="datepicker-select">
            <div className="datepicker-select-date">
              <label>
                Date
                <input type="text" placeholder="Enter date" autoFocus />
              </label>
            </div>
            <div className="datepicker-select-time">
              <label>
                Time
                <input type="text" placeholder="Enter time" value="12:00 PM" />
              </label>
            </div>
            <div id="calendar-widget"></div>
          </div>
          <button className="button" type="submit">
            Save
          </button>
          <button className="button red-button" type="reset">
            Remove
          </button>
        </form>
      </div>
    </>
  );
};

export default DueDatePicker;
