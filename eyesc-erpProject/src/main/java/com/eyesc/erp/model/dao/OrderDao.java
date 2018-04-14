package com.eyesc.erp.model.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eyesc.erp.model.bean.Order;

public interface OrderDao extends JpaRepository<Order, Long> {
	
	public Order findById(Long id);
	
	public List<Order> findByOrderId(String orderId);
	
	public List<Order> findByCustomerId(String customerId);
	
	public List<Order> findByCreateDate(Date createDate);
	
	public List<Order> findByConfirmDate(Date confirmDate);
	
	public List<Order> findByStatus(String status);

    @Query(value = "select * from erp.orders where CONFIRM_DATE is null", nativeQuery = true)
    public List<Order> getComfirmDateIsNull();
    
    @Query(value = "select * from erp.orders where CONFIRM='待確認'", nativeQuery = true)
    public List<Order> getNonConfirm();

}
