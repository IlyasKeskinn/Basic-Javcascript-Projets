// Selecting necessary elements
const container = document.querySelector(".container");
const amount = document.getElementById("amount");
const count = document.getElementById("count");
const selectedFilm = document.getElementById("movies");
const allSeats = document.querySelectorAll(".seat");
const selectedSeat = container.querySelectorAll(".seat.selected")


// Load data from localStorage and update UI
getLocalStorage();
updateUi();

// Adding click event listener to the container
container.addEventListener("click", function (e) {
    // Check if the clicked element is an unreserved seat
    if ((e.target.classList.contains("seat")) && !(e.target.classList.contains("reserved"))) {
        e.target.classList.toggle("selected");
        updateUi();
    }
})


// Adding change event listener to the movie selection dropdown
selectedFilm.addEventListener("change", function (e) {
    updateUi();
})

// Update the UI with the selected seats and total cost
function updateUi() {
    const selectedSeat = container.querySelectorAll(".seat.selected")
    let selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * selectedFilm.value //price;

    findSeatIndex(selectedSeat);
}

// Find the indexes of selected seats and save them to localStorage
function findSeatIndex(selectedSeat) {
    let selectedSeatIndex;

    const selectedSeatArr = [];
    const allSeatArr = [];

    selectedSeat.forEach(function (seat) {
        selectedSeatArr.push(seat);
    })

    allSeats.forEach(function (seat) {
        allSeatArr.push(seat);
    })

    selectedSeatIndex = selectedSeatArr.map(function (seat) {
        return allSeatArr.indexOf(seat)
    })
    console.log(selectedSeatIndex)

    saveLocalStorage(selectedSeatIndex);
}
// Save selected seat indexes and movie index to localStorage
function saveLocalStorage(selectedSeatIndex) {
    localStorage.setItem("selectedSeatIndex", JSON.stringify(selectedSeatIndex));
    localStorage.setItem("selectedMovieIndex", selectedFilm.selectedIndex);

}

// Retrieve data from localStorage and apply it to the UI
function getLocalStorage() {


    const selectedSeatsIndex = JSON.parse(localStorage.getItem("selectedSeatIndex"));

    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
        selectedSeatsIndex.forEach(function (seatIndex) {
            const seat = allSeats[seatIndex];
            if (seat) {
                seat.classList.add("selected");
            }
        });
    }
    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"));

    if (selectedMovieIndex != null) {
        selectedFilm.selectedIndex = selectedMovieIndex;
    }

}