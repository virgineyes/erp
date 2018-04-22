package com.eyesc.erp.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eyesc.erp.model.bean.SalesOrder;
import com.eyesc.erp.util.Constants;

public interface SalesOrderDao extends JpaRepository<SalesOrder, Long> {

	public SalesOrder findById(Long id);
	
	public SalesOrder findByOrderId(String orderId);
	
    @Query(value = "select * from erp.salesOrder where STATUS='" + Constants.READY_ORDER + "'", nativeQuery = true)
    public List<SalesOrder> findReadyOrder();
    
    @Query(value = "select * from erp.salesOrder where STATUS='" + Constants.ORDER_CONFIRM + "'", nativeQuery = true)
    public List<SalesOrder> findHaveOrdered();
    
    @Query(value = "select * from erp.salesOrder where STATUS='" + Constants.NON_STOCK + "'", nativeQuery = true)
    public List<SalesOrder> findNonStock();
    
    @Query(value = "select * from erp.salesOrder where STATUS='" + Constants.ARRIVAL + "'", nativeQuery = true)
    public List<SalesOrder> findHaveArrival();
}