package com.eyesc.erp.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eyesc.erp.model.bean.Material;

@Repository
public interface MaterialDao extends JpaRepository<Material, Long> {
	 public Material findByMaterialId(String materialId);
	 
	 public List<Material> findByMaterialIdIgnoreCaseContaining(String materialId);
}
