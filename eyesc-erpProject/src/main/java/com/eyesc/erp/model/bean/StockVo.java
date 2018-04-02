package com.eyesc.erp.model.bean;

import java.io.Serializable;

public class StockVo implements Serializable {
	
	private static final long serialVersionUID = 5291356534454584831L;
	private String stockId;
    private String materialId;
    private String cutSize;
    private String cusSize;
    private String color;
    private String count;
    private String priceType;
    private String confirm;
    private String employeeId;
    private String price;
    
	public String getStockId() {
		return stockId;
	}
	public void setStockId(String stockId) {
		this.stockId = stockId;
	}
	public String getMaterialId() {
		return materialId;
	}
	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
	public String getCutSize() {
		return cutSize;
	}
	public void setCutSize(String cutSize) {
		this.cutSize = cutSize;
	}
	public String getCusSize() {
		return cusSize;
	}
	public void setCusSize(String cusSize) {
		this.cusSize = cusSize;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getPriceType() {
		return priceType;
	}
	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}
	public String getConfirm() {
		return confirm;
	}
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
}
