package com.eyesc.erp.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eyesc.erp.model.bean.Material;
import com.eyesc.erp.model.dao.MaterialDao;

@Service
@Transactional(readOnly = false)
public class MaterialService {

	@Autowired
	private MaterialDao materialDao;
	
	@Transactional(readOnly = false)
	public void save(Material material) {
		materialDao.save(material);
	}
	
	@Transactional(readOnly = false)
	public void delete(Long id) {
		materialDao.delete(id);
	}
	
	public Material findByMaterialId(String materialId) {
		return materialDao.findByMaterialId(materialId);
	}  
	
	public List<Material> findByMaterialIdList(String materialId) {
		return materialDao.findByMaterialIdIgnoreCaseContaining(materialId);
	}  
	
	public List<Material> findAll() {
		return materialDao.findAll();
	}
}
