/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;

/**
 *
 * @author Karitu Pavilion
 */

import java.util.LinkedList;
import java.util.List;

public class EmyecoAIStocks {

	private String symbol;
        private String name;
        private String currency;
        private String price;
        private String price_open;
        private String day_high;
        private String day_low;
        private String week_high;
        private String week_low;
        private String day_change;
        private String change_pct;
        private String close_yesterday;
        private String market_cap;
        private String volume;
        private String volume_avg;
        private String shares;
        private String stock_exchange_long;
        private String stock_exchange_short;
        private String timezone;
        private String timezone_name;
        private String gmt_offset;
        private String last_trade_time;
        private String pe;
        private String eps;
        
        private String predicted_value;
        private String given_value;
        
        
        
        
        
        
        
        
	//private String url;
	//private List<String> categories;
	//private List<String> tags;
        
        
        
	
	public String getsymbol() {
		return symbol;
	}
	public void setsymbol(String symbol) {
		this.symbol = symbol;
	}
        public String getname() {
		return name;
	}
	public void setname(String name) {
		this.name = name;
	}
        public String getcurrency() {
		return currency;
	}
	public void setcurrency(String currency) {
		this.currency = currency;
	}
        public String getprice() {
		return price;
	}
	public void setprice(String price) {
		this.price = price;
	}
        public String getprice_open() {
		return price_open;
	}
	public void setprice_open(String price_open) {
		this.price_open = price_open;
	}
        public String getday_high() {
		return day_high;
	}
	public void setday_high(String day_high) {
		this.day_high = day_high;
	}
        public String getday_low() {
		return day_low;
	}
	public void setday_low(String day_low) {
		this.day_low = day_low;
	}
        public String getweek_high() {
		return week_high;
	}
	public void setweek_high(String week_high) {
		this.week_high = week_high;
	}
        public String getweek_low() {
		return week_low;
	}
	public void setweek_low(String week_low) {
		this.week_low = week_low;
	}
        public String getday_change() {
		return day_change;
	}
	public void setday_change(String day_change) {
		this.day_change = day_change;
	}
        public String getchange_pct() {
		return change_pct;
	}
	public void setchange_pct(String change_pct) {
		this.change_pct = change_pct;
	}
        public String getclose_yesterday() {
		return close_yesterday;
	}
	public void setclose_yesterday(String close_yesterday) {
		this.close_yesterday = close_yesterday;
	}
        public String getmarket_cap() {
		return market_cap;
	}
	public void setmarket_cap(String market_cap) {
		this.market_cap = market_cap;
	}
        public String getvolume() {
		return volume;
	}
	public void setvolume(String volume) {
		this.volume = volume;
	}
        public String getvolume_avg() {
		return volume_avg;
	}
	public void setvolume_avg(String volume_avg) {
		this.volume_avg = volume_avg;
	}
        public String getshares() {
		return shares;
	}
	public void setshares(String shares) {
		this.shares = shares;
	}
        public String getstock_exchange_long() {
		return stock_exchange_long;
	}
	public void setstock_exchange_long(String stock_exchange_long) {
		this.stock_exchange_long = stock_exchange_long;
	}
        public String getstock_exchange_short() {
		return stock_exchange_short;
	}
	public void setstock_exchange_short(String stock_exchange_short) {
		this.stock_exchange_short = stock_exchange_short;
	}
        public String gettimezone() {
		return timezone;
	}
	public void settimezone(String timezone) {
		this.timezone = timezone;
	}
        public String gettimezone_name() {
		return timezone_name;
	}
	public void settimezone_name(String timezone_name) {
		this.timezone_name = timezone_name;
	}
        public String getgmt_offset() {
		return gmt_offset;
	}
	public void setgmt_offset(String gmt_offset) {
		this.gmt_offset = gmt_offset;
	}
        public String getlast_trade_time() {
		return last_trade_time;
	}
	public void setlast_trade_time(String last_trade_time) {
		this.last_trade_time = last_trade_time;
	}
        public String getpe() {
		return pe;
	}
	public void setpe(String pe) {
		this.pe = pe;
	}
        public String geteps() {
		return eps;
	}
	public void seteps(String eps) {
		this.eps = eps;
	}
        
        
        
        
        
        public String getpredicted_value() {
		return predicted_value;
	}
	public void setpredicted_value(String predicted_value) {
		this.predicted_value = predicted_value;
	}
        public String getegiven_value() {
		return given_value;
	}
	public void setgiven_value(String given_value) {
		this.given_value = given_value;
	}
              
        
        
        
        
        
       /** 
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public List<String> getCategories() {
		return categories;
	}
	public void setCategories(List<String> categories) {
		this.categories = categories;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	
	public void addCategory(String category){
		if(this.categories == null)
			this.categories = new LinkedList<String>();
		this.categories.add(category);
	}
	public void addTag(String tag){
		if(this.tags == null)
			this.tags = new LinkedList<String>();
		
		this.tags.add(tag);
	}
        
        */
	@Override
	public String toString() {
            
            /** EmyecoStockAnalsis do the prediction */
              
            EmyecoStockAnalysis stocks = new  EmyecoStockAnalysis();
            stocks.predict(price_open, price, close_yesterday, given_value);
            
            setpredicted_value(stocks.getPredicted_value());
            
		return "EmyecoAIStocks [symbol=" + symbol + 
                        ", name=" + name +
                        ", currency=" + currency +
                        ", price=" + price +
                        ", price_open=" + price_open +
                        ", day_high=" + day_high +
                        ", day_low=" + day_low +
                        ", week_high=" + week_high +
                        ", week_low=" + week_low +
                        ", day_change=" + day_change +
                        ", change_pct=" + change_pct +
                        ", close_yesterday=" + close_yesterday +
                        ", market_cap=" + market_cap +
                        ", volume=" + volume +
                        ", volume_avg=" + volume_avg +
                        ", shares=" + shares +
                        ", stock_exchange_long=" + stock_exchange_long +
                        ", stock_exchange_short=" + stock_exchange_short +
                        ", timezone=" + timezone +
                        ", timezone_name=" + timezone_name +
                        ", gmt_offset=" + gmt_offset +
                        ", last_trade_time=" + last_trade_time +
                        ", pe=" + pe +
                        ", eps=" + eps +
                        ", given_value=" + given_value +
                        ", predicted_value=" + predicted_value +
                        "]";
	}
	
	
	
}


