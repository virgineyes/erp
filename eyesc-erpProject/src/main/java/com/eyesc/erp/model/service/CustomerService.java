package com.eyesc.erp.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eyesc.erp.model.dao.CustomerDao;
import com.eyesc.erp.model.bean.Customer;

@Service
@Transactional(readOnly = false)
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;
    
	@Transactional(readOnly = false)
	public void save(Customer customer) {
		customerDao.save(customer);
	}
	
	@Transactional(readOnly = false)
	public void delete(Long id) {
		customerDao.delete(id);
	}
	
	public Customer findByCustomerId(String customerId) {
		return customerDao.findByCustomerId(customerId);
	}  
	
	public List<Customer> findByCustomerIdList(String customerId) {
		return customerDao.findByCustomerIdIgnoreCaseContaining(customerId);
	}  
	
	public List<Customer> findAll() {
		return customerDao.findAll();
	}
}
