package com.eyesc.erp.util;

import java.nio.channels.IllegalSelectorException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {
	
	public static Date convert(String date) {
		try {
			return new SimpleDateFormat("yyyyMMdd").parse(date);
		} catch (ParseException e) {
			throw new IllegalSelectorException();
		}
	}
}
