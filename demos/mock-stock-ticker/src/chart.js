var svg = d3.select("svg"),
	margin = {top: 20, right: 20, bottom: 30, left: 50},
	height = +svg.attr("height") - margin.top - margin.bottom,
	width = +svg.attr("width") - margin.right - margin.left,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
	.rangeRound([0, width]);

var y = d3.scaleLinear()
	.rangeRound([height, 0]);

var line = d3.line()
	.x( function(d) { return x(d.date); } )
	.y( function(d) { return y(d.price); } );

var extent = curry( reverseArgs( d3.extent ), 2);
var extentOfDate = extent( function(d) { return d.date } );
var extentOfPrice = extent( function(d) { return d.price } );

function drawLine(data, stock) {
  g.selectAll(".axis-bottom")
    .remove();

  g.append("g")
    .attr("class", "axis-bottom")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.selectAll(".axis-left")
    .remove();

  g.append("g")
    .attr("class", "axis-left")
    .call(d3.axisLeft(y));

  g.selectAll("." + stock)
    .remove();

  g.append("path")
    .datum(data)
    .attr("class", stock)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

function drawStocks(data) {
  var allStocks = flatMapStocks(data)
  x.domain(extentOfDate(allStocks));
  y.domain(extentOfPrice(allStocks));

  for(stock in data) {
    drawLine(data[stock], stock)
  }
}

function drawStock(data){
  var stockName = 'AAPL';
  var oneStock = data[stockName];
  x.domain(extentOfDate(oneStock));
  y.domain(extentOfPrice(oneStock));

  drawLine(oneStock, stockName);
}

var concat = unboundMethod('concat', 2);

function flatMapStocks(data) {
  var keys = Object.keys(data);
  var getData = curry( reverseArgs( prop ), 2 )( data );
  return flatMap(getData)(keys);
}
