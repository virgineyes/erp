package com.eyesc.erp.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ErpController {
	@RequestMapping(value = "/customer", method = RequestMethod.GET)
	public String customer(HttpServletRequest request) {
		return "/customer";
	}
	
	@RequestMapping(value = "/order", method = RequestMethod.GET)
	public String order(HttpServletRequest request) {
		return "/order";
	}
	
	@RequestMapping(value = "/material", method = RequestMethod.GET)
	public String material(HttpServletRequest request) {
		return "/material";
	}
	
	@RequestMapping(value = "/stock", method = RequestMethod.GET)
	public String stock(HttpServletRequest request) {
		return "/stock";
	}
	
	@RequestMapping(value = "/shipping", method = RequestMethod.GET)
	public String shipping(HttpServletRequest request) {
		return "/shipping";
	}
	
	@RequestMapping(value = "/returns", method = RequestMethod.GET)
	public String returns(HttpServletRequest request) {
		return "/returns";
	}
	
	@RequestMapping(value = "/salesOrder", method = RequestMethod.GET)
	public String salesOrder(HttpServletRequest request) {
		return "/salesOrder";
	}
}
