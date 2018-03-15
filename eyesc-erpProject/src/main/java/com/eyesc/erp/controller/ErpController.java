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
	public String inventory(HttpServletRequest request) {
		return "/material";
	}
}
