package com.eyesc.erp.rest;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eyesc.erp.model.bean.Order;
import com.eyesc.erp.model.bean.SalesOrder;
import com.eyesc.erp.model.service.OrderService;
import com.eyesc.erp.model.service.SalesOrderService;
import com.eyesc.erp.util.Util;

@RestController
public class SalesOrderRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(SalesOrderRest.class);
	
	private static final String ORDER_CONFIRM = "JO已下單";
	private static final String NON_STOCK = "沒貨";	
	private static final String ARRIVAL = "已到貨";
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private SalesOrderService salesOrderSerivce;

	@RequestMapping(value = "/searchSalesOrder")
	public List<SalesOrder> searchSalesOrder() {
		List<SalesOrder> result = new ArrayList<>();
		result.addAll(salesOrderSerivce.findNonStock());
		result.addAll(salesOrderSerivce.findReadyOrder());
		result.addAll(salesOrderSerivce.findHaveOrdered());
		result.addAll(salesOrderSerivce.findHaveArrival());
		return result;
	}
	
	@RequestMapping(value = "/updateOrderDate")
	public void updateOrderDate(String orderDate, @RequestParam(value = "orderIds[]")  String[] orderIds) {
		LOGGER.info("orderDate : {}", orderDate);
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("oderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(ORDER_CONFIRM);
			salesOrder.setOrderDate(Util.convert(orderDate));
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(ORDER_CONFIRM);
			orderService.save(order);
		}
	}
	
	@RequestMapping(value = "/updateNonStockStatus")
	public void updateNonStockStatus(@RequestParam(value = "orderIds[]")  String[] orderIds) {
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("oderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(NON_STOCK);
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(NON_STOCK);
			orderService.save(order);
		}
	}
	
	@RequestMapping(value = "/updateArriveDate")
	public void updateArriveDate(String arrivalDate, @RequestParam(value = "orderIds[]")  String[] orderIds) {
		LOGGER.info("orderDate : {}", arrivalDate);
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("oderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(ARRIVAL);
			salesOrder.setArrivalDate(Util.convert(arrivalDate));
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(ARRIVAL);
			orderService.save(order);
		}
	}
}
