$(document).ready(function() {
  console.log('JQ');

  $('#addTask').on('click', function() {
    // get user input
    var userInput = {
      task: $('#tasks').val(),
      complete: false
    }; //end userInput
    addTask(userInput);
    $('#outputDiv').on('click', '#delete', deleteTask);

  }); // end on click

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
      $('#tasks').empty();
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

var displayTask = function(imagesArray) {
  // output div
  var outputDiv = $('#outputDiv');
  outputDiv.empty();
  // loop through imagesArray
  // append each to the dom
  for (var i = 0; i < imagesArray.length; i++) {
    outputDiv.append('<p>' + imagesArray[i].task + " " + imagesArray[i].complete + '</p>' + '<button id="complete">Complete</button>' + '<button id="delete">Delete</button>');

  } // end for
}; // end displayTask
function deleteTask() {
  console.log('clicked delete');
}
