package com.eyesc.erp.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eyesc.erp.model.bean.Customer;

@Repository
public interface CustomerDao extends JpaRepository<Customer, Long> {
	 public Customer findByCustomerId(String customerId);
	 
	 public List<Customer> findByCustomerIdIgnoreCaseContaining(String customerId);
}
