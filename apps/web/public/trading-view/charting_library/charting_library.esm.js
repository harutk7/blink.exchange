// TradingView charting library ESM stub - proprietary library not included in public repo
export class widget {
  constructor(options) {
    this._options = options;
    this._callbacks = [];
  }
  onChartReady(cb) { this._callbacks.push(cb); }
  chart(index = 0) { return this._getChartStub(); }
  activeChart() { return this._getChartStub(); }
  charts() { return [this._getChartStub()]; }
  remove() {}
  setSymbol(symbol, interval, callback) { if (callback) callback(); }
  changeTheme(theme) {}
  takeScreenshot() {}
  save(callback) { if (callback) callback({}); }
  load(state) {}
  subscribe(event, callback) {}
  unsubscribe(event, callback) {}
  headerReady() { return Promise.resolve(); }
  _getChartStub() {
    return {
      onChartReady: (cb) => cb(),
      symbolInterval: () => ({ symbol: '', interval: '' }),
      setSymbol: (s, i, cb) => { if (cb) cb(); },
      createOrderLine: () => this._getOrderLineStub(),
      createPositionLine: () => this._getPositionLineStub(),
      createPriceLine: () => ({ setPrice() {}, setTitle() {}, setBodyTextColor() {}, setBodyBackgroundColor() {}, setBorderColor() {}, setLineStyle() {}, setLineWidth() {}, }),
      removePriceLine: () => {},
      crosshairMoved: () => ({ subscribe: () => {}, unsubscribe: () => {} }),
      priceFormatter: () => ({ format: (p) => String(p) }),
      series: () => ({ data: () => [], setData: () => {}, applyOptions: () => {}, priceScale: () => ({ applyOptions: () => {} }) }),
      timeScale: () => ({ getVisibleRange: () => ({ from: 0, to: 0 }), setVisibleRange: () => {}, scrollToPosition: () => {}, scrollToRealTime: () => {} }),
      mainSeriesPriceScale: () => ({ width: () => 0, applyOptions: () => {} }),
      getVisibleRange: () => ({ from: 0, to: 0 }),
      setVisibleRange: () => {},
      getVisiblePriceRange: () => ({ from: 0, to: 0 }),
      setVisiblePriceRange: () => {},
      resetData: () => {},
      clearMarks: () => {},
      refreshMarks: () => {},
      remove: () => {},
      onSymbolChanged: () => ({ subscribe: () => {}, unsubscribe: () => {} }),
      onDataUpdated: () => {},
      onVisibleRangeChanged: () => {},
      dataReady: (cb) => { if (cb) cb(); },
    };
  }
  _getOrderLineStub() {
    const self = {};
    const chain = (fn) => { fn(); return self; };
    self.setPrice = (p) => chain(() => {});
    self.setText = (t) => chain(() => {});
    self.setTooltip = (t) => chain(() => {});
    self.setQuantity = (q) => chain(() => {});
    self.setQuantityBackgroundColor = (c) => chain(() => {});
    self.setQuantityTextColor = (c) => chain(() => {});
    self.setQuantityBorderColor = (c) => chain(() => {});
    self.setBodyTextColor = (c) => chain(() => {});
    self.setBodyBackgroundColor = (c) => chain(() => {});
    self.setBodyBorderColor = (c) => chain(() => {});
    self.setLineColor = (c) => chain(() => {});
    self.setLineWidth = (w) => chain(() => {});
    self.setLineStyle = (s) => chain(() => {});
    self.movePrice = (p) => chain(() => {});
    self.setEditable = (e) => chain(() => {});
    self.setCancellable = (c) => chain(() => {});
    self.setModifyTooltip = (t) => chain(() => {});
    self.setCancelTooltip = (t) => chain(() => {});
    self.getPrice = () => 0;
    self.onCancel = (cb) => self;
    self.onMove = (cb) => self;

    self.remove = () => {};
    return self;
  }
  _getPositionLineStub() {
    return this._getOrderLineStub();
  }
}
