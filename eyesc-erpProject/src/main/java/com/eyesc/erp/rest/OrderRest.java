package com.eyesc.erp.rest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eyesc.erp.model.bean.Customer;
import com.eyesc.erp.model.bean.Order;
import com.eyesc.erp.model.bean.OrderVo;
import com.eyesc.erp.model.bean.SalesOrder;
import com.eyesc.erp.model.bean.StockVo;
import com.eyesc.erp.model.service.CustomerService;
import com.eyesc.erp.model.service.OrderService;
import com.eyesc.erp.model.service.SalesOrderService;
import com.eyesc.erp.util.Constants;
import com.google.common.base.Strings;

@RestController
public class OrderRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderRest.class);

	@Autowired
	private OrderService orderService;

	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private SalesOrderService salesOrderSerivce;
	
	
	@RequestMapping(value = "/createOrder")
	public void createOrder(@RequestBody OrderVo orderVo) {
		LOGGER.info("Create Order: {}", orderVo);
		LocalDateTime localDateTime = LocalDateTime.now();
		Date today = Date.from(localDateTime.toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
		String date = localDateTime.format(DateTimeFormatter.ofPattern("yyyyMMdd-HH:mm"));
		
		for (StockVo stockVo : orderVo.getStockVos()) {
			for (int i = 1 ; i <= Integer.valueOf(stockVo.getCount()); i++) {
				//add new order
				addNewOrder(orderVo, today, date, stockVo, i);
					
				//add new salesOrder
				if ("下單".equals(stockVo.getConfirm())) {
					addNewSalesOrder(orderVo, today, date, stockVo, i);
				} 
			}
		}
		addNewCustomer(orderVo, today);
	}

	private void addNewSalesOrder(OrderVo orderVo, Date today, String date, StockVo stockVo, int i) {
		SalesOrder salesOrder = new SalesOrder();
		salesOrder.setOrderId(orderVo.getCustomerId() + date + '_' + i);
		salesOrder.setCustomerId(orderVo.getCustomerId());
		salesOrder.setBodyType(orderVo.getBodyType());
		salesOrder.setCreateDate(today);
		salesOrder.setMaterialId(stockVo.getMaterialId());
		salesOrder.setCutSize(stockVo.getCutSize());
		salesOrder.setCusSize(stockVo.getCusSize());
		salesOrder.setColor(stockVo.getColor());
		salesOrder.setStatus(Constants.READY_ORDER);
	}

	private void addNewOrder(OrderVo orderVo, Date today, String date, StockVo stockVo, int i) {
		Order order = new Order();
		order.setOrderId(orderVo.getCustomerId() + date + '_' + i);
		order.setCustomerId(orderVo.getCustomerId());
		order.setName(orderVo.getName());
		order.setBodyType(orderVo.getBodyType());
		order.setCustomerSource(orderVo.getCustomerSource());
		order.setDeliveryType(orderVo.getDeliveryType());
		order.setPaymentTerm(orderVo.getPaymentTerm());
		order.setNoticeType(orderVo.getNoticeType());
		order.setPhone(orderVo.getPhone());
		order.setAddressFirst(orderVo.getAddressFirst());
		order.setAddressSecond(orderVo.getAddressSecond());
		
		String stockId = stockVo.getStockId();
		if (!Strings.isNullOrEmpty(stockId)) {
			order.setStockId(stockId);
		} else {
			order.setStockId("N");
		}
		order.setMaterialId(stockVo.getMaterialId());
		order.setCutSize(stockVo.getCutSize());
		order.setCusSize(stockVo.getCusSize());
		order.setColor(stockVo.getColor());
		order.setPriceType(stockVo.getPriceType());
		order.setConfirm(stockVo.getConfirm());
		order.setEmployee(stockVo.getEmployeeId());
		order.setPrice(Integer.valueOf(stockVo.getPrice()));
		order.setCreateDate(today);
		if ("待確認".equals(stockVo.getConfirm())) {
			order.setStatus("待確認");
		} else if ("下單".equals(stockVo.getConfirm())) {
			SalesOrder salesOrder = new SalesOrder();
			salesOrder.setOrderId(order.getOrderId());
			salesOrder.setCustomerId(order.getCustomerId());
			salesOrder.setBodyType(order.getBodyType());
			salesOrder.setCreateDate(today);
			salesOrder.setMaterialId(order.getMaterialId());
			salesOrder.setCutSize(order.getCutSize());
			salesOrder.setCusSize(order.getCusSize());
			salesOrder.setColor(order.getColor());
			salesOrder.setStatus(Constants.READY_ORDER);
			salesOrderSerivce.save(salesOrder);
			order.setStatus(Constants.READY_ORDER);
		} else if ("不下單".equals(stockVo.getConfirm())) {
			order.setStatus("不單中");
		}
		orderService.save(order);
	}

	private void addNewCustomer(OrderVo orderVo, Date today) {
		Customer cus = customerService.findByCustomerId(orderVo.getCustomerId());
		if (cus == null) {
			Customer customer = new Customer();
			customer.setCustomerId(orderVo.getCustomerId());
			customer.setName(orderVo.getName());
			customer.setBodyType(orderVo.getBodyType());
			customer.setCustomerSource(orderVo.getCustomerSource());
			customer.setDeliveryType("依本館規則");
			customer.setNoticeType(orderVo.getNoticeType());
			customer.setPhone(orderVo.getPhone());
			customer.setAddressFirst(orderVo.getAddressFirst());
			customer.setBlockList("O");
			customer.setHint("");
			customer.setShippingMoney(0);
			customer.setCreateDate(today);
			customerService.save(customer);
		}
	}
	
	@RequestMapping(value = "/searchOrder")
	public List<Order> searchCustomer() {
		return orderService.getNonConfirm();
	}
	
	@RequestMapping(value = "/updateConfirm")
	public void updateConfirm(String orderId) {
		LOGGER.info("Update Order Confirm: id = {}", orderId);
		LocalDate localDate = LocalDate.now();
		Date today = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

		Order order = orderService.findByOrderId(orderId);
		order.setConfirm("下單");
		order.setStatus(Constants.READY_ORDER);
		order.setCreateDate(today);
		orderService.save(order);
		
		SalesOrder salesOrder = new SalesOrder();
		salesOrder.setOrderId(order.getOrderId());
		salesOrder.setCustomerId(order.getCustomerId());
		salesOrder.setBodyType(order.getBodyType());
		salesOrder.setCreateDate(today);
		salesOrder.setMaterialId(order.getMaterialId());
		salesOrder.setCutSize(order.getCutSize());
		salesOrder.setCusSize(order.getCusSize());
		salesOrder.setColor(order.getColor());
		salesOrder.setStatus(Constants.READY_ORDER);
		salesOrderSerivce.save(salesOrder);
	}
	
	@RequestMapping(value = "/searchArrivalOrder")
	public List<Order> searchArrivalOrder() {
		return orderService.getArrival();
	}
}

