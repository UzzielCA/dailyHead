var year = 2016
var numMonth = 3;

var myDataRef = new Firebase("https://dailyhead.firebaseio.com/");
//var dt = new Date();
var data = {};

var experiment ;
myDataRef.on("value", function(snapshot) {

  snapshot.forEach(function (argument) {
    getDatos(argument.val().date, argument.val().value);
  });
  createCalendar();
});

function getDatos(date, value) {
  data[date] = value;

}
var cal = new CalHeatMap();

function createCalendar() {
  cal = new CalHeatMap();
  cal.init({
    domain: "month",
    subDomain: "x_day",
    cellSize: 50,
    subDomainTextFormat: "%d",
    range: numMonth,
    displayLegend: false,
    cellPadding: 5,
    cellRadius: 51,
    domainGutter: 12,
    domainMargin: 12,
    nextSelector: "#domainDynamicDimension-next",
    previousSelector: "#domainDynamicDimension-previous",
    domainDynamicDimension: false,
    label: {
      position: 'top'
    },
    tooltip: true,
    start: new Date(),
    highlight: ['now', data],
    animationDuration: 1500,
    scale: [2,4,6,8,10],
    data: data,
    onClick: function(date, count) {
      registerEvent(date, count);
    },
    legend: [2,4,6,8],
    domainLabelFormat: "%B %Y",
  });

  $("#jumpToday").on('click', function (event) {
    cal.jumpTo(new Date(), true);
  });

};

function registerEvent(date, count) {
  var newDate = date.getTime() / 1000|0;
  var newCount = count + 1;
  cal = cal.destroy();
  myDataRef.push({date: newDate,
                  value: newCount
                  });

}
