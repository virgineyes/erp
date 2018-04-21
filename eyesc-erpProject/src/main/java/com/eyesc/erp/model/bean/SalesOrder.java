package com.eyesc.erp.model.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SalesOrder")
public class SalesOrder {
	@Id
	@GeneratedValue
	@Column(name = "ID", unique = true, nullable = false)
	private Long id;
	
    @Column(name = "ORDER_ID")
    private String orderId;
    
    @Column(name = "CUSTOMER_ID")
    private String customerId;
    
    @Column(name = "BODY_TYPE")
    private String bodyType;
    
    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    @Column(name = "MATERIAL_ID")
    private String materialId;
    
    @Column(name = "CUT_SIZE")
    private String cutSize;
    
    @Column(name = "CUS_SIZE")
    private String cusSize;
    
    @Column(name = "COLOR")
    private String color;
    
    @Column(name = "ORDER_DATE")
    private Date orderDate;
    
    //到貨日
    @Column(name = "ARRIVAL_DATE")
    private Date arrivalDate;
    
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

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
