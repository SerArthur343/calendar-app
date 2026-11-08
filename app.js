let calendarEvents = {};
let selectedCell = null;
let selectedDateKey = ""; // Tracks the active day's string date

const modal = document.querySelector("#event-modal");
const cancelBtn = document.querySelector("#cancel-btn");
const saveBtn = document.querySelector("#save-btn");
const eventInput = document.querySelector("#event-input");

const monthDisplay = document.querySelector(".month");
const prevMonth = document.querySelector(".prevMonth");
const modeBtn = document.querySelector(".modeBtn");
const nextMonth = document.querySelector(".nextMonth");
const calendar = document.querySelector(".calendar");

const currentDate = new Date();
let currentMonthIndex = currentDate.getMonth();
let currentYear = currentDate.getFullYear(); 

const body = document.body;
const utils = document.querySelector(".utils");
const modalContent = document.querySelector(".modal-content");




// Initial page paint trigger
renderCalendar();

prevMonth.addEventListener("click", () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
    }
    renderCalendar();
});

function renderCalendar() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        if (!cell.classList.contains("dayCell")) {
            cell.remove();
        }
    });

    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    monthDisplay.textContent = monthNames[currentMonthIndex] + " " + currentYear;

    const totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    let startWeekday = new Date(currentYear, currentMonthIndex, 1).getDay();

    if (startWeekday === 0) {
        startWeekday = 6;
    } else {
        startWeekday = startWeekday - 1;
    } 

    for(let i = 0; i < startWeekday; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("cell");
        emptyCell.style.opacity = "0"; // Invisible spacer boxes
        emptyCell.style.pointerEvents = "none";
        calendar.appendChild(emptyCell);
    }

    for(let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("cell");
        dayCell.textContent = day;
        calendar.appendChild(dayCell);
    }
}

calendar.addEventListener("click", (event) => {

    eventInput.placeholder = "Type your plan here";
    eventInput.style.border = "1px solid rgba(255, 255, 255, 0.1)"

    const clickedCell = event.target;

    if (!clickedCell.classList.contains("cell") || clickedCell.classList.contains("dayCell") || clickedCell.textContent === "") {
        return;
    }

    selectedCell = clickedCell;

    const clickedDay = clickedCell.textContent;
    const formattedMonth = String(currentMonthIndex + 1).padStart(2, "0");
    const formattedDay = String(clickedDay).padStart(2, "0");
    const dateKey = `${currentYear}-${formattedMonth}-${formattedDay}`;

    selectedDateKey = dateKey; // Remember the date in background memory

    eventInput.value = "";     // Clean text field value resets
    modal.classList.remove("hidden"); // Open modal layout
});

saveBtn.addEventListener("click", () => {
    
    if (eventInput.value.trim() === "") return;

    if (eventInput.value.trim().length > 20) {
        eventInput.value = "";
        eventInput.placeholder = "You can only type in up to 20 characters!";
        eventInput.style.border = "2px solid red";
        return;
    }

    modal.classList.add("hidden");

    if (selectedCell) {
        selectedCell.textContent = eventInput.value;
    }
});

cancelBtn.addEventListener("click", () => {

    modal.classList.add("hidden"); // Close modal layout
});



eventInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        saveBtn.click();
    }
});



modeBtn.addEventListener("click", () => {

    if (modeBtn.textContent === "Dark Mode ⚫") {

        modeBtn.textContent = "Light Mode ⚪";

        calendar.classList.add("lightThemeCalendar");
        body.classList.add("lightThemeBody");
        utils.classList.add("lightThemeUtils");

        eventInput.classList.add("lightThemeEventInput");
        modalContent.classList.add("lightThemeModalContent");
        saveBtn.classList.add("lightThemeModalContent");
        cancelBtn.classList.add("lightThemeModalContent");
    }

    else {

        modeBtn.textContent = "Dark Mode ⚫";

        calendar.classList.remove("lightThemeCalendar");
        body.classList.remove("lightThemeBody");
        utils.classList.remove("lightThemeUtils");

        eventInput.classList.remove("lightThemeEventInput");
        modalContent.classList.remove("lightThemeModalContent");
        saveBtn.classList.remove("lightThemeModalContent")
        cancelBtn.classList.remove("lightThemeModalContent");
    }
});
