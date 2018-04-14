package com.eyesc.erp.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eyesc.erp.model.bean.Order;
import com.eyesc.erp.model.dao.OrderDao;

@Service
@Transactional(readOnly = false)
public class OrderService {
	@Autowired
	private OrderDao orderDao;
	
	@Transactional(readOnly = false)
	public void save(Order order) {
		orderDao.save(order);
	}
	
	@Transactional(readOnly = false)
	public void delete(String orderId) {
		orderDao.delete(orderDao.findByOrderId(orderId));
	}
	
	public Order findById(Long id) {
		return orderDao.findById(id);
	}
	
	public List<Order> findByOrderId(String orderId) {
		return orderDao.findByOrderId(orderId);
	}
	
	public List<Order> findByCustomerId(String customerId) {
		return orderDao.findByCustomerId(customerId);
	}
	
	public List<Order> findByCreateDate(Date createDate) {
		return orderDao.findByCreateDate(createDate);
	}  
	
	public List<Order> findByConfirmDate(Date confirmDate) {
		return orderDao.findByConfirmDate(confirmDate);
	}  
	
	public List<Order> getComfirmDateIsNull() {
		return orderDao.getComfirmDateIsNull();
	}  
	
	public List<Order> getNonConfirm() {
		return orderDao.getNonConfirm();
	}
	
	public List<Order> findAll() {
		return orderDao.findAll();
	}
}
