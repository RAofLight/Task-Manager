function saveTask(){
    // 1. Get Values from the DOM
    const title = $("#txtTitle").val().trim();
    const desc = $("#txtDescription").val().trim();
    const color = $("#selColor").val().trim();
    const date = $("#selDate").val().trim();
    const status = $("#selStatus").val().trim();
    const budget = $("#numBudget").val().trim();
    // 2. Create an Object using our Class
    const taskToSave = new Task(title, desc, color, date, status, budget);
    // 3. Send to Server
    $.ajax(
        {
            type: "POST", // HTTP verb: CREATE
            url: serverName, 
            data: JSON.stringify(taskToSave),
            contentType: "application/json",
            success: function(response){
                console.log(response);
            },
            error: function(fails){
                console.log(fails);
            }
        }
    )
}

// this URL it is the server
const serverName = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTask(){
    $.ajax(
        {
            type: "get", //HTTP verb: READ
            url: serverName,
            success: function(response){
                console.log(response);
            },
            error: function(fail){
                console.log(fail);
            }
        }
    )
}

function displayTask(task) {
  // Template literal using backticks
  let html = `
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
    </div>`;

  // Add to DOM
  $(".list").append(html);
}

function init(){
    console.log("Hello from ch72");
    // hook the save buttom
    $("#btnSave").click(saveTask);

    // load data from the server
    loadTask();
}

window.onload = init;
// Force that the HTML and CSS gets resolved before the logic.