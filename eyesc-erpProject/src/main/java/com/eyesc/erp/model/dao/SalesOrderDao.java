package com.eyesc.erp.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eyesc.erp.model.bean.SalesOrder;

public interface SalesOrderDao extends JpaRepository<SalesOrder, Long> {

	public SalesOrder findById(Long id);
	
	public SalesOrder findByOrderId(String orderId);
	
    @Query(value = "select * from erp.salesOrder where STATUS='準備下單'", nativeQuery = true)
    public List<SalesOrder> findReadyOrder();
    
    @Query(value = "select * from erp.salesOrder where STATUS='JO已下單'", nativeQuery = true)
    public List<SalesOrder> findHaveOrdered();
    
    @Query(value = "select * from erp.salesOrder where STATUS='沒貨'", nativeQuery = true)
    public List<SalesOrder> findNonStock();
    
    @Query(value = "select * from erp.salesOrder where STATUS='已到貨'", nativeQuery = true)
    public List<SalesOrder> findHaveArrival();
}
