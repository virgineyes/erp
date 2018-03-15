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
@Table(name = "material")
public class Material implements Serializable {

	private static final long serialVersionUID = -6097789997235313223L;

	@Id
	@GeneratedValue
	@Column(name = "ID", unique = true, nullable = false)
	private Long id;

	@Column(name = "MATERIAL_ID")
	private String materialId;

	@Column(name = "CLOTH")
	private String cloth;

	@Column(name = "PRICE")
	private Integer price;
	
	@Column(name = "UPDATE_PRICE")
	private Integer updatePrice;

	public Integer getUpdatePrice() {
		return updatePrice;
	}

	public void setUpdatePrice(Integer updatePrice) {
		this.updatePrice = updatePrice;
	}

	@Column(name = "DATE")
	private Date date;

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this).add("id", id).add("materialId", materialId).add("cloth", cloth)
				.add("price", price).add("date", date).toString();
	}

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

	public String getCloth() {
		return cloth;
	}

	public void setCloth(String cloth) {
		this.cloth = cloth;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
