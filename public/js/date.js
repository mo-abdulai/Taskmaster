
module.exports.date = function() {

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Months are zero-indexed, so add 1 to get the current month
const day = today.getDate();

// Pad the month and day with leading zeros if necessary
const formattedMonth = month.toString().padStart(2, '0');
const formattedDay = day.toString().padStart(2, '0');

// Combine the year, month, and day into a single string in 'YYYY-MM-DD' format
const currentDate = `${year}-${formattedMonth}-${formattedDay}`;

    return currentDate  
  }
  

