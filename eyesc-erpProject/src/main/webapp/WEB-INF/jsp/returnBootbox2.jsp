<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="form-content2" style="display: none;">
	<form id="updateForm">

		<div class="form-group">
			<label for="date">收到退貨日:</label> <input type="date"
				class="form-control" id="receivedReturnsDate" name="receivedReturnsDate" placeholder="請輸入更新日期">
		</div>

		<div class="form-group">
			<label for="bankAccount">匯款帳號</label> <input type="text" class="form-control" id="bankAccount" name="bankAccount">
		</div>

		<div class="form-group">
			<label for="remittanceDay">匯款日:</label> <input type="date" class="form-control" id="remittanceDay" name="remittanceDay"	placeholder="請輸入更新日期">
		</div>

		<div class="form-group">
			<label for="customerNoticeRefund">通知客戶已退款:</label> 
			<select class="form-control" id="customerNoticeRefund" name="customerNoticeRefund">
				<option >N</option>
				<option >Y</option>
			</select>
		</div>
	</form>
</div>
