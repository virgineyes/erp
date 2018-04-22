package com.eyesc.erp.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eyesc.erp.model.bean.Stock;
import com.eyesc.erp.model.dao.StockDao;

@Service
@Transactional(readOnly = false)
public class StockService {

	@Autowired
	private StockDao stockDao;

	public Stock findById(Long id) {
		return stockDao.findById(id);
	}

	public List<Stock> findNonInnerStock() {
		return stockDao.findNonInnerStock();
	}

	public List<Stock> findStock() {
		return stockDao.findStock();
	}
	
	@Transactional(readOnly = false)
	public void save(Stock stock) {
		stockDao.save(stock);
	}
}
