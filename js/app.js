moment.locale("es");
var year = new Date().getFullYear();
var month = new Date().getMonth();
var numMonth = 3;

var myDataRef = new Firebase("https://dailyhead.firebaseio.com/");
var data = {};


var cal = new CalHeatMap();
var cal1 = new CalHeatMap();

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
  highlight: ['now'],
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
  },
  maxDate:new Date(year, month)
 });

  $("#jumpToday").on('click', function (event) {
    cal.jumpTo(new Date(), true);
  });

cal1.init({
    itemSelector: "#cal-heatmap2",
    data: data,
    domain: "day",
    subDomain: "x_hour",
    subDomainTextFormat: function (date, value) {
        return new Date(date).getHours();
    },
    range: 1,
    cellSize: 25,
    displayLegend: false,
    cellPadding: 5,
    tooltip: true,
    animationDuration: 1500,
    legend: [2, 4, 6, 8],
    legendColors: ["#510d63", "#f6fcfd"],
    cellRadius: 10,
    domainGutter: 12,
    domainMargin: 12,
    label: {
		position: "left",
		offset: {
			x: 20,
			y: 12
	    },
	    width: 110
    },
    verticalOrientation: true,
    domainDynamicDimension: false
})

myDataRef.on("value", function(snapshot) {
  snapshot.forEach(function (argument) {
    getDatos(argument.val().date, argument.val().value);
  });
  cal.update(data);
  cal1.update(data);
});


function getDatos(date, value) {
    console.log(date);
  data[date] = value;
}

function registerEvent(date, count) {
  var newDate = date.getTime() / 1000;
  var newCount = count + 1;
  myDataRef.push({date: newDate,
                  value: newCount
                  });
}

$("#domainDynamicDimension-next").on("click", function (e) {
    e.preventDefault();
    if (!cal.next()) {
        alert("No hay mas datos para ver");
    }
})
