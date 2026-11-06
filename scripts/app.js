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
    $.ajax(// Async JavaScript XML
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

function updateTask(){
    $.ajax({
        type: "PUT", //HTTP verb: UPDATE
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/1", 
        data: JSON.stringify({
            title: "Hello",
            budget: 999999,
        }),
        contentType: "apploication/json",
        success: function(response){
            console.log(response);
        },
        error: function(fails){
            console.log(fails);
        }
    })
}

function loadTask(){
    $.ajax(// Async JavaScript XML
        {
            type: "get", //HTTP verb: READ
            url: serverName,
            success: function(response){
                console.log(response);
                 for(let i=0; i<response.length; i++){
                    displayTask(response[i]);
                }
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
    <div class="task" id="${task.id}" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
      <button class="btn-delete">Delete</button>
    </div>`;

  // Add to DOM
  $(".list").append(html);
}

function deleteTask(){
    console.log("Hello from the delete");
    // 1. This is the specific button that was clicked
    let btn = $(this);
    // 2. Find the parent
    let element = btn.parents(".task");
    // 3. Get the id
    let id = element.attr("id");
    console.log(id);
}

function init(){
    console.log("Hello from ch72");
    // hook the save buttom
    $("#btnSave").click(saveTask);
    // Let's try the delete button
    //$(".btn-delete").click(deleteTask);
    $(".list").on("click", ".btn-delete", deleteTask);

    // load data from the server
    loadTask();
}

window.onload = init;
// Force that the HTML and CSS gets resolved before the logic.