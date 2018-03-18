<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
	  <title>下單銷單追貨表</title>
	  <%@ include file="header.jsp" %>
	  <script src="public/js/salesOrder.js"></script>  
	</head>

	<body>
	<%@ include file="nav.jsp" %>
	<div class="container">
        <br>
        <br>
        <h2>下單銷單追貨表</h2>
        <br>
        <form id="salesOrderForm">
            
            <div class="form-group control-label col-sm-3">
                <label for="materialId">貨號:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="materialId" name = "materialId">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="stockNum()">庫存</button>
                    </span>
                </div> 
            </div>
            
            
            <div class="form-group control-label col-sm-2">
               <label  for="followUp">追單:</label>
               <select class="form-control" id="followUp" name="followUp">
                   <option value="0">Ｎ</option>
                   <option value="1">Ｙ</option>
               </select>

           </div>
            
           <div class="form-group control-label col-sm-2">
               <label for="noStock">通知客戶沒貨:</label>
               <select class="form-control" id="noStock" name="noStock">
                   <option value="0">N</option>
                   <option >通知客戶沒貨</option>
               </select>
           </div>
            
               
            <div class="form-group control-label col-sm-2">
                <label for="reasonForNoShipped">不出貨原因:</label>
                <select class="form-control" id="reasonForNoShipped" name="reasonForNoShipped">
                    <option >尺碼</option>
                    <option >瑕疵</option>
                    <option >顏色</option>
                    <option >其他</option>
               	</select>
            </div>
            
            
            
            <div class="form-group control-label col-sm-2">
                <label for="manufacturerNotShip">廠商沒出貨:</label>
                    <select class="form-control" id="manufacturerNotShip" name="manufacturerNotShip">         
                        <option value="0">N</option>
                        <option>廠商沒出貨</option>
                    </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="salesOrder">客戶銷單:</label>
                    <select class="form-control" id="salesOrder" name="salesOrder">     
                        <option value="0">N</option>
                        <option value="1">Y</option>
                    </select>
            </div> 
            
             <div class="form-group control-label col-sm-2">
               <label for="JOOrderDate">JO下單日:</label>
               <input type="date" class="form-control" id="JOOrderDate" name="JOOrderDate" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-2">
               <label for="orderDate">客戶下單日:</label>
               <input type="text" class="form-control" id="orderDate" name="orderDate" disabled>
           </div>
            
            <div class="form-group control-label col-sm-2">
               <label for="materialArrivalDay">到貨日:</label>
               <input type="date" class="form-control" id="materialArrivalDay" name="materialArrivalDay" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="salesOrderＮum">件數:</label>
                    <input type="text" class="form-control" id="salesOrderＮum" name="salesOrderNum">    
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
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="2" id="hint" name="hint"></textarea>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="salesOrderComplete">完成:</label>
                    <select class="form-control" id="salesOrderComplete" name="salesOrderComplete" disabled >
                    <option >N</option>
                    <option>Y</option>
                </select>
            </div>
            
            <div class="col-sm-12">   
                <button type="submit" class="btn btn-primary">新增</button>
            </div>
        </form>    
    </div>
    
    <div>
		<br/>
    </div>
    
	<div class="container" id="newsalesOrder" style="display:none">
   	 	<table id="newSalesOrderTable"> </table>
    	<button id="deleteNewSalesOrder" type="button" onclick="" class="btn btn-warning">刪除新增</button> 
    	<button id="confirmNewSalesOrder" type="button" class="btn btn-primary">確認新增</button> 
	</div>
	
	<div>
		<br/>
    </div>
  
    <div class="container">
      <form class="form-inline"> 
          <label for="querySalesOrder" style="margin:5px 5px 5px 5px;">搜尋:</label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="querySalesOrder" name="querySalesOrder">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="querySalesOrder" class="btn btn-success">搜尋  (追/銷單)</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container" id="querySalesOrderTableContainer" style="display:none">
		<table id="querySalesOrderTableContainer" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
	                <th>貨號</th>
	                <th>追單</th>
	                <th>通知客戶沒貨</th>
	                <th>不出貨原因</th>
	                <th>廠商沒出貨</th>
	                <th>客戶銷單</th>
	                <th>JO下單日</th>
	                <th>客戶下單日</th>
	                <th>到貨日</th>
	                <th>件數</th>
	                <th>剪標尺碼</th>
	                <th>客要尺碼</th>
	                <th>顏色</th>
                    <th>備註</th>
	                <th>完成</th>   
            	</tr>
        	</thead>
		</table>
	</div>
	
	
	<div id="update" class="container" style="display:none;">
	<div id="updateTitle"></div>
      <form id="updateForm">
            <input type="hidden" class="form-control" id="updateMaterialId" name="materialId">
          
            <div class="form-group control-label col-sm-3">
                <label for="materialId">貨號:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="updateMaterialId" name = "materialId">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="stockNum()">庫存</button>
                    </span>
                </div> 
            </div>
            
            
            <div class="form-group control-label col-sm-2">
               <label  for="followUp">追單:</label>
               <select class="form-control" id="updateFollowUp" name="followUp">
                   <option value="0">Ｎ</option>
                   <option value="1">Ｙ</option>
               </select>

           </div>
            
           <div class="form-group control-label col-sm-2">
               <label for="noStock">通知客戶沒貨:</label>
               <select class="form-control" id="noStock" name="updayeNoStock">
                   <option value="0">N</option>
                   <option >通知客戶沒貨</option>
               </select>
           </div>
            
               
            <div class="form-group control-label col-sm-2">
                <label for="reasonForNoShipped">不出貨原因:</label>
                <select class="form-control" id="updateReasonForNoShipped" name="reasonForNoShipped">    
                    <option >尺碼</option>
                    <option >瑕疵</option>
                    <option >顏色</option>
                    <option >其他</option>
               	</select>
            </div>

            <div class="form-group control-label col-sm-2">
                <label for="manufacturerNotShip">廠商沒出貨:</label>
                    <select class="form-control" id="updateManufacturerNotShip" name="manufacturerNotShip">
                        
                        <option value="0">N</option>
                        <option>廠商沒出貨</option>
                    </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="salesOrder">客戶銷單:</label>
                    <select class="form-control" id="updateSalesOrder" name="salesOrder">
                        
                        <option value="0">N</option>
                        <option value="1">Y</option>
                    </select>
            </div> 
            
             <div class="form-group control-label col-sm-2">
               <label for="JOOrderDate">JO下單日:</label>
               <input type="date" class="form-control" id="updateJOOrderDate" name="JOOrderDate" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-2">
               <label for="orderDate">客戶下單日:</label>
               <input type="text" class="form-control" id="updateOrderDate" name="orderDate" disabled>
           </div>
            
            <div class="form-group control-label col-sm-2">
               <label for="materialArrivalDay">到貨日:</label>
               <input type="date" class="form-control" id="updateMaterialArrivalDay" name="materialArrivalDay" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-1">
                <label for="salesOrderＮum">件數:</label>
                    <input type="text" class="form-control" id="updateSalesOrderＮum" name="salesOrderNum">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="cutSize">剪標尺碼:</label>
                    <input type="text" class="form-control" id="updateCutSize" name="cutSize">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="cusSize">客要尺碼:</label>
                    <input type="text" class="form-control" id="updateCusSize" name="cusSize">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="color">顏色:</label>
                    <input type="text" class="form-control" id="updateColor" name="color">
            </div>
          
          <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="2" id="updateHint" name="hint"></textarea>
            </div>
            
            <div class="col-sm-1">   
                <button type="submit" class="btn btn-primary">更新</button>
            </div>
      </form>
      <div class="col-sm-11">   
          <button type="button" onclick="reload()" class="btn btn-success">取消更新 </button>
      </div>
    </div>
</body> 
</html>