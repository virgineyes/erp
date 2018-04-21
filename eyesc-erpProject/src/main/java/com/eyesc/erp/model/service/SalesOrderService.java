package com.eyesc.erp.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eyesc.erp.model.bean.SalesOrder;
import com.eyesc.erp.model.dao.SalesOrderDao;

@Service
@Transactional(readOnly = false)
public class SalesOrderService {
	@Autowired
	private SalesOrderDao salesOrderDao;
	
	public SalesOrder findById(Long id) {
		return salesOrderDao.findById(id);
	}
	
	public SalesOrder findByOrderId(String orderId) {
		return salesOrderDao.findByOrderId(orderId);
	}
	
	public List<SalesOrder> findReadyOrder() {
		return salesOrderDao.findReadyOrder();
	}
	
	public List<SalesOrder> findHaveOrdered() {
		return salesOrderDao.findHaveOrdered();
	}
	
	public List<SalesOrder> findNonStock() {
		return salesOrderDao.findNonStock();
	}
	
	public List<SalesOrder> findHaveArrival() {
		return salesOrderDao.findHaveArrival();
	}
	
	
	@Transactional(readOnly = false)
	public void save(SalesOrder salesOrder) {
		salesOrderDao.save(salesOrder);
	}
}
