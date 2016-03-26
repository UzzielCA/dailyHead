moment.locale("es");
var year = 2016
var numMonth = 3;

var myDataRef = new Firebase("https://dailyhead.firebaseio.com/");
//var dt = new Date();
var data = {};


var cal = new CalHeatMap();

cal.init({
  domain: "month",
  subDomain: "x_day",
  cellSize: 50,
  subDomainTextFormat: "%d",
  range: numMonth,
  displayLegend: false,
  cellPadding: 5,
  cellRadius: 10,
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
  scale: [1,2,3,4,5],
  data: data,
  onClick: function(date, count) {
    registerEvent(date, count);
  },
  legend: [2,4,6,8],
  legendColors: ["#510d63", "#f6fcfd"],
  domainLabelFormat: function (date) {
    return moment(date).format("MMMM YYYY").toUpperCase();
  },
  subDomainTitleFormat: {
    filled: "{count} episodios el {date}"
  },
  subDomainDateFormat: function (date) {
    return moment(date).format("LL");
  }
  });

  $("#jumpToday").on('click', function (event) {
    cal.jumpTo(new Date(), true);
  });


myDataRef.on("value", function(snapshot) {
  snapshot.forEach(function (argument) {
    getDatos(argument.val().date, argument.val().value);
  });
  cal.update(data);
});


function getDatos(date, value) {
  data[date] = value;

}

function registerEvent(date, count) {
  var newDate = date.getTime() / 1000;
  var newCount = count + 1;
  myDataRef.push({date: newDate,
                  value: newCount
                  });
}
