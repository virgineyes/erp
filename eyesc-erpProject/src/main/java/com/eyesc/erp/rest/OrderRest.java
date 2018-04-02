package com.eyesc.erp.rest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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
		LOGGER.info("Create customerId: {}", orderVo);
		LocalDate localDate = LocalDate.now();
		String date = localDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
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
				order.setOrderComplete("N");
				order.setPrice(Integer.valueOf(stockVo.getPrice()));
				order.setCreateDate(tranferDate(localDate));
				order.setStatus("下單中");
				orderService.save(order);
			}
		}
	}
	
	private Date tranferDate(LocalDate localDate) {
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}
	
}

