function saveTask(){
    // 1. Get Values from the DOM
    const title = $("#txtTitle").val().trim();
    const desc = $("#txtDescription").val().trim();
    const color = $("#selColor").val().trim();
    const date = $("#selDate").val().trim();
    const status = $("#selStatus").val().trim();
    const budget = $("#numBudget").val().trim();
    // 2. Create an Object usinf our Class
    const taskToSave = new Task(title, desc, color, date, status, budget);
}

function init(){
    console.log("Hello from ch72");
    hello();
}

window.onload = init;
// Force that the HTML and CSS gets resolved before the logic.