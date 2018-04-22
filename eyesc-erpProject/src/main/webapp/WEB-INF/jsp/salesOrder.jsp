<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>下單銷單追貨表</title>
<%@ include file="header.jsp"%>
<script src="public/js/salesOrder.js"></script>
</head>

<body>
	<%@ include file="nav.jsp"%>
	<div class="container">
		<br>
		<br>
		<br>
		<h2>下單銷單追貨表</h2>
	</div>
	<div>
		<br />
	</div>
	<div class="container" id="newsalesOrder" style="display: none">
		<table id="newSalesOrderTable">
		</table>
		<button id="deleteNewSalesOrder" type="button" onclick=""
			class="btn btn-warning">刪除新增</button>
		<button id="confirmNewSalesOrder" type="button"
			class="btn btn-primary">確認新增</button>
	</div>
	
	<div class="container col-sm-12 col-sm-offset-1">
		<form class="form-inline">
			<button type="button" style="margin: 5px 5px -5px 5px"
				id="orderBtn" class="btn btn-success" disabled>Jo下單</button>
			<button type="button" style="margin: 5px 5px -5px 5px"
				id="nonStockBtn" class="btn btn-success" disabled>通知沒貨</button>
			<button id="arriveBtn" type="button" onclick="" class="btn btn-info"
				style="margin: 5px 5px -5px 5px" disabled>押到貨日</button>
			<button id="cancleBtn" type="button" onclick="" class="btn btn-warning"
				style="margin: 5px 5px -5px 5px" disabled>銷單</button>
			<button id="nonShippingBtn" type="button" onclick="" class="btn btn-warning"
				style="margin: 5px 5px -5px 5px" disabled>不出貨</button>
		</form>
	</div>
	<br>
	<br>
	<br>
	
	<div class="container" id="querySalesOrderTableContainer"
		style="display: none">
		<table id="querySalesOrderTable"
			class="table table-striped table-bordered">
			<thead>
				<tr>
					<th>選擇</th>
					<th>訂單ID</th>
					<th>客戶ID</th>
					<th>身型</th>
					<th>客戶下單日</th>
					<th>貨號</th>
					<th>剪標尺碼</th>
					<th>客要尺碼</th>
					<th>顏色</th>
					<th>JO下單日</th>
					<th>到貨日</th>
					<th>狀態</th>
				</tr>
			</thead>
		</table>
	</div>
	<%@ include file="saleOrderBootbox.jsp"%>
	<%@ include file="salesOrderArrivalBootbox.jsp"%>
	<%@ include file="cancelDateBootbox.jsp"%>
	<%@ include file="nonShippingBootbox.jsp"%>
</body>
</html>