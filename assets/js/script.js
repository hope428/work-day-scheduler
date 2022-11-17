$(function () {
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  //
  // TODO: Add code to display the current date in the header of the page.

  var date = dayjs()
  var displayDate = date.format('dddd, MMMM D[th]')
  var currentTime = parseInt(date.format('HH'))
  var dayDisplayEl = $('#currentDay')
  var save = $(".saveBtn");

  dayDisplayEl.text(displayDate)
  //creates array of all hour-* ids
  var hours = [];
  $.each($(".time-block"), function () {
    hours.push($(this).attr("id"));
  });

  //add classes to divs
  function addColorClass() {
    //for each time-block, taking the number off the id attached
    $.each($(".time-block"), function(index, hour){
      var hourNumber = $(hour).attr('id')
      hourNumber = parseInt(hourNumber.slice(5))
      //comparing the timeblock hour to the current hour to assign class
      if(hourNumber < currentTime){
        $(hour).addClass('past')
      } else if (hourNumber === currentTime){
        $(hour).addClass('present')
      } else {
        $(hour).addClass('future')
      }
    })
  }
  //saves input task to local storage
  function saveEvent(event) {
    //targets the sibling of the selected button
    var selected = $(this).parent().attr("id");
    //retrieves input
    var task = $(this).siblings("textarea").val().trim();
    //saves it to localstorage using the selected id as the localstorage key
    localStorage.setItem(selected, JSON.stringify(task));
  }

  // //for each hour-*, retrieve local storage with hour-* key
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
  addColorClass()
});
