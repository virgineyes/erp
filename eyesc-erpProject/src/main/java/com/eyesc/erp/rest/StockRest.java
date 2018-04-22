package com.eyesc.erp.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eyesc.erp.model.bean.Stock;
import com.eyesc.erp.model.service.StockService;

public class StockRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(StockRest.class);
	
	@Autowired
	private StockService stockService;
	
	@RequestMapping(value = "/findNonInnerStock")
	public List<Stock> findNonInnerStock() {
		return stockService.findNonInnerStock();
	}
}
