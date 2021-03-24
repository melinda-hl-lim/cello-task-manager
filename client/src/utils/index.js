const ONE_DAY = 86400000

export const shortDate = (date) => {
  const dateString = (new Date(date)).toDateString();
  return dateString.split(' ').slice(1, 3).join(' ');
};

export const howSoon = () => {
  const difference = Date.now() - new Date(card.dueDate).getTime();
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
      return ""
    } else {
      return "due-soon"
    }
  }
}