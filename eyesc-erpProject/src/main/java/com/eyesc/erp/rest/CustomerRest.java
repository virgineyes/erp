package com.eyesc.erp.rest;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eyesc.erp.model.bean.Customer;
import com.eyesc.erp.model.service.CustomerService;

@RestController
public class CustomerRest {
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomerRest.class);

	@Autowired
	private CustomerService customerService;

	@RequestMapping(value = "/createCustomer")
	public String createCustomer(String customerId, String name, String customerSource, String blockList,
			String deliveryType, String shippingMoney, String bodyType, String noticeType, String phone, String addressFirst, String hint) {
		LOGGER.info("Create customerId: {}", customerId);
		Customer cus = customerService.findByCustomerId(customerId);
		Customer customer = null;
		if (cus == null) {
			customer = new Customer();
			customer.setCustomerId(customerId);
			customer.setName(name);
			customer.setCustomerSource(customerSource);
			customer.setDeliveryType(deliveryType);
			customer.setBlockList(blockList);
			if (shippingMoney != null && !"".equals(shippingMoney)) {
				customer.setShippingMoney(new Integer(shippingMoney));
			} else {
				customer.setShippingMoney(0);
			}

			customer.setBodyType(bodyType);
			customer.setNoticeType(noticeType);
			customer.setPhone(phone);
			customer.setAddressFirst(addressFirst);
			customer.setHint(hint);
			customer.setCreateDate(new Date());

			customerService.save(customer);
		}
		return null;
	}

	@RequestMapping(value = "/deleteCustomer")
	public String deleteCustomer(String id) {
		LOGGER.info("deleteId: {}", Long.parseLong(id));
		customerService.delete(Long.parseLong(id));
		return null;
	}

	@RequestMapping(value = "/searchCustomer")
	public List<Customer> searchCustomer(String customerId) {
		LOGGER.info("Search customerId: {}", customerId);
		return customerService.findByCustomerIdList(customerId);
	}

	@RequestMapping(value = "/searchOneCustomer")
	public Customer searchOneCustomer(String customerId) {
		LOGGER.info("Search One customerId: {}", customerId);
		return customerService.findByCustomerId(customerId);
	}

	@RequestMapping(value = "/updateCustomer")
	public Customer updateCustomer(String customerId, String name, String customerSource, String blockList,
			String deliveryType, String bodyType, String noticeType, String phone, String addressFirst, String hint) {
		LOGGER.info("Update customerId: {}", customerId);
		Customer customer = customerService.findByCustomerId(customerId);
		String newCustomerId = customerId.substring(0, customerId.length() - 5)
				+ phone.substring(phone.length() - 5, phone.length());
		customer.setCustomerId(newCustomerId);
		customer.setName(name);
		customer.setCustomerSource(customerSource);
		customer.setDeliveryType(deliveryType);
	    customer.setBlockList(blockList);
		customer.setBodyType(bodyType);
		customer.setNoticeType(noticeType);
		customer.setPhone(phone);
		customer.setAddressFirst(addressFirst);
		customer.setHint(hint);
		customer.setCreateDate(new Date());
		customerService.save(customer);
		return null;
	}
}
