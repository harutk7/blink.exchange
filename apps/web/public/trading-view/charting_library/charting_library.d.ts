// TradingView charting library stub - proprietary library not included in public repo
export type ResolutionString = string;
export type DatafeedErrorCallback = (reason: string) => void;
export type HistoryCallback = (bars: Bar[], meta?: { noData?: boolean }) => void;
export type TimeFrameItem = { text: string; resolution: ResolutionString; description: string };

export type LanguageCode = string;
export type AvailableSaveloadVersions = '1.0' | '1.1';

export interface Bar { time: number; open: number; high: number; low: number; close: number; volume?: number; }
export interface LibrarySymbolInfo { name: string; full_name?: string; description: string; type: string; session: string; exchange: string; timezone: string; pricescale: number; minmov: number; supported_resolutions?: ResolutionString[]; has_intraday?: boolean; has_daily?: boolean; has_weekly_and_monthly?: boolean; has_no_volume?: boolean; ticker?: string; listed_exchange?: string; format?: string; volume_precision?: number; data_status?: string; library_custom_fields?: any; }
export interface SearchSymbolResultItem { symbol: string; full_name: string; description: string; exchange: string; type: string; }
export interface IPriceLine { setPrice(price: number): void; setTitle(title: string): void; setBodyTextColor(color: string): void; setBodyBackgroundColor(color: string): void; setBorderColor(color: string): void; setLineStyle(style: number): void; setLineWidth(width: number): void; }
export interface ISeriesApi { data(): any; }
export interface IPaneApi { getSeries(): ISeriesApi[]; }
export interface ITimeScaleApi { getVisibleRange(): { from: number; to: number }; setVisibleRange(range: { from: number; to: number }): void; }
export interface IPriceScaleApi { width(): number; }
export interface IChartWidgetApi {
  onChartReady(callback: () => void): void;
  symbolInterval(): { symbol: string; interval: string } | null;
  setSymbol(symbol: string, interval: string, callback?: () => void): void;
  createOrderLine(options?: any): IOrderLineAdapter;
  createPositionLine(options?: any): IPositionLineAdapter;
  createPriceLine(options: any): IPriceLine;
  removePriceLine(line: IPriceLine): void;
  crosshairMoved(): any;
  priceFormatter(): { format: (price: number) => string };
  series(): ISeriesApi;
  timeScale(): ITimeScaleApi;
  mainSeriesPriceScale(): IPriceScaleApi;
  getVisibleRange(): { from: number; to: number };
  setVisibleRange(range: { from: number; to: number }): void;
  getVisiblePriceRange(): { from: number; to: number };
  setVisiblePriceRange(range: { from: number; to: number }): void;
  resetData(): void;
  clearMarks(): void;
  refreshMarks(): void;
  remove(): void;
  onSymbolChanged(): any;
  onDataUpdated(callback: () => void): void;
  onVisibleRangeChanged(callback: () => void): void;
  dataReady(callback: () => void): void;
}
export interface IOrderLineAdapter {
  setPrice(price: number): IOrderLineAdapter;
  setText(text: string): IOrderLineAdapter;
  setTooltip(text: string): IOrderLineAdapter;
  setQuantity(text: string): IOrderLineAdapter;
  setQuantityBackgroundColor(color: string): IOrderLineAdapter;
  setQuantityTextColor(color: string): IOrderLineAdapter;
  setQuantityBorderColor(color: string): IOrderLineAdapter;
  setBodyTextColor(color: string): IOrderLineAdapter;
  setBodyBackgroundColor(color: string): IOrderLineAdapter;
  setBodyBorderColor(color: string): IOrderLineAdapter;
  setLineColor(color: string): IOrderLineAdapter;
  setLineWidth(width: number): IOrderLineAdapter;
  setLineStyle(style: number): IOrderLineAdapter;
  setEditable(editable: boolean): IOrderLineAdapter;
  setCancellable(cancellable: boolean): IOrderLineAdapter;
  setModifyTooltip(tooltip: string): IOrderLineAdapter;
  setCancelTooltip(tooltip: string): IOrderLineAdapter;
  getPrice(): number;
  onCancel(callback: () => void): IOrderLineAdapter;
  onMove(callback: (price: number) => void): IOrderLineAdapter;

  movePrice(price: number): IOrderLineAdapter;
  remove(): void;
}
export interface IPositionLineAdapter {
  setPrice(price: number): IPositionLineAdapter;
  setText(text: string): IPositionLineAdapter;
  setTooltip(text: string): IPositionLineAdapter;
  setQuantity(text: string): IPositionLineAdapter;
  setQuantityBackgroundColor(color: string): IPositionLineAdapter;
  setQuantityTextColor(color: string): IPositionLineAdapter;
  setQuantityBorderColor(color: string): IPositionLineAdapter;
  setBodyTextColor(color: string): IPositionLineAdapter;
  setBodyBackgroundColor(color: string): IPositionLineAdapter;
  setBodyBorderColor(color: string): IPositionLineAdapter;
  setLineColor(color: string): IPositionLineAdapter;
  setLineWidth(width: number): IPositionLineAdapter;
  setLineStyle(style: number): IPositionLineAdapter;
  remove(): void;
}
export interface ChartingLibraryWidgetOptions {
  container: HTMLElement | string;
  symbol: string;
  interval: ResolutionString;
  library_path: string;
  locale: LanguageCode;
  charts_storage_url?: string;
  charts_storage_api_version?: AvailableSaveloadVersions;
  datafeed: any;
  fullscreen?: boolean;
  autosize?: boolean;
  theme?: 'Light' | 'Dark';
  timezone?: string;
  custom_indicators_getter?: any;
  overrides?: any;
  studies_overrides?: any;
  disabled_features?: string[];
  enabled_features?: string[];
  drawings_access?: any;
  studies_access?: any;
  widgetbar?: any;
  toolbar_bg?: string;
  save_load_adapter?: any;
  compare_symbols?: any[];
  client_id?: string;
  user_id?: string;
  load_last_chart?: boolean;
  auto_save_delay?: number;
  debug?: boolean;
  preset?: string;
  time_frames?: any[];
  details?: boolean;
  hotkey_trading_default?: boolean;
  support_host?: string;
  support_email?: string;
}
export interface IChartingLibraryWidget {
  onChartReady(callback: () => void): void;
  chart(index?: number): IChartWidgetApi;
  activeChart(): IChartWidgetApi;
  charts(): IChartWidgetApi[];
  remove(): void;
  setSymbol(symbol: string, interval: string, callback?: () => void): void;
  changeTheme(theme: 'Light' | 'Dark'): void;
  takeScreenshot(): void;
  save(callback: (state: any) => void): void;
  load(state: any): void;
  subscribe(event: string, callback: (...args: any[]) => void): void;
  unsubscribe(event: string, callback: (...args: any[]) => void): void;
  headerReady(): Promise<void>;
}

export class widget {
  constructor(options: ChartingLibraryWidgetOptions);
  onChartReady(callback: () => void): void;
  chart(index?: number): IChartWidgetApi;
  activeChart(): IChartWidgetApi;
  charts(): IChartWidgetApi[];
  remove(): void;
  setSymbol(symbol: string, interval: string, callback?: () => void): void;
  changeTheme(theme: 'Light' | 'Dark'): void;
  takeScreenshot(): void;
  save(callback: (state: any) => void): void;
  load(state: any): void;
  subscribe(event: string, callback: (...args: any[]) => void): void;
  unsubscribe(event: string, callback: (...args: any[]) => void): void;
  headerReady(): Promise<void>;
}
