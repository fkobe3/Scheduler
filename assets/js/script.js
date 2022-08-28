var toDos = {};
var currentDate = moment().format("MMDDYY");

$("#currentDay").text(moment().format('dddd, MMMM Do'));

$(".description").on("click", function() {
    var text = $(this).find("p")
      .text()
      .trim();
  
    var textInput = $("<textarea>")
      .addClass("form-control")
      .val(text);
    
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
  });

$(".saveBtn").on("click", "p", function() {
    
    var myTarget = $(this).closest(".row");
    
    if (myTarget.has("textarea").length > 0 ) {
        
        textInput = myTarget.find(".description textarea");
        var text = textInput.val().trim();
        
        var textP = $("<p>").text(text);
        textInput.replaceWith(textP);

        var timeBlock = "time-Block-" + myTarget.find(".description").first().attr("time-block"); // '09'

        toDos[timeBlock] = text;
        localStorage.setItem('toDos-'+currentDate, JSON.stringify(toDos));
    }
    else {
        console.log("Has NO textArea");
    }

  })

var timeBlocks = function() {
    descCol = $(".description");
    currentTime = moment().format('HH');

    for (let i=0; i < descCol.length; i++){
        var timeBlockHour = descCol[i].getAttribute("time-block");
        var classAttr = descCol[i].getAttribute("class");
        
        if (timeBlockHour < currentTime) {
            classAttr = classAttr + " past";
            descCol[i].setAttribute("class", classAttr);
        }
        else if (timeBlockHour === currentTime) {
            classAttr = classAttr + " present";
            descCol[i].setAttribute("class", classAttr);
        }
        else {
            classAttr = classAttr + " future";
            descCol[i].setAttribute("class", classAttr);
        }
    }
};

var loadToDos = function() {
    
    toDos = JSON.parse(localStorage.getItem('toDos-'+ currentDate)) || {};

    $.each(toDos, function(key,val){
        
        var blockNum = key.slice(-2); 
        var descCol = "[time-block='" + blockNum + "'] p"; 
        $(descCol).text(val);
    });
};

setInterval(function () {
    timeBlocks();
  }, 1800000);

timeBlocks();
loadToDos();