let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

// Update range values
gridWidth.addEventListener("input", () => widthValue.innerText = gridWidth.value);
gridHeight.addEventListener("input", () => heightValue.innerText = gridHeight.value);

// Create grid function
gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    for (let i = 0; i < gridHeight.value; i++) {
        let row = document.createElement("div");
        row.classList.add("gridRow");
        for (let j = 0; j < gridWidth.value; j++) {
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.addEventListener(events.mouse.down, startPainting);
            col.addEventListener(events.mouse.move, paint);
            col.addEventListener(events.touch.down, startPainting);
            col.addEventListener(events.touch.move, paint);
            row.appendChild(col);
        }
        container.appendChild(row);
    }
});

// Painting logic
function startPainting(e) {
    draw = true;
    paint(e);
}

function paint(e) {
    if (!draw) return;
    let target = e.target;
    if (target.classList.contains("gridCol")) {
        target.style.backgroundColor = erase ? "white" : colorButton.value;
    }
}

document.addEventListener(events.mouse.up, () => draw = false);
document.addEventListener(events.touch.up, () => draw = false);

// Clear grid
clearGridButton.addEventListener("click", () => {
    document.querySelectorAll(".gridCol").forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});

// Erase mode
eraseBtn.addEventListener("click", () => {
    erase = true;
    eraseBtn.style.backgroundColor = "#d9534f"; // Red to indicate erasing
    paintBtn.style.backgroundColor = "#5cb85c"; // Green for painting
});

// Paint mode
paintBtn.addEventListener("click", () => {
    erase = false;
    paintBtn.style.backgroundColor = "#ff4081"; // Pinkish to indicate selection
    eraseBtn.style.backgroundColor = "#5cb85c"; // Back to default green
});
