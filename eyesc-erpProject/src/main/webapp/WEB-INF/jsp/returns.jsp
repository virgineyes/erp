<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
	<head>
	<title>退貨匯款表</title>
		<%@ include file="header.jsp"%>
		<script src="public/js/return.js"></script>
	</head>

<body>
	<%@ include file="nav.jsp"%>
	<div class="container">
		<br> <br>
		<h2>退貨匯款表</h2>
		<h5 style="color: brown">*詢問客戶帳號 : 親愛的
			已收到您寄回的商品T~+T~，請問您的匯款資料，要匯$~給您哦~</h5>
		<h5 style="color: brown">*通知客戶已退款扣除運費 :
			已匯款請查收，因退換原訂單正價商品未達免運標準，加計原訂單60元物流費!謝謝您。</h5>
		<h5 style="color: brown">*通知客戶已退款 : 已匯款，請查收。</h5>
	</div>
	<br>
	<div class="container" id="buttonContainer">
		<form class="form-inline">
			<input type="text" style="margin: 5px 5px 5px 5px;" class="form-control" id="queryCustomerId" name="queryCustomerId">
				
			<button type="button" style="margin: 5px 5px 5px 5px;" id="queryCustomer" class="btn btn-success">搜尋訂單(客戶末五碼)</button>
				
			<input type="text" style="margin: 5px 5px 5px 5px;" class="form-control" id="queryReturnCustomerId" name="queryReturnCustomerId">
			
			<button type="button" style="margin: 5px 5px 5px 5px;" id="queryReturnCustomer" class="btn btn-info">搜尋退貨訂單</button>
				
			<button type="button" style="margin: 5px 5px 5px 5px;display: none" id="refound2" class="btn btn-warning">收到退貨日/退款</button>
				
			<button id="refound" type="button" onclick="" class="btn btn-warning" style="margin: 5px 5px 5px 5px; display: none">退貨/拒收</button>
				
			<button id="saleOrder" type="button" class="btn btn-primary" style="margin: 5px 5px 5px 5px; display: none">客戶銷單</button>
		</form>
	</div>
	<br>
	<div class="container" id="queryOrderTableContainer"
		style="display: none">
		<table id="queryOrderTable" class="table table-striped table-bordered">
			<thead>
				<tr>
					<th>選擇</th>
					<th>客戶ID</th>
					<th>收件人</th>
					<th>身型</th>
					<th>客戶來源</th>
					<th>運費方案</th>
					<th>付款方式</th>
					<th>出貨前通知</th>
					<th>電話</th>
					<th>地址一</th>
					<th>地址二(限定此單)</th>
					<th>貨號</th>
					<th>剪標尺碼</th>
					<th>客要尺碼</th>
					<th>顏色</th>
					<th>件數</th>
					<th>出清/現貨原價</th>
					<th>價格</th>
					<th>客戶下單</th>
					<th>工作人員</th>
					<th>換貨</th>
				</tr>
			</thead>
		</table>
	</div>
	<br>
	<div class="container" id="queryReturnsTableContainer"
		style="display: none">
		<table id="queryReturnsTable"
			class="table table-striped table-bordered">
			<thead>
				<tr>
					<th>	勾選</th>
					<th>客戶ID</th>
					<th>收件人</th>
					<th>運費方案</th>
					<th>電話</th>
					<th>貨號</th>
					<th>價格</th>
					<th>客戶通知退貨日</th>
					<th>客戶收貨日</th>
					<th>退貨不退款</th>
					<th>收到退貨日</th>
					<th>客戶拒收</th>
					<th>退貨原因</th>
					<th>匯款帳號</th>
					<th>匯款日</th>
					<th>通知客戶已退款</th>
					<th>	資訊</th>
				</tr>
			</thead>
		</table>
	</div>

	<div id="change" class="container" style="display: none;">
		<div id="updateTitle"></div>
		<form id="changeForm">
			<input type="hidden" class="form-control" id="updateOrderId"
				name="orderId">
			<div class="form-group control-label col-sm-3" >
				<label for="customerId">FB/Line/網站名+電話末五碼(客戶ID):</label> <input
					type="text" class="form-control" id="updateCustomerId"
					name="customerId" disabled>
			</div>
			
			<div class="form-group control-label col-sm-2">
                <label for="name">收件人:</label>
                <input type="text" class="form-control" id="updateName" name="name">
           </div>
           
           <div class="form-group control-label col-sm-1">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="updateBodyType" name="bodyType">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label  for="customerSource">客戶來源:</label>
                    <select class="form-control" id="updateCustomerSource" name = "customerSource">
                    <option>Line</option>
                    <option>FB</option>
                    <option>網站</option>
                    <option>電話</option>
                </select>
            </div>

			<div class="form-group control-label col-sm-2">
				<label for="delivery">運費方案:</label> <select class="form-control"
					id="updateDelivery" name="delivery">
					<option value="60">本島運費60</option>
					<option value="200">外島運費200</option>
					<option value="0">完全免運</option>
					<option value="0">三件或滿2000免運</option>
					<option value="0">來貨問題新單免運</option>
				</select>
			</div>

			<div class="form-group control-label col-sm-2">
				<label for="phone">電話:</label> <input type="text"
					class="form-control" id="updatePhone" name="phone">
			</div>
			
			<div class="form-group control-label col-sm-6">
                <label for="addressFirst">地址1:</label>
                <input type="text" class="form-control" id="updateAddressFirst" name = "addressFirst">
            </div>
            <div class="form-group control-label col-sm-6">
                <label for="addressSecond">地址2(限定此單):</label>
                <input type="text" class="form-control" id="updateAddressSecond" name = "addressSecond">
            </div>

			<div class="form-group control-label col-sm-3">
				<label for="materialId">換貨貨號:</label>
				<div class="input-group">
					<input type="text" class="form-control" id="updateMaterialId"
						name="materialId"> <span class="input-group-btn">
						<button class="btn btn-primary" type="button" onclick="stockNum()">庫存</button>
					</span>
				</div>
			</div>
			
			<div class="form-group control-label col-sm-2">
				<label for="price">價格</label> <input type="text"
					class="form-control" id="updatePrice" name="price">
			</div>
			
			<div class="form-group control-label col-sm-1">
                <label for="cutSize">剪標尺碼:</label>
                    <input type="text" class="form-control" id="updateCutSize" name="cutSize">
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="cusSize">客要尺碼:</label>
                    <input type="text" class="form-control" id="updateCusSize" name="cusSize">
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="color">顏色:</label>
                    <input type="text" class="form-control" id="updateColor" name="color">
            </div>
            
             <div class="form-group control-label col-sm-1">
                <label for="count">件數:</label>
                    <input type="text" class="form-control" id="updateCount" name="count">
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="priceType">出清/現貨原價</label>
                    <select class="form-control" id="updatePriceType" name="priceType" >
                    <option>現貨原價</option>
                    <option>出清</option>  
                </select>
            </div>

			<div class="form-group control-label col-sm-3">
				<label for="customerReturnsDate">客戶通知退貨日:</label> <input type="date"
					class="form-control" id="updateCustomerReturnsDate"
					name="customerReturnsDate" min="2011-04-01" max="2117-04-30">
			</div>

			<div class="form-group control-label col-sm-3">
				<label for="customerReceivingDate">客戶收貨日:</label> <input type="date"
					class="form-control" id="updateCustomerReceivingDate"
					name="customerReceivingDate" min="2011-04-01" max="2117-04-30">
			</div>

			<div class="form-group control-label col-sm-3">
				<label for="receivedReturnsDate">收到退貨日:</label> <input type="date"
					class="form-control" id="updateReceivedReturnsDate"
					name="receivedReturnsDate" min="2011-04-01" max="2117-04-30">
			</div>

			<div class="form-group control-label col-sm-3">
				<label for="reasonsForReturns">退貨原因:</label> <select
					class="form-control" id="updateReasonsForReturns"
					name="reasonsForReturns">
					<option value="0">N</option>
					<option value="尺碼">尺碼</option>
					<option value="瑕疵">瑕疵</option>
					<option value="其他">其他</option>
				</select>
			</div>

			<div class="form-group control-label col-sm-4" style="display: none">
				<label for="employee">工作人員:</label> <input type="text"
					class="form-control" id="updatEemployee" name="employee">
			</div>
			<div class="col-sm-1">
				<br>
				<button type="submit" class="btn btn-primary">填寫完成</button>
			</div>
		</form>
		<div class="col-sm-11">
			<br>
			<button type="button" onclick="reload()" class="btn btn-success">取消</button>
		</div>
	</div>
	<br>
	<br>
	<%@ include file="returnBootbox.jsp"%>
	<%@ include file="returnBootbox2.jsp"%>
</body>
</html>