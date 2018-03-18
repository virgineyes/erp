package com.eyesc.erp.rest;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eyesc.erp.model.bean.Material;
import com.eyesc.erp.model.service.MaterialService;

@RestController
public class MaterialRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(MaterialRest.class);

	@Autowired
	private MaterialService materialService;

	@RequestMapping(value = "/createMaterial")
	public String createMaterial(String materialId, String cloth, String price) {
		LOGGER.info("Create materialId: {}", materialId);
		Material material = materialService.findByMaterialId(materialId);
		Material newMaterial = null;
		if (material == null) {
			newMaterial = new Material();
			newMaterial.setMaterialId(materialId);
			newMaterial.setCloth(cloth);
			newMaterial.setPrice(Integer.valueOf(price));
			newMaterial.setDate(new Date());
			materialService.save(newMaterial);
		}
		return null;
	}

	@RequestMapping(value = "/deleteMaterial")
	public String deleteCustomer(String materialId) {
		LOGGER.info("deleteMaterialId: {}", materialId);
		materialService.delete(materialId);
		return null;
	}

	@RequestMapping(value = "/searchMaterial")
	public List<Material> searchCustomer(String materialId) {
		LOGGER.info("Search materialId: {}", materialId);
		return materialService.findByMaterialIdList(materialId);
	}

	@RequestMapping(value = "/searchOneMaterail")
	public Material searchOneMaterail(String materialId) {
		LOGGER.info("Search One materialId: {}", materialId);
		return materialService.findByMaterialId(materialId);
	}

}
