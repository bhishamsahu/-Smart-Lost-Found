// Get existing items from browser storage

let items = JSON.parse(
    localStorage.getItem("lostFoundItems")
) || [];


// ===============================
// SHOW SECTION
// ===============================

function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {

        section.classList.remove("active");

    });

    document
        .getElementById(sectionId)
        .classList.add("active");


    if (sectionId === "items") {

        displayItems();

    }

}


// ===============================
// ADD ITEM
// ===============================

document
    .getElementById("itemForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let type =
            document.getElementById("type").value;

        let itemName =
            document.getElementById("itemName").value;

        let category =
            document.getElementById("category").value;

        let color =
            document.getElementById("color").value;

        let location =
            document.getElementById("location").value;

        let date =
            document.getElementById("date").value;

        let description =
            document.getElementById("description").value;


        let item = {

            id: Date.now(),

            type: type,

            itemName: itemName,

            category: category,

            color: color,

            location: location,

            date: date,

            description: description

        };


        // Add item to Array

        items.push(item);


        // Save Array in localStorage

        localStorage.setItem(
            "lostFoundItems",
            JSON.stringify(items)
        );


        alert("Item added successfully!");


        document
            .getElementById("itemForm")
            .reset();


        showSection("items");

    });


// ===============================
// DISPLAY ALL ITEMS
// ===============================

function displayItems() {

    let container =
        document.getElementById("itemsContainer");

    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML =
            "<p>No items reported yet.</p>";

        return;

    }


    items.forEach(function(item) {

        createItemCard(item, container);

    });

}


// ===============================
// CREATE ITEM CARD
// ===============================

function createItemCard(item, container) {

    let card =
        document.createElement("div");

    card.classList.add("item-card");


    let typeClass =
        item.type === "Lost"
            ? "lost"
            : "found";


    card.innerHTML = `

        <h3>${item.itemName}</h3>

        <p class="${typeClass}">
            ${item.type} Item
        </p>

        <p>
            <strong>Category:</strong>
            ${item.category}
        </p>

        <p>
            <strong>Color:</strong>
            ${item.color}
        </p>

        <p>
            <strong>Location:</strong>
            ${item.location}
        </p>

        <p>
            <strong>Date:</strong>
            ${item.date}
        </p>

        <p>
            <strong>Description:</strong>
            ${item.description}
        </p>

    `;


    container.appendChild(card);

}


// ===============================
// SEARCH ALGORITHM
// ===============================

function searchItems() {

    let searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    let container =
        document.getElementById("itemsContainer");


    container.innerHTML = "";


    if (searchText === "") {

        displayItems();

        return;

    }


    let foundItems = [];


    // Linear Search

    for (let i = 0; i < items.length; i++) {

        let item = items[i];


        if (

            item.itemName
                .toLowerCase()
                .includes(searchText)

            ||

            item.category
                .toLowerCase()
                .includes(searchText)

            ||

            item.color
                .toLowerCase()
                .includes(searchText)

            ||

            item.location
                .toLowerCase()
                .includes(searchText)

        ) {

            foundItems.push(item);

        }

    }


    if (foundItems.length === 0) {

        container.innerHTML =
            "<p>No matching items found.</p>";

        return;

    }


    foundItems.forEach(function(item) {

        createItemCard(item, container);

    });

}


// ===============================
// SMART MATCHING
// ===============================

function calculateMatchScore(lost, found) {

    let score = 0;


    // Item name

    if (
        lost.itemName.toLowerCase() ===
        found.itemName.toLowerCase()
    ) {

        score += 30;

    }


    // Category

    if (
        lost.category.toLowerCase() ===
        found.category.toLowerCase()
    ) {

        score += 25;

    }


    // Color

    if (
        lost.color.toLowerCase() ===
        found.color.toLowerCase()
    ) {

        score += 20;

    }


    // Location

    if (
        lost.location.toLowerCase() ===
        found.location.toLowerCase()
    ) {

        score += 15;

    }


    // Date

    if (lost.date === found.date) {

        score += 10;

    }


    return score;

}


// ===============================
// FIND MATCHES
// ===============================

function findMatches() {

    let matchContainer =
        document.getElementById("matchContainer");


    matchContainer.innerHTML = "";


    let matches = [];


    // Compare Lost items with Found items

    for (let i = 0; i < items.length; i++) {

        if (items[i].type !== "Lost") {

            continue;

        }


        for (let j = 0; j < items.length; j++) {

            if (items[j].type !== "Found") {

                continue;

            }


            let score =
                calculateMatchScore(
                    items[i],
                    items[j]
                );


            if (score >= 50) {

                matches.push({

                    lost: items[i],

                    found: items[j],

                    score: score

                });

            }

        }

    }


    // Sort matches by highest score

    matches.sort(function(a, b) {

        return b.score - a.score;

    });


    if (matches.length === 0) {

        matchContainer.innerHTML = `
            <p>
                No possible matches found.
            </p>
        `;

        return;

    }


    // Display matches

    matches.forEach(function(match) {

        let card =
            document.createElement("div");

        card.classList.add("item-card");


        card.innerHTML = `

            <h3>
                Possible Match Found!
            </h3>

            <p>
                <strong>Lost Item:</strong>
                ${match.lost.itemName}
            </p>

            <p>
                <strong>Found Item:</strong>
                ${match.found.itemName}
            </p>

            <p>
                <strong>Location:</strong>
                ${match.found.location}
            </p>

            <p>
                <strong>Match Score:</strong>
                ${match.score}%
            </p>

        `;


        matchContainer.appendChild(card);

    });

}


// Display items when page loads

displayItems();




// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    let total = items.length;

    let lost = 0;
    let found = 0;
    let returned = 0;


    items.forEach(function(item) {

        if (item.type === "Lost") {
            lost++;
        }

        if (item.type === "Found") {
            found++;
        }

        if (item.status === "Returned") {
            returned++;
        }

    });


    document.getElementById("totalItems").textContent = total;

    document.getElementById("lostItems").textContent = lost;

    document.getElementById("foundItems").textContent = found;

    document.getElementById("returnedItems").textContent = returned;

}


// Update dashboard when page loads

updateDashboard();