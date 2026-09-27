// Get existing items from browser storage
let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];


// Show selected section

function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    if (sectionId === "items") {
        displayItems();
    }
}


// Add new item

document.getElementById("itemForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let type = document.getElementById("type").value;
    let itemName = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let color = document.getElementById("color").value;
    let location = document.getElementById("location").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;


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


    items.push(item);


    // Save items

    localStorage.setItem(
        "lostFoundItems",
        JSON.stringify(items)
    );


    alert("Item added successfully!");


    // Reset form

    document.getElementById("itemForm").reset();


    // Open items section

    showSection("items");

});


// Display items

function displayItems() {

    let container = document.getElementById("itemsContainer");

    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML =
            "<p>No items reported yet.</p>";

        return;
    }


    items.forEach(function(item) {

        let card = document.createElement("div");

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

            <p><strong>Category:</strong>
                ${item.category}
            </p>

            <p><strong>Color:</strong>
                ${item.color}
            </p>

            <p><strong>Location:</strong>
                ${item.location}
            </p>

            <p><strong>Date:</strong>
                ${item.date}
            </p>

            <p><strong>Description:</strong>
                ${item.description}
            </p>

        `;


        container.appendChild(card);

    });

}


// Display items when page loads

displayItems();