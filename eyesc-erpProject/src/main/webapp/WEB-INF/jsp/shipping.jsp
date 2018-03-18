<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
	<head>
  		<title>出貨表</title>
		<%@ include file="header.jsp" %>
	    <script src="public/js/shipping.js"></script>  
	</head>
    
	<body>
  	<%@ include file="nav.jsp" %>
    
    <div class="container">
        <br>
    	<br>
        <h2>出貨表</h2>
        <br>
        <div class="col-sm-12">   
            <button type="submit" class="btn btn-primary">確定出貨日</button>
        </div>
    
        
        <form id="shippingForm">
            <div class="form-group control-label col-sm-3">
                <label for="customerId">FB/Line/網站名+電話末五碼(客戶ID):</label>
                
                    <input type="text" class="form-control" id="customerId" name = "customerId">
            </div>
          
            <div class="form-group control-label col-sm-2">
                <label  for="customerSource">客戶來源:</label>
                    <select class="form-control" id="customerSource" name = "customerSource">
                    <option value="FB">FB</option>
                    <option value="Line">Line</option>
                    <option value="網站">網站</option>
                    <option value="電話">電話</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="addressee">收件人:</label>
                    <input type="text" class="form-control" id="addressee" name="addressee">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="phone">電話:</label>
                    <input type="text" class="form-control" id="phone" name ="phone">
                </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="materialId">貨號:</label>
                    
                        <input type="text" class="form-control" id="materialId" name = "materialId">
                
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="delivery">運費方案:</label>
                    <select class="form-control" id="delivery" name="delivery">
                    <option value="60">本島運費60</option>
                    <option value="200">外島運費200</option>
                    <option value="0">完全免運</option>
                    <option value="0">三件或滿2000免運</option>
                    <option value="0">來貨問題新單免運</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="price">價格</label>
                  <input type="text" class="form-control" id="price" name ="price">  
            </div>
            
            
            
            
             <div class="form-group control-label col-sm-2">
                <label for="shippingNotice">出貨前通知:</label>
                    <select class="form-control" id="shippingNotice" name="shippingNotice">
                    <option value="不通知">不通知</option>
                    <option value="簡訊">簡訊</option>
                    <option value="電話">電話</option>
                    <option value="ＬＩＮＥ">LINE</option>
                    
                </select>
            </div>
            
            
            
            <div class="form-group control-label col-sm-2">
                <label for="shippingMoney">購物金隨貨出:</label>
                    <select class="form-control" id="shippingMoney" name="shippingMoney">
                    <option value="0">Ｎ</option>
                    <option value="1">Ｙ</option>
                    
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="shippingＤate">出貨日</label>
                    <input type="date" class="form-control" id="shippingＤate" name="shippingＤate" min="2011-04-01" max="2117-04-30">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="shippingTotalPrice">總價格</label>
                  <input type="text" class="form-control" id="shippingTotalPrice" name ="shippingTotalPrice">  
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="employee">工作人員:</label>
                    <input type="text" class="form-control" id="employee" name="employee" disabled>    
                </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="customerOrderComplete">完成:</label>
                    <select class="form-control" id="customerOrderComplete" name="customerOrderComplete" disabled >
                    <option value="0" >N</option>
                    <option value="1">Y</option>
                    
                </select>
                
                </div>
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="2" id="hint" name="hint"></textarea>
            </div>
        </form>    

    </div>
    
     <div>
		<br/>
    </div>
    
	<div class="container" id="newCustomer" style="display:none">
   	 	<table id="newCustomerTable"> </table>
    	<button id="deleteNewCustomer" type="button" onclick="" class="btn btn-warning">刪除新增出貨</button> 
    	<button id="confirmNewCustomer" type="button" class="btn btn-primary">確認新增出貨</button> 
	</div>
	
	<div>
		<br/>
    </div>

	 <div class="container">
      <form class="form-inline"> 
          <label for="queryShippingＤate" style="margin:5px 5px 5px 5px;">搜尋:</label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="queryReturn" name="queryReturn">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="queryShippingＤate" class="btn btn-success">搜尋出貨紀錄</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container" id="queryShippingTableContainer" style="display:none">
		<table id="queryShippingTableContainer" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
	                
	                <th>ID</th>
                    <th>客戶來源</th>
	                <th>收件人</th>
	                <th>電話</th>
	                <th>貨號</th>
	                <th>價格</th>
                    <th>出貨前通知</th>
	                <th>運費方案</th>   
	                <th>購物金隨貨出</th>
                    <th>出貨日</th>
                    <th>總價格</th>
                    <th>工作人員</th>
                    <th>備註</th>
                    <th>完成</th>
            	</tr>
        	</thead>
		</table>
	</div>
	</body>
</html>