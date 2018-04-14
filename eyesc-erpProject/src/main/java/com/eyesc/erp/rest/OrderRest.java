package com.eyesc.erp.rest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eyesc.erp.model.bean.Order;
import com.eyesc.erp.model.bean.OrderVo;
import com.eyesc.erp.model.bean.StockVo;
import com.eyesc.erp.model.service.OrderService;
import com.google.common.base.Strings;

@RestController
public class OrderRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomerRest.class);

	@Autowired
	private OrderService orderService;

	@RequestMapping(value = "/createOrder")
	public void createOrder(@RequestBody OrderVo orderVo) {
		LOGGER.info("Create Order: {}", orderVo);
		LocalDateTime localDateTime = LocalDateTime.now();
		String date = localDateTime.format(DateTimeFormatter.ofPattern("yyyyMMdd-HH:mm"));
		for (StockVo stockVo : orderVo.getStockVos()) {
			for (int i = 0 ; i < Integer.valueOf(stockVo.getCount()); i++) {
				Order order = new Order();
				order.setOrderId(orderVo.getCustomerId() + date);
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
				order.setCreateDate(new Date());
				if ("待確認".equals(stockVo.getConfirm())) {
					order.setStatus("待確認");
				} else {
					order.setStatus("下單中");
				}
				orderService.save(order);
			}
		}
	}
	
	@RequestMapping(value = "/searchOrder")
	public List<Order> searchCustomer() {
		return orderService.getNonConfirm();
	}
	
	@RequestMapping(value = "/updateConfirm")
	public void updateConfirm(String id) {
		LOGGER.info("Update Order Confirm: id = {}", id);
		Order order = orderService.findById(Long.valueOf(id));
		order.setConfirm("下單");
		order.setStatus("已下單");
		orderService.save(order);
	}
	
}

