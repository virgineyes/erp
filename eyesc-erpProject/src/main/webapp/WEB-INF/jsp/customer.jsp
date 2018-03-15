<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
	  <title>客戶資料表</title>
	  <%@ include file="header.jsp" %>
	  <script src="public/js/customer.js"></script>  
	</head>

	<body>
	<%@ include file="nav.jsp" %>

    <div class="container">
    	<br>
    	<br>
        <h2>客戶資料表</h2>
        <br>
        <form id="customerForm">
           <div class="form-group control-label col-sm-4">
               <label for="customerId">FB/Line/網站名+電話末五碼(客戶ID):</label>
               <input type="text" class="form-control" id="customerId" name="customerId">
           </div>
           
           <div class="form-group control-label col-sm-3">
                <label for="name">收件人:</label>
                <input type="text" class="form-control" id="name" name="name">
           </div>
            
           <div class="form-group control-label col-sm-2">
               <label  for="customerSource">客戶來源:</label>
               <select class="form-control" id="customerSource" name="customerSource">
                   <option value="FB">FB</option>
                   <option value="Line">Line</option>
                   <option value="網站">網站</option>
                   <option value="電話">電話</option>   
               </select>
           </div>
               
           <div class="form-group control-label col-sm-3">
                <label for="blockList">客戶狀態:</label>
                <select class="form-control" id="blockList" name="blockList">
                    <option value="1">接單客戶</option>
                    <option value="0">不接單客戶</option>
               	</select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="deliveryType">運費方案:</label>
                    <select class="form-control" id="deliveryType" name="deliveryType">
                    <option>依本館規則</option>
                    <option>完全免運</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="shippingMoney">購物金:</label>
                    <input type="text" class="form-control" id="shippingMoney" name="shippingMoney">    
            </div>
            
            
            <div class="form-group control-label col-sm-3">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="bodyType" name="bodyType">    
            </div> 
                       
            <div class="form-group control-label col-sm-2">
                <label for="noticeType">出貨前通知:</label>
                    <select class="form-control" id="noticeType" name="noticeType">
                    <option>Line</option>
                    <option>簡訊</option>
                    <option>電話</option>             
                </select>
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="phone">電話:</label>
                    <input type="text" class="form-control" id="phone" name="phone">    
            </div>
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="4" id="hint" name="hint"></textarea>
            </div>
            
            <div class="form-group control-label col-sm-6">
                <label for="addressFirst">地址1:</label>
                    <input type="text" class="form-control" id="addressFirst" name="addressFirst">
                </div>
            <div class="form-group control-label col-sm-6">
                <label for="addressSecond">地址2(限定此單):</label>
               		<input type="text" class="form-control" id="addressSecond" name="addressSecond">    
            </div>
                
            <div class="col-sm-12">   
                <button type="submit" class="btn btn-primary">新增訂單</button>
            </div>
        </form>    
    </div>
    
	<br/>
    
	<div class="container" id="newCustomer" style="display:none">
   	 	<table id="newCustomerTable"> </table>
    	<button id="deleteNewCustomer" type="button" onclick="" class="btn btn-warning">刪除新增客戶</button> 
    	<button id="confirmNewCustomer" type="button" class="btn btn-primary">確認新增客戶</button> 
	</div>

	<br/>

    <div class="container">
      <form class="form-inline"> 
          <label for="queryCustomer" style="margin:5px 5px 5px 5px;">搜尋:</label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="queryCustomerId" name="queryCustomerId">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="queryCustomer" class="btn btn-success">搜尋客戶</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container" id="queryCustomerTableContainer" style="display:none">
		<table id="queryCustomerTable" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
	                <th>ID</th>
	                <th>客戶ID</th>
	                <th>收件人</th>
	                <th>客戶來源</th>
	                <th>接單客戶</th>
	                <th>運費方案</th>
	                <th>購物金</th>
	                <th>身型</th>
	                <th>出貨前通知</th>
	                <th>電話</th>
	                <th>備註</th>
	                <th>地址1</th>
	                <th>地址2(限定此單)</th>
	                <th>新增日期</th>   
	                <th>更新</th>  	
            	</tr>
        	</thead>
		</table>
	</div>
	
	
	<div id="update" class="container" style="display:none;">
	<div id="updateTitle"></div>
      <form id="updateForm">
           <input type="hidden" class="form-control" id="updateCustomerId" name="customerId">
		  
		   <div class="form-group control-label col-sm-3">
                <label for="name">收件人:</label>
                <input type="text" class="form-control" id="updateName" name="name">
           </div>
            
           <div class="form-group control-label col-sm-3">
               <label  for="customerSource">客戶來源:</label>
               <select class="form-control" id="updateCustomerSource" name="customerSource">
                   <option value="FB">FB</option>
                   <option value="Line">Line</option>
                   <option value="網站">網站</option>
                   <option value="電話">電話</option>  
               </select>
           </div>
               
           <div class="form-group control-label col-sm-3">
                <label for="blockList">客戶狀態:</label>
                <select class="form-control" id="updateBlockList" name="blockList">
                    <option value="1">接單客戶</option>
                    <option value="0">不接單客戶</option>
               	</select>
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="deliveryType">運費方案:</label>
                    <select class="form-control" id="updateDeliveryType" name="deliveryType">
                    <option value="依本館規則">依本館規則</option>
                    <option value="完全免運">完全免運</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-4">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="updateBodyType" name="bodyType">    
            </div> 
                       
            <div class="form-group control-label col-sm-4">
                <label for="noticeType">出貨前通知:</label>
                    <select class="form-control" id="updateNoticeType" name="noticeType">
                    <option value="Line">Line</option>
                    <option value="簡訊">簡訊</option>
                    <option value="電話">電話</option>             
                </select>
            </div>
            
            <div class="form-group control-label col-sm-4">
                <label for="phone">電話:</label>
                    <input type="text" class="form-control" id="updatePhone" name="phone">    
            </div>
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="4" id="updateHint" name="hint"></textarea>
            </div>
            
            <div class="form-group control-label col-sm-6">
                <label for="addressFirst">地址1:</label>
                    <input type="text" class="form-control" id="updateAddressFirst" name="addressFirst">
                </div>
            <div class="form-group control-label col-sm-6">
                <label for="addressSecond">地址2(限定此單):</label>
               		<input type="text" class="form-control" id="updateAddressSecond" name="addressSecond">    
            </div>
                
            <div class="col-sm-1">   
                <button type="submit" class="btn btn-primary">更新客戶</button>
            </div>
      </form>
      <div class="col-sm-11">   
          <button type="button" onclick="reload()" class="btn btn-success">取消更新客戶</button>
      </div>
    </div>
	</body> 
</html>