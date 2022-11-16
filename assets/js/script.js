$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  var save = $(".saveBtn");
  var hours = [
    "hour-9",
    "hour-10",
    "hour-11",
    "hour-12",
    "hour-13",
    "hour-14",
    "hour-15",
    "hour-16",
    "hour-17",
  ];

  function saveEvent(event) {
    var selected = $(this).parent().attr("id");
    var task = $(this).siblings("textarea").val().trim();

    localStorage.setItem(selected, JSON.stringify(task));
  }

  //for each hour-*, retrieve local storage with hour-* key
  function getEvents() {
    if (localStorage) {
      $.each(hours, function (index, hour) {
        var retrievedTask = JSON.parse(localStorage.getItem(hour));
        $("#" + hour)
          .children("textarea")
          .val(retrievedTask);
      });
    }
  }

  save.on("click", saveEvent);
  getEvents();
});
