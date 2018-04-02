package com.eyesc.erp.model.bean;

import java.io.Serializable;
import java.util.List;

public class OrderVo implements Serializable {
	
	private static final long serialVersionUID = -331972763523787149L;
	private String customerId;
	private String name;
	private String bodyType;
	private String customerSource;
	private String deliveryType;
	private String paymentTerm;
	private String noticeType;
	private String phone;
	private String addressFirst;
	private String addressSecond;
	private List<StockVo> stockVos;
	
	public List<StockVo> getStockVos() {
		return stockVos;
	}

	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBodyType() {
		return bodyType;
	}
	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}
	public String getCustomerSource() {
		return customerSource;
	}
	public void setCustomerSource(String customerSource) {
		this.customerSource = customerSource;
	}
	public String getDeliveryType() {
		return deliveryType;
	}
	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}
	public String getPaymentTerm() {
		return paymentTerm;
	}
	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}
	public String getNoticeType() {
		return noticeType;
	}
	public void setNoticeType(String noticeType) {
		this.noticeType = noticeType;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddressFirst() {
		return addressFirst;
	}
	public void setAddressFirst(String addressFirst) {
		this.addressFirst = addressFirst;
	}
	public String getAddressSecond() {
		return addressSecond;
	}
	public void setAddressSecond(String addressSecond) {
		this.addressSecond = addressSecond;
	}
}
