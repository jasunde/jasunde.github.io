function isTextNode(node) {
  return node && node.nodeType == 3;
}

function getElemAttr(elem, prop) {
  return elem.getAttribute(prop);
}

function setElemAttr(elem, prop, val) {
  // !!SIDE EFFECT!!
  return elem.setAttribute(prop, val);
}

function matchingStockId(id) {
  return function isStock(node) {
    return getStockId(node) == id;
  };
}

function isStockInfoChildElem(elem) {
    return /\bstock-/i.test( getClassName( elem ) );
}

function appendDOMChild(parentNode,childNode) {
    // !!SIDE EFFECTS!!
    parentNode.appendChild( childNode );
    return parentNode;
}

function setDOMContent(elem,html) {
    // !!SIDE EFFECTS!!
    elem.innerHTML = html;
    return elem;
}

var createElement = document.createElement.bind( document );

var getElemAttrByName = curry( reverseArgs( getElemAttr ), 2 );
var getStockId = getElemAttrByName( "data-stock-id" );
var getClassName = getElemAttrByName( "class" );

function stripPrefix(prefixRegex) {
  return function mapperFn(val) {
    return val.replace(prefixRegex, "");
  };
}

function listify(listOrItem) {
  if(!Array.isArray(listOrItem)) {
    return [ listOrItem ];
  }
  return listOrItem;
}

var getDOMChildren = pipe(
  listify,
  flatMap(
    pipe(
      curry( prop )( "childNodes" ),
      Array.from
    )
  )
);

function getStockElem(tickerElem, stockId) {
  return pipe(
    getDOMChildren,
    filterOut( isTextNode ),
    filterIn( matchingStockId( stockId ) )
  )
  ( tickerElem );
}

function getStockInfoChildElems(stockElem) {
  return pipe(
    getDOMChildren,
    filterOut( isTextNode ),
    filterIn( isStockInfoChildElem )
  )
  ( stockElem );
}

function addUpdateToStockHistories({id, change, price}, histories) {
  var newHistories = Object.assign({}, histories);

  var price = compose( parseFloat, stripPrefix(/\$/) )( price );

  var priceObj = {
    change: change,
    price: price,
    date: new Date()
  };

  if(newHistories.hasOwnProperty(id)) {
    newHistories[id].push(priceObj);
  } else {
    newHistories[id] = [priceObj];
  }
  return newHistories;
}


var stockTickerUI = {
  stockHistories: {},

  updateStockElems(stockInfoChildElemList,data) {
    var getDataVal = curry( reverseArgs( prop ), 2 )( data );
    var extractInfoChildElemVal = pipe(
      getClassName,
      stripPrefix( /\bstock-/ ),
      getDataVal
    );
    var orderedDataVals = map( extractInfoChildElemVal )( stockInfoChildElemList );
    var elemsValsTuples = filterOut( function updateValueMissing([infoChildElem, val]) {
      return val === undefined;
    } )
    ( zip( stockInfoChildElemList, orderedDataVals ) );

    
    // !!SIDE EFFECTS!!
    compose( each, spreadArgs )
    ( setDOMContent )
    ( elemsValsTuples );

    this.stockHistories = addUpdateToStockHistories(data, this.stockHistories);
    drawStocks(this.stockHistories);
  },

  updateStock(tickerElem,data) {
    var getStockElemFromId = curry( getStockElem )( tickerElem );
    var stockInfoChildElemList = pipe(
      getStockElemFromId,
      getStockInfoChildElems
    )
    ( data.id );

    return stockTickerUI.updateStockElems(
      stockInfoChildElemList,
      data
    );
  },

  addStock(tickerElem,data) {
    var [stockElem, ...infoChildElems] = map(
      createElement
    )
    ( [ "li", "span", "span", "span" ] );
    var attrValTuples = [
      [ ["class","stock"], ["data-stock-id",data.id] ],
      [ ["class","stock-name"] ],
      [ ["class","stock-price"] ],
      [ ["class","stock-change"] ]
    ];
    var elemsAttrsTuples =
      zip( [stockElem, ...infoChildElems], attrValTuples );

    // !!SIDE EFFECTS!!
    each( function setElemAttrs([elem,attrValTupleList]){
      each(
        spreadArgs( partial( setElemAttr, elem ) )
      )
      ( attrValTupleList );
    } )
    ( elemsAttrsTuples );

    // !!SIDE EFFECTS!!
    stockTickerUI.updateStockElems( infoChildElems, data );
    reduce( appendDOMChild )( stockElem )( infoChildElems );
    tickerElem.appendChild( stockElem );
  }
};

var ticker = document.getElementById( "stocks" );

var stockTickerUIMethodsWithDOMContext = map(
    curry( reverseArgs( partial ), 2 )( ticker )
)
( [ stockTickerUI.addStock, stockTickerUI.updateStock ] );

var subscribeToObservable =
    pipe( uncurry, spreadArgs )( unboundMethod( "subscribe" ) );

var stockTickerObservables = [ newStocks, stockUpdates ];

// !!SIDE EFFECTS!!
each( subscribeToObservable )
( zip( stockTickerUIMethodsWithDOMContext, stockTickerObservables ) );

