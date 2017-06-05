$(document).ready(function() {
  console.log('JQ');

  $('#addTask').on('click', function() {
    // get user input
    var userInput = {
      task: $('#tasks').val(),
      complete: false

    }; //end userInput
    addTask(userInput);
    $('.input').val('');

  }); // end on click
  $('#outputDiv').on('click', '.delete', deleteTask);


  // init page
  getTask();


}); // end doc ready

var addTask = function(objectToSend) {
  // test get call to server
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: objectToSend,
    success: function(response) {
      console.log('back from post call with:', response);

    } // end success
  }); // end ajax

}; // end getTask

var getTask = function() {
  // test get call to server
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function(response) {
      console.log('back from get call with:', response);
      displayTask(response);
    } // end success
  }); // end ajax
}; // end getTask

var displayTask = function(response) {
  // output div
  var outputDiv = $('#outputDiv');
  outputDiv.empty();
  // loop through response
  // append each to the dom
  for (var i = 0; i < response.length; i++) {
    outputDiv.append('<p>' + response[i].task + '</p>' + response[i].id + '<input class="chk" type="checkbox">' + '<button class="complete">Completed</button>' + " " + '<button class="delete">Delete</button>');

  } // end for
}; // end displayTask

// deleting a task from a database
function deleteTask() {
  console.log('deleteTask entered');
  var intId = Number(this.id);
  var taskToDelete = {
    id: intId
  };

  if (confirm("There's always next time!")) {
    // your deletion code

    console.log('taskToDelete', taskToDelete);
    $.ajax({
      type: 'DELETE',
      url: '/deleteTask',
      data: taskToDelete,
      success: function(response) {
        console.log('back from the server with tasktoDelete response', response);
      } // end success
    }); //end ajax call
    $('#tasks').empty();
    displayTask();

  } else {
    return false;
  }
} // end deleteTask
