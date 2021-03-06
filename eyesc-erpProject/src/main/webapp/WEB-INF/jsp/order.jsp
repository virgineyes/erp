<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  	<head>
  		<title>客戶互動紀錄表</title>
		<%@ include file="header.jsp" %>
		<script src="public/js/order.js"></script>
		<script src="public/js/3part/checkbox.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	</head>
	    
	<body>
	<%@ include file="nav.jsp" %>
    
    <div class="container">
       	<br>
    		<br>
        <h2>客戶互動紀錄表</h2>
        <br>
        <form id="orderForm">
        		<div class="col-sm-12">
            <div class="form-group control-label col-sm-3">
                <label for="customerId">FB/Line/網站名+電話末五碼:</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="customerId" name = "customerId">
     				  <div class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="getCustomer()">輸入末五碼</button>
               		 </div>
                </div> 
            </div>
             
            
            <div class="form-group control-label col-sm-2">
                <label for="name">收件人:</label>
                    <input type="text" class="form-control" id="name" name="name">
            </div>
            
             <div class="form-group control-label col-sm-1">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="bodyType" name="bodyType">
            </div>
          
            <div class="form-group control-label col-sm-2">
                <label  for="customerSource">客戶來源:</label>
                    <select class="form-control" id="customerSource" name = "customerSource">
                    <option value="Line">Line</option>
                    <option value="FB">FB</option>
                    <option value="網站">網站</option>
                    <option value="電話">電話</option>
                </select>
            </div>
            
            	<div class="form-group control-label col-sm-2">
                <label for="deliveryType">運費方案:</label>
                    <select class="form-control" id="deliveryType" name="deliveryType">
                    <option value="本島">依本島運費規則</option>
                    <option value="外島">依外島運費規則</option>
                    <option value="完全免運">完全免運</option>
                    <option value="這單免運">這單免運</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="paymentTerm">匯款/貨到付款:</label>
                    <select class="form-control" id="paymentTerm" name="paymentTerm">
                    <option>貨到付款</option>
                    <option>匯款</option>
                </select>
            </div>
            </div>
            
            <div class="col-sm-12">
            <div class="form-group control-label col-sm-2">
                <label for="noticeType">出貨前通知:</label>
                    <select class="form-control" id="noticeType" name="noticeType">
                    <option value="不通知">不通知</option>
                    <option value="Line">LINE</option>
                    <option value="簡訊">簡訊</option>
                    <option value="電話">電話</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="phone">電話:</label>
                <input type="text" class="form-control" id="phone" name ="phone">
            </div>
            
            <div class="form-group control-label col-sm-4">
                <label for="addressFirst">地址1:</label>
                <input type="text" class="form-control" id="addressFirst" name = "addressFirst">
            </div>
            <div class="form-group control-label col-sm-4">
                <label for="addressSecond">地址2(限定此單):</label>
                <input type="text" class="form-control" id="addressSecond" name = "addressSecond">
            </div>
            </div>
                      
            <input type="hidden" class="form-control" id="stockId0" name="stockId0">
            
            <div class="col-sm-12">
            <div class="form-group control-label col-sm-3">
                <label for="materialId">貨號:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="materialId0" name = "materialId">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="getStock(0)">庫存</button>
                    </span>
                    <span class="input-group-btn">
                        <button class="btn btn-success" type="button" onclick="getMaterialId(0)">貨號</button>
                    </span>
                </div> 
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="price">價格:</label>
                    <input type="text" class="form-control" id="price0" name="price" disabled>
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="cutSize">剪標尺碼:</label>
                    <input type="text" class="form-control" id="cutSize0" name="cutSize">
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="cusSize">客要尺碼:</label>
                    <input type="text" class="form-control" id="cusSize0" name="cusSize">
            </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="color">顏色:</label>
                    <input type="text" class="form-control" id="color0" name="color">
            </div>
            
             <div class="form-group control-label col-sm-1">
                <label for="count">件數:</label>
                    <input type="text" class="form-control" id="count0" name="count">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="priceType">出清/原價</label>
                    <select class="form-control" id="priceType0" name="priceType"  disabled>
                    <option>原價</option>
                    <option>出清</option>  
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="confirm">下單/不下單:</label>
                    <select class="form-control" id="confirm0" name="confirm">
                    <option>待確認</option>
                    <option>下單</option>
                    <option>不下單</option>
                </select>
            </div>
 
            <input type="text" class="form-control" id="employee0" style="display:none">    
            </div>
            
            <div class="col-sm-12">
	            <div class="col-sm-1" id ="addNewMaterialId">   
	                <button type="button" onclick="addMaterialIdBtn()" class="btn btn-warning" >新增貨號</button>
	            </div>
	            <div class="col-sm-1" style="display:none" id ="deleteAddMaterialIdBtn">   
	                <button type="button" onclick="deleteAddMaterialIdBtn()" class="btn btn-danger" >刪除新增貨號</button>
	            </div>
            </div>
             <div class="col-sm-12" align="right">   
                <button type="submit" class="btn btn-primary" >送出訂單</button>
            </div>            
        </form>    
    </div>  
    
   	<br/>
    
	<div class="container" id="newOrder" style="display:none">
   	 	<table id="newOrderTable"> </table>
    		<button id="deleteNewOrder" type="button" onclick="" class="btn btn-warning">刪除新增訂單</button> 
   	 	<button id="confirmNewOrder" type="button" class="btn btn-primary">確認新增訂單</button> 
	</div>
	
	<br/>

	<div class="container">
  	  <div class="col-sm-12">
       <h3>待確認訂單：</h3>
      </div>
    </div>

	<br/>
	
	 <div class="container" id="queryOrderTableContainer" style="display:none">
		<table id="queryOrderTable" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
           	  <th>ID</th>
		      <th>訂單ID</th>
              <th>客戶ID</th>
              <th>姓名</th>
              <th>身形</th>
              <th>客戶來源</th>
              <th>運費方案</th>
              <th>匯款/貨到付款</th>	
              <th>出貨前通知</th>
              <th>電話</th>
              <th>地址1</th>
              <th>地址2</th>
              <th>庫存ID</th>
              <th>貨號</th>
              <th>剪標尺碼</th>
              <th>客要尺碼</th>
              <th>顏色</th>
              <th>原價/出清</th>
              <th>下單/不下單</th>
              <th>下單人員</th>
              <th>價格</th>
              <th>客戶下訂單日</th>
              <th>出貨日</th>
              <th>到貨日</th>
              <th>下單</th>
              <th>更新</th>
            	</tr>
        		</thead>
		</table>
	</div>
    	
    <%@ include file="insertCustomerBootbox.jsp" %>
</body>
</html>