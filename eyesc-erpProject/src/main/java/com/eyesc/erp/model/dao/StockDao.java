package com.eyesc.erp.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eyesc.erp.model.bean.Stock;

public interface StockDao extends JpaRepository<Stock, Long> {

	public Stock findById(Long id);
	
    @Query(value = "select * from erp.stock where BUST is null", nativeQuery = true)
    public List<Stock> findNonInnerStock();
    
    @Query(value = "select * from erp.stock where BUST not null", nativeQuery = true)
    public List<Stock> findStock();
}
