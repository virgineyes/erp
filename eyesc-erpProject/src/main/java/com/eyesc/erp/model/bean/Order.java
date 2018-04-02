package com.eyesc.erp.model.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

	private static final long serialVersionUID = 8876069437968298794L;
	
	@Id
	@GeneratedValue
	@Column(name = "ID", unique = true, nullable = false)
	private Long id;
    
    @Column(name = "ORDER_ID")
    private String orderId;
    
    @Column(name = "CUSTOMER_ID")
    private String customerId;
    
    @Column(name = "NAME")
    private String name;
    
    @Column(name = "BODY_TYPE")
    private String bodyType;
    
    @Column(name = "CUSTOMER_SOURCE")
    private String customerSource;
    
	@Column(name = "DELIVERY_TYPE")
    private String deliveryType;    
	
    @Column(name = "PAYMENT_TERM")
    private String  paymentTerm;
	
    @Column(name = "NOTICE_TYPE")
    private String noticeType;

    @Column(name = "PHONE")
    private String phone;
    
    @Column(name = "ADDRESS_ONE")
    private String addressFirst;
    
    @Column(name = "ADDRESS_TWO")
    private String addressSecond;
    
    @Column(name = "STOCK_ID")
    private String stockId;
    
    @Column(name = "MATERIAL_ID")
    private String materialId;

    @Column(name = "CUT_SIZE")
    private String cutSize;
    
    @Column(name = "CUS_SIZE")
    private String cusSize;
    
    @Column(name = "COLOR")
    private String color;
    
    @Column(name = "PRICE_TYPE")
    private String priceType;
    
    @Column(name = "CONFIRM")
    private String confirm;
    
    @Column(name = "EMPLOYEE")
    private String employee;
    
    @Column(name = "ORDER_COMPLETE")
    private String orderComplete;

	@Column(name = "PRICE")
    private Integer price;
    
    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    //出貨日
    @Column(name = "SHIPPING_DATE")
    private Date shippingDate;
    
    //到貨日
    @Column(name = "ARRIVAL_DATE")
    private Date arrivalDate;
    
    //確定此單結束，出貨日加十天
    @Column(name = "CONFIRM_DATE")
    private Date confirmDate;
      
    @Column(name = "STATUS")
    private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
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

	public String getEmployee() {
		return employee;
	}

	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public String getOrderComplete() {
		return orderComplete;
	}

	public void setOrderComplete(String orderComplete) {
		this.orderComplete = orderComplete;
	}
	
    public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	public Date getShippingDate() {
		return shippingDate;
	}

	public void setShippingDate(Date shippingDate) {
		this.shippingDate = shippingDate;
	}

	public Date getConfirmDate() {
		return confirmDate;
	}

	public void setConfirmDate(Date confirmDate) {
		this.confirmDate = confirmDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
