// const db = require("./db")

document.addEventListener("DOMContentLoaded", function(event) {
   
  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)
  
  // Validate that all variables exist
  if(toggle && nav && bodypd && headerpd){
  toggle.addEventListener('click', ()=>{
  // show navbar
  nav.classList.toggle('show')
  // change icon
  toggle.classList.toggle('bx-x')
  // add padding to body
  bodypd.classList.toggle('body-pd')
  // add padding to header
  headerpd.classList.toggle('body-pd')
  })
  }
  }
  
  showNavbar('header-toggle','nav-bar','body-pd','header')
  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink(){
  if(linkColor){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
  }
  }
  linkColor.forEach(l=> l.addEventListener('click', colorLink))
  
   // Your code to run since DOM is loaded and ready
  });
//  End of the navbar javascript


// Todo fucntions
//******************************
//function that adds the task to the page on form submit
function addTask() {
  event.preventDefault();
  
  var form = document.querySelector("#taskForm");
  var newTask = { description: form.text.value };
  
  taskList.tasks.push(newTask);
  
  drawList();//call to the function that appends the elements to the the page 
  //  changeColor(); // call to the function that changes the color of the easy, moderate, or hard labels
  
  // var d = document.getElementById("difficulty");
  // var checkedName = document.querySelector('input[name="assignto"]:checked').value;
  // var dropDown = d.options[d.selectedIndex].value;

}

//Variable array for tasks
//******************************


var task1 = {
  assignto: "",
      Date: "",
      description: ""
};

function loadTask(task1){
  
  let sql = `SELECT name, end_date, text FROM events`;
  db.query(sql, function (err, results) {
  if (err) throw err;  
  // task1 = {
  //       assignto: results.name,
  //       Date: results.end_date,
  //       description: results.text
  // }; 
  results.forEach(result => {
    task1[result.userID] = {
      assignto: result.name,
      Date: result.end_date,
      description: result.text
    };
  });


  
  
  })

}

// loadTask();
var taskList = {
  tasks: [task1]
};

//function that appends the elements to the the page 
//******************************
function drawList() {
  var listCont = document.getElementById("list-container");
  var list = document.createElement("ul");
  for (var i = 0; i < taskList.tasks.length; i++) {
    var d = document.getElementById("date");
    var p = document.getElementById("person")
    var item = document.createElement("li");
    var item2 = document.createElement("li");
    var item3 = document.createElement("li");
    item.innerHTML = p.options[p.selectedIndex].value;
    item2.innerHTML = d.value;
    item3.innerHTML = "<b>Task:</b> " + taskList.tasks[i].description;
  }
    list.appendChild(item).setAttribute("class", "person");
    list.appendChild(item2).setAttribute("class", "task-date");
    list.appendChild(item3).setAttribute("class", "task-descrip");
    listCont.appendChild(list);
    
}

window.onload = function() {
  loadTask(task1)
  drawList();
  var form = document.querySelector("form");
  form.onSubmit = addTask;
};

//function changes the css background color depending 
// on the inner html being easy, moderate, or hard
//******************************
// End of to do function





