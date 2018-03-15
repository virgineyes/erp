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

	@RequestMapping(value = "/materialCreate")
	public String customerCreate(String materialId, String cloth, String price) {
		LOGGER.info("materialId: ?, cloth: ?, price: ?", materialId, cloth, price);
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
	public String deleteCustomer(String id) {
		LOGGER.info("deleteId: ?", Long.parseLong(id));
		materialService.delete(Long.parseLong(id));
		return null;
	}

	@RequestMapping(value = "/searchMaterial")
	public List<Material> searchCustomer(String materialId) {
		LOGGER.info("materialId", materialId);
		return materialService.findByMaterialIdList(materialId);
	}

	@RequestMapping(value = "/searchOneMaterail")
	public Material searchOneCustomer(String materialId) {
		LOGGER.info("materialId: ?", materialId);
		return materialService.findByMaterialId(materialId);
	}

}
