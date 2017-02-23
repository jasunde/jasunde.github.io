describe('addStockName', function () {

  it('should add a name property to the stock equal to the stock id', function () {
    expect(addStockName({id: "AAPL"})).toEqual({id: "AAPL", name: "AAPL"});
    expect(addStockName({id: "MSFT"})).toEqual({id: "MSFT", name: "MSFT"});
  });
});

describe('formatSign', function () {
  it('should return a value with a + or - sign before it', function () {
    expect(formatSign(-1)).toEqual(-1);
    expect(formatSign(1)).toEqual('+1');
  });
});

describe('formatCurrency', function () {
  it('should return a value with a $ sign', function () {
    expect(formatCurrency(-0.15)).toEqual('$-0.15');
    expect(formatCurrency(1.23)).toEqual('$1.23');
  });
});

xdescribe('transformObservable', function () {
  it('should create a function to map an observable with a given mapping function', function () {
    // expect(transformObservable()).toEqual()
  })
})

describe('formatStockNumbers', function () {
  it('should return a new stock object with properly formatted price and change props', function () {
    expect(formatStockNumbers({id: "AAPL", price: 121.7, change: 0.01}))
      .toEqual({id: "AAPL", price: "$121.70", change: "+0.01"})
    expect(formatStockNumbers({id: "AAPL", price: 121.7, change: -0.02}))
      .toEqual({id: "AAPL", price: "$121.70", change: '-0.02'})
  })
})

describe('formatDecimal', function () {
  it('should return a number with two decimal places', function () {
    expect(formatDecimal(1)).toEqual('1.00');
    expect(formatDecimal(.5)).toEqual('0.50');
    expect(formatDecimal(2.3457)).toEqual('2.35');
  });
});

describe('formatPrice', function () {
  it('should format a price with two decimal places and a dollar sign', function () {
    expect(formatPrice(127.100)).toEqual('$127.10');
    expect(formatPrice(2)).toEqual('$2.00');
  });
});

describe('formatStockNumbers', function () {
  it('should return a new stock object with properly formatted price and change props', function () {
    expect(processNewStock({id: "AAPL", price: 121.7, change: 0.01}))
      .toEqual({id: "AAPL", price: "$121.70", change: "+0.01", name: "AAPL"})
    expect(processNewStock({id: "MSFT", price: 121.7, change: -0.02}))
      .toEqual({id: "MSFT", price: "$121.70", change: '-0.02', name: "MSFT"})
  })
})

