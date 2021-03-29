import moment from "moment";

const ONE_DAY = 86400000

// Format: MMM DD
export const shortDate = (date) => {
  return moment(date).format('MMM DD');
};

// Format: MMM DD at HH:MM AM
export const longDate = (date) => {
  return shortDate(date) + ' at ' + moment(date).format('LT');
}

export const howSoon = (dueDate) => {
  const difference = Date.now() - new Date(dueDate).getTime();
  if (difference > 0) {
    // overdue
    if (difference > ONE_DAY) {
      // was due at least a day ago
      return "overdue"
    } else {
      return "overdue-recent"
    }
  } else {
    // not overdue
    if (difference < ONE_DAY) {
      return "due-soon"
    } else {
      return ""
    }
  }
}

export const relativeTime = (dateTime) => {
  return moment(dateTime).fromNow();
}

export const pastDue = (dueDate) => {
  const difference = Date.now() - new Date(dueDate).getTime();

  if (difference > 0) {
    return "\(past due\)"
  } 

  return "";
}