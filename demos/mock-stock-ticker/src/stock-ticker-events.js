var server = connectToServer();

var formatDecimal = unboundMethod( "toFixed")( 2 );
var formatPrice = pipe( formatDecimal, formatCurrency );
var formatChange = pipe( formatDecimal, formatSign );
var processNewStock = pipe( addStockName, formatStockNumbers );

var makeObservableFromEvent = curry( Rx.Observable.fromEvent, 2 )( server );

var observableMapperFns = [ processNewStock, formatStockNumbers ];

var [ newStocks, stockUpdates ] = pipe(
  map( makeObservableFromEvent ),
  curry( zip )( observableMapperFns ),
  map( spreadArgs( transformObservable ) )
)
( [ "stock", "stock-update" ] );

/**
 * Add prop 'name' equal to value of prop 'id'
 *
 * @param {object} stock a financial stock
 * @returns {object}
 */
function addStockName(stock) {
  return setProp( "name", stock, stock.id );
}

function formatSign(val) {
  if(Number(val) > 0) {
    return `+${val}`;
  }
  return val;
}

function formatCurrency(val) {
  return `$${val}`;
}

function transformObservable(mapperFn, obsv) {
  return obsv.map(mapperFn);
}

function formatStockNumbers(stock) {
  let updateTuples = [
    ["price", formatPrice( stock.price )],
    ["change", formatChange( stock.change )]
  ];

  return reduce(function formatter(stock, [propName, val]) {
    return setProp(propName, stock, val);
  })
  ( stock )
  ( updateTuples );
}

