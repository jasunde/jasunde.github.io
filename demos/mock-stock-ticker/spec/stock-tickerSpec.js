describe('isTextNode', function () {
  var node = {
    nodeType: 3
  };

  it('should return true if the node is a text node', function () {
    expect(isTextNode(node)).toBe(true);
  })
})

describe('getElemAttr', function () {
  var el = {
    getAttribute: function (attr) { return attr; }
  };

  it('should call the getAttribute method on an object with a given string', function () {
    expect(getElemAttr(el, 'attr')).toEqual('attr');
  });
});

describe('setElemAttr', function () {
  var el = {
    setAttribute: function (attr, val) { return [attr, val]; }
  };

  it('should call the setAttribute method on an object with a give attribute and value', function () {
    expect(setElemAttr(el, 'attr', 'val')).toEqual(['attr', 'val']);
  });
});

describe('matchingStockId', function () {

  var stock1 = {
    getAttribute: () => 1
  };

  var stock4 = {
    getAttribute: () => 4
  };
  
  var match1 = matchingStockId(1);
  var match4 = matchingStockId(4);

  it('should return a function that matches a given stock with a given id', function () {
    expect(match1(stock1)).toBe(true);
    expect(match1(stock4)).toBe(false);
    expect(match4(stock4)).toBe(true);
  });
});

describe('getElemAttrByName', function () {
  var el = {
    getAttribute: (attr) => attr
  };

  it('should be a curried function that takes first a prop and then an element', function () {
    expect(getElemAttrByName('attr')(el)).toEqual('attr');
  });
});

describe('getStockId', function () {
  var stock = {
    "data-stock-id": 4,
    getAttribute: function (attr) { return this[attr]; }
  };

  it('should return the data-stock-id property of a stock', function () {
    expect(getStockId(stock)).toEqual(4);
  });
});

describe('isStockInfoChildElem', function () {
  var stock1 = {
    class: "stock-name",
    getAttribute: function (attr) { return this[attr]; }
  };
  var stock2 = {
    class: "cars stock-name",
    getAttribute: function (attr) { return this[attr]; }
  };
  var stock3 = {
    class: "cars name",
    getAttribute: function (attr) { return this[attr]; }
  };

  it('should return true if a class contains stock-', function () {
    expect(isStockInfoChildElem(stock1)).toBe(true);
    expect(isStockInfoChildElem(stock2)).toBe(true);
  });

  it('should return false if class does not contain stock-', function () {
    expect(isStockInfoChildElem(stock3)).toBe(false);
  });

});

