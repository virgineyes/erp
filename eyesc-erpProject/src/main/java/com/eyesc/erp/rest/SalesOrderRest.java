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
import com.eyesc.erp.model.bean.Stock;
import com.eyesc.erp.model.service.OrderService;
import com.eyesc.erp.model.service.SalesOrderService;
import com.eyesc.erp.model.service.StockService;
import com.eyesc.erp.util.Constants;
import com.eyesc.erp.util.Util;

@RestController
public class SalesOrderRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(SalesOrderRest.class);

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private SalesOrderService salesOrderSerivce;
	
	@Autowired
	private StockService stockService;
	

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
			LOGGER.info("Order, OderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(Constants.ORDER_CONFIRM);
			salesOrder.setOrderDate(Util.convert(orderDate));
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(Constants.ORDER_CONFIRM);
			orderService.save(order);
		}
	}
	
	@RequestMapping(value = "/updateNonStockStatus")
	public void updateNonStockStatus(@RequestParam(value = "orderIds[]")  String[] orderIds) {
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("Non Stock, OderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(Constants.NON_STOCK);
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(Constants.NON_STOCK);
			orderService.save(order);
		}
	}
	
	@RequestMapping(value = "/updateArriveDate")
	public void updateArriveDate(String arrivalDate, @RequestParam(value = "orderIds[]")  String[] orderIds) {
		LOGGER.info("orderDate : {}", arrivalDate);
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("Arrival, OderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(Constants.ARRIVAL);
			salesOrder.setArrivalDate(Util.convert(arrivalDate));
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(Constants.ARRIVAL);
			orderService.save(order);
		}
	}
	
	@RequestMapping(value = "/insertStock")
	public void insertStock(@RequestParam(value = "orderIds[]")  String[] orderIds) {
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("Insert Stock, OrderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(Constants.CANCEL_STOCK);
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(Constants.CANCEL_STOCK);
			
			Stock stock = new Stock();
			stock.setOrderId(order.getOrderId());
			stock.setMaterialId(order.getMaterialId());
			stock.setCutSize(order.getCutSize());
			stock.setCusSize(order.getCusSize());
			stock.setPrice(order.getPrice());
			stockService.save(stock);
			
			orderService.save(order);
		}
	}
	
	
	@RequestMapping(value = "/cancelOrder")
	public void cancelOrder(@RequestParam(value = "orderIds[]")  String[] orderIds) {
		for (int i = 0; i < orderIds.length; i++) {
			LOGGER.info("Cancel, OderId : {}", orderIds[i]);
			String orderId = orderIds[i];
			SalesOrder salesOrder = salesOrderSerivce.findByOrderId(orderId);
			salesOrder.setStatus(Constants.CANCEL);
			salesOrderSerivce.save(salesOrder);
			
			Order order = orderService.findByOrderId(orderId);
			order.setStatus(Constants.CANCEL);
			orderService.save(order);
		}
	}
}
