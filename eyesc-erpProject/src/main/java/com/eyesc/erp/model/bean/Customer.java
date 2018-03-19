package com.eyesc.erp.model.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import com.google.common.base.MoreObjects;

@Entity
@Table(name = "customer")
public class Customer implements Serializable {
	
	private static final long serialVersionUID = 305407374836362976L;

    @Id
    @GeneratedValue
    @Column(name = "ID", unique = true, nullable = false)
    private Long id;
    
    @Column(name = "CUSTOMER_ID")
    private String customerId;
    
    @Column(name = "NAME")
    private String name;
    
    @Column(name = "CUSTOMER_SOURCE")
    private String customerSource;
    
	@Column(name = "BLOCK_LIST")
    private String blockList;
    
	@Column(name = "DELIVERY_TYPE")
    private String deliveryType;
	
	@Column(name = "SHIPPING_MONEY")
	private Integer shippingMoney;

    @Column(name = "BODY_TYPE")
    private String bodyType;
    
    @Column(name = "NOTICE_TYPE")
    private String noticeType;
    
    @Column(name = "PHONE")
    private String phone;    

    @Column(name = "HINT")
    private String hint;

    @Column(name = "ADDRESS_1")
    private String addressFirst;
    
    @Column(name = "CREATE_DATE")
    private Date createDate;

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this).add("id", id).add("customerId", customerId).add("name", name)
				.add("customerSource", customerSource).add("blockList", blockList).add("deliveryType", deliveryType)
				.add("shippingMoney", shippingMoney).add("bodyType", bodyType).add("noticeType", noticeType)
				.add("phone", phone).add("hint", hint).add("addressFirst", addressFirst)
				.add("createDate", createDate).toString();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getCustomerSource() {
		return customerSource;
	}

	public void setCustomerSource(String customerSource) {
		this.customerSource = customerSource;
	}

	public String getBlockList() {
		return blockList;
	}

	public void setBlockList(String blockList) {
		this.blockList = blockList;
	}

	public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	public Integer getShippingMoney() {
		return shippingMoney;
	}

	public void setShippingMoney(Integer shippingMoney) {
		this.shippingMoney = shippingMoney;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
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

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getAddressFirst() {
		return addressFirst;
	}

	public void setAddressFirst(String addressFirst) {
		this.addressFirst = addressFirst;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}

