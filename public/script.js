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
  $('.list').on('click', '.complete', function() {
    var id = $(this).data('id');
    $(this).css('color', 'green');
    updateTask(id);


  });


  $('#outputDiv').on('click', '.delete', function() {
    var id = $(this).data('id');
    deleteTasks(id);
    getTask();
  });




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
  var list = $('.list');
  list.empty();
  // loop through response
  // append each to the dom
  for (var i = 0; i < response.length; i++) {
    list.append('<li>' + '<p>' + response[i].task + '</p>' + '<input class="chk" type="checkbox">' + '<button data-id ="' + response[i].id + '"class="complete">Completed</button>' + " " + '<button  data-id ="' + response[i].id + '" class="delete">Delete</button>' + '</li>');



  } // end for
}; // end displayTask


function deleteTasks(id) {
  console.log('delete button working');
  if (confirm('Are you sure you want to delete this task?')) {

    var objectToSend = {
      id: id

    };

    console.log(objectToSend);
    $.ajax({
      type: 'DELETE',
      url: '/delete',
      data: objectToSend,
      success: function(response) {
        console.log('back from server with:', response);
      }
    });
  } else {
    alert('Task not deleted');
  }
} //end delete_task

function updateTask(id) {
  console.log('update clicked');

  var objectToSend = {
    id: id

  };

  $.ajax({
    type: 'POST',
    url: '/update',
    data: objectToSend,
    success: function(response) {
      console.log('back from post call with:', response);

    } // end success
  }); // end ajax

}
