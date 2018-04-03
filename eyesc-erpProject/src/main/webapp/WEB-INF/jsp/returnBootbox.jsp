<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="form-content" style="display: none;">
	<form id="updateForm">
		<div class="form-group">
			<label for="date">客戶通知退貨日:</label> <input type="date" class="form-control" id="customerReturnsDate" name="customerReturnsDate" placeholder="請輸入更新日期">
		</div>

		<div class="form-group">
			<label for="date">客戶收貨日:</label> <input type="date" class="form-control" id="customerReceivingDate" name="customerReceivingDate" placeholder="請輸入更新日期">
		</div>

		<div class="form-group">
			<label for="nonRefundable">退貨不退款:</label> 
			<select class="form-control" id="nonRefundable" name="nonRefundable">
				<option value="0">N</option>
				<option value="1">Y</option>
			</select>
		</div>

		<div class="form-group" style="display:none">
			<label for="date">收到退貨日:</label> <input type="date"class="form-control" id="receivedReturnsDate"name="receivedReturnsDate" placeholder="請輸入更新日期">
		</div>

		<div class="form-group" style="display:none">
			<label for="customerRejected">客戶拒收:</label>
			<select class="form-control" id="customerRejected" name="customerRejected">
				<option value="0">N</option>
				<option value="1">Y</option>
			</select>
		</div>

		<div class="form-group">
			<label for="reasonsForReturns">退貨原因:</label>
			<select class="form-control" id="reasonsForReturns" name="reasonsForReturns">
				<option value="尺碼">尺碼</option>
				<option value="瑕疵">瑕疵</option>
				<option value="其他">其他</option>
			</select>
		</div>

		<div class="form-group" style="display:none">
			<label for="bankAccount">匯款帳號</label> <input type="text" class="form-control" id="bankAccount" name="bankAccount">
		</div>

		<div class="form-group" style="display: none">
			<label for="remittanceDay">匯款日:</label> <input type="date" class="form-control" id="remittanceDay" name="remittanceDay" placeholder="請輸入更新日期">
		</div>

		<div class="form-group" style="display: none">
			<label for="customerNoticeRefund">通知客戶已退款:</label> 
			<select class="form-control" id="customerNoticeRefund" name="customerNoticeRefund">
				<option value="0">N</option>
				<option value="1">Y</option>
			</select>
		</div>
	</form>
</div>
