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

var displayTask = function(imagesArray) {
  // output div
  var outputDiv = $('#outputDiv');
  outputDiv.empty();
  // loop through imagesArray
  // append each to the dom
  for (var i = 0; i < imagesArray.length; i++) {
    outputDiv.append('<p>' + imagesArray[i].task + '</p>' + '<input class="chk" type="checkbox">' + '<button class="complete">Completed</button>' + " " + '<button class="delete">Delete</button>');

  } // end for
}; // end displayTask
