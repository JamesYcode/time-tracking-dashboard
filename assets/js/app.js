// Get elements from dom
const button = document.querySelectorAll('button');
const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

const currentTime = document.querySelectorAll('.current-time');
const prevTime = document.querySelectorAll('.prev-time');

// Fetching data
async function fetchData() {
  try {
    const res = await fetch('../../data.json');
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

// Manipulating DOM to show data from fetched data.
async function displayData(selectTime) {
  const data = await fetchData();

  try {
    if (data) {
      data.forEach((item, i) => {
        currentTime[i].innerHTML = `${item.timeframes[selectTime].current}hrs`;
        prevTime[i].innerHTML =
          selectTime === 'daily'
            ? `Yesterday - ${item.timeframes[selectTime].previous}hrs`
            : `Last ${loopTimeframe(selectTime)} - ${
                item.timeframes[selectTime].previous
              }hrs`;
      });
    }
  } catch (e) {
    console.log(e);
  }
}

// Getting different times
function loopTimeframe(selectTime) {
  switch (selectTime) {
    case 'daily':
      return 'Yesterday';
    case 'weekly':
      return 'Week';
    case 'monthly':
      return 'Month';
    default:
      throw new Error('Unknown');
  }
}

// Intial data before clicking other inputs.
displayData('daily');

// Event listeners for different datas to display.
dailyBtn.addEventListener('click', () => displayData('daily'));
weeklyBtn.addEventListener('click', () => displayData('weekly'));
monthlyBtn.addEventListener('click', () => displayData('monthly'));
