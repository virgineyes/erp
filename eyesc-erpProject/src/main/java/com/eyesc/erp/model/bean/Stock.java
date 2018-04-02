package com.eyesc.erp.model.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stock")
public class Stock implements Serializable {
    
	private static final long serialVersionUID = 8194471374944514856L;

	@Id
    @GeneratedValue
    @Column(name = "ID", unique = true, nullable = false)
    private Long id;
    
    @Column(name = "MATERIAL_ID")
    private String materialId;
    
    @Column(name = "CUT_SIZE")
    private String cutSize;
    
    @Column(name = "CUS_SIZE")
    private String cusSize;
    
    @Column(name = "STORAGE")
    private String storage;
    
    @Column(name = "WEATHER")
    private String weather;
    
    @Column(name = "BUST")
    private String bust;
    
    @Column(name = "WAIST")
    private String waist;
    
    @Column(name = "HIP")
    private String hip;
    
    @Column(name = "CLOTH_LENGTH")
    private String clothLength;
    
    @Column(name = "SHOES_SIZE")
    private String shoesSize;
    
    @Column(name = "REAL_SHOES_SIZE")
    private String realShoesSize;
    
    @Column(name = "COLLOR")
    private String color;
    
    @Column(name = "COUNT")
    private Integer count;
 
    @Column(name = "PRICE")
    private Integer price;
    
    @Column(name = "CLEARANCE")
    private Integer clearnace;
    
    @Column(name = "EMPLOYEEID")
    private String employeeId;

    @Column(name = "HINT")
    private String hint;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getWeather() {
		return weather;
	}

	public void setWeather(String weather) {
		this.weather = weather;
	}

	public String getBust() {
		return bust;
	}

	public void setBust(String bust) {
		this.bust = bust;
	}

	public String getWaist() {
		return waist;
	}

	public void setWaist(String waist) {
		this.waist = waist;
	}

	public String getHip() {
		return hip;
	}

	public void setHip(String hip) {
		this.hip = hip;
	}

	public String getClothLength() {
		return clothLength;
	}

	public void setClothLength(String clothLength) {
		this.clothLength = clothLength;
	}

	public String getShoesSize() {
		return shoesSize;
	}

	public void setShoesSize(String shoesSize) {
		this.shoesSize = shoesSize;
	}

	public String getRealShoesSize() {
		return realShoesSize;
	}

	public void setRealShoesSize(String realShoesSize) {
		this.realShoesSize = realShoesSize;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Integer getClearnace() {
		return clearnace;
	}

	public void setClearnace(Integer clearnace) {
		this.clearnace = clearnace;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}
}
