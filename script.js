$(function () {
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    var timeBlocks = $(".time-block");
    var prevHours = 3;
    var nextHours = 5;

    timeBlocks.each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      var hourDiff = blockHour - currentHour;
      console.log("blockHour:", blockHour, "hourDiff:", hourDiff);

      if (hourDiff >= -prevHours && hourDiff <= nextHours) {
        $(this).show();
        if (hourDiff < 0) {
          $(this).removeClass("future").addClass("past");
        } else if (hourDiff === 0) {
          $(this).removeClass("past future").addClass("present");
        } else if (hourDiff >= 0 && hourDiff <= nextHours) {
          $(this).removeClass("past present").addClass("future");
        }
      } else {
        $(this).hide();
      }
    });
  }

  function loadEvents() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockId);

      if (savedEvent !== null) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(blockId, userInput);
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  updateTimeBlocks();

  setInterval(function () {
    if (dayjs().hour() !== currentHour) {
      currentHour = dayjs().hour();
      updateTimeBlocks();
    }
  }, 60000);

  loadEvents();
});
