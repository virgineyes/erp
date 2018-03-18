<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  	<head>
  		<title>客戶互動紀錄表</title>
		<%@ include file="header.jsp" %>
		<script src="public/js/order.js"></script>  
	</head>
	    
	<body>
	<%@ include file="nav.jsp" %>
    
    <div class="container">
       	<br>
    	<br>
        <h2>客戶互動紀錄表</h2>
        <br>
        <form id="orderForm">         
            <div class="form-group control-label col-sm-3">
                <label for="customerId">FB/Line/網站名+電話末五碼:</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="customerId" name = "customerId">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="getCustomer()">帶入舊客戶</button>
                    </span>
                </div> 
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="name">收件人:</label>
                    <input type="text" class="form-control" id="name" name="name">
            </div>
          
            <div class="form-group control-label col-sm-2">
                <label  for="customerSource">客戶來源:</label>
                    <select class="form-control" id="customerSource" name = "customerSource">
                    <option>FB</option>
                    <option>Line</option>
                    <option>網站</option>
                    <option>電話</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="bodyType" name="bodyType">
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
            
                        
             <div class="form-group control-label col-sm-2">
                <label for="noticeType">出貨前通知:</label>
                    <select class="form-control" id="deliveryType" name="noticeType">
                    <option>不通知</option>
                    <option>簡訊</option>
                    <option>電話</option>
                    <option>LINE</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="delivery">運費方案:</label>
                    <select class="form-control" id="delivery" name="delivery">
                    <option>本島運費60</option>
                    <option>外島運費200</option>
                    <option>完全免運</option>
                    <option>三件或滿2000免運</option>
                    <option>來貨問題新單免運</option>
                </select>
            </div>
            
            <input type="hidden" class="form-control" id="stockId" name="stockId">
            
            <div class="form-group control-label col-sm-2">
                <label for="materialId">貨號:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="materialId" name = "materialId">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="getStock()">庫存</button>
                    </span>
                </div> 
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="priceType">出清/現貨原價</label>
                    <select class="form-control" id="priceType" name="priceType"  disabled>
                    <option>現貨原價</option>
                    <option>出清</option>  
                </select>
            </div>
            
             <div class="form-group control-label col-sm-2">
                <label for="count">件數:</label>
                    <input type="text" class="form-control" id="count" name="count">
            </div>
            
             <div class="form-group control-label col-sm-2">
                <label for="cutSize">剪標尺碼:</label>
                    <input type="text" class="form-control" id="cutSize" name="cutSize">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="cusSize">客要尺碼:</label>
                    <input type="text" class="form-control" id="cusSize" name="cusSize">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="color">顏色:</label>
                    <input type="text" class="form-control" id="color" name="color">
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="payment">匯款/貨到付款:</label>
                    <select class="form-control" id="payment" name="payment">
                    <option>貨到付款</option>
                    <option>匯款</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="confirm">客戶下單/不下單:</label>
                    <select class="form-control" id="confirm" name="confirm">
                    <option>待確認</option>
                    <option>客戶下單</option>
                    <option>客戶不下單</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="employee">工作人員:</label>
                    <input type="text" class="form-control" id="employee" name="employee" disabled>    
                </div>
            
            
            <div class="form-group control-label col-sm-3">
                <label for="orderComplete">完成:</label>
                    <select class="form-control" id="orderComplete" name="orderComplete" disabled >
                    <option >N</option>
                    <option>Y</option>
                </select>
            </div>
            
             <div class="col-sm-12">   
                <button type="submit" class="btn btn-primary">新增訂單</button>
            </div>
        </form>    
    </div>  
    
   	<br/>
    
	<div class="container" id="newOrder" style="display:none">
   	 	<table id="newCustomerTable"> </table>
    	<button id="deleteNewCustomer" type="button" onclick="" class="btn btn-warning">刪除新增客戶</button> 
    	<button id="confirmNewCustomer" type="button" class="btn btn-primary">確認新增客戶</button> 
	</div>
	
	<br/>

    <div class="container">
      <form class="form-inline"> 
          <label for="queryOrder" style="margin:5px 5px 5px 5px;">收尋 (訂單):</label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="queryOrderId" name="queryOrderId">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="queryOrder" class="btn btn-success">搜尋客戶</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container">
		<table id="queryList" class="display" style="visibility:hidden"> </table>
	</div>
    
</body>
</html>