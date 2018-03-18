<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
	  <title>退貨匯款表</title>
	  <%@ include file="header.jsp" %>
	  <script src="public/js/returns.js"></script>  
	</head>

	<body>
	<%@ include file="nav.jsp" %>
	    <div class="container">
        <br>
        <br>
        <h2>退貨匯款表</h2>
        <br>
        <h5 style="color : brown">  *詢問客戶帳號 : 親愛的 已收到您寄回的商品T~+T~，請問您的匯款資料，要匯$~給您哦~</h5>
        <h5 style="color : brown">  *通知客戶已退款扣除運費 : 已匯款請查收，因退換原訂單正價商品未達免運標準，加計原訂單60元物流費!謝謝您。</h5>
        <h5 style="color : brown">  *通知客戶已退款 : 已匯款，請查收。</h5>
        <br>
        
    <form id="ReturnsForm">
         <div class="form-group control-label col-sm-3">
               <label for="customerId">FB/Line/網站名+電話末五碼(客戶ID):</label>
               <input type="text" class="form-control" id="customerId" name="customerId">
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
            
         <div class="form-group control-label col-sm-2">
            <label for="name">收件人:</label>
            <input type="text" class="form-control" id="name" name="name">
         </div>
            
         <div class="form-group control-label col-sm-2">
             <label for="phone">電話:</label>
                 <input type="text" class="form-control" id="phone" name="phone">    
         </div>
        
         <div class="form-group control-label col-sm-2">
               <label for="customerReturnsDate">客戶通知退貨日:</label>
               <input type="date" class="form-control" id="customerReturnsDate" name="customerReturnsDate" min="2011-04-01" max="2117-04-30">
         </div>
            
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
           <label for="customerReceivingDate">客戶收貨日:</label>
           <input type="date" class="form-control" id="customerReceivingDate" name="customerReceivingDate" min="2011-04-01" max="2117-04-30" >
        </div>
        
            <div class="form-group control-label col-sm-2">
                <label for="nonRefundable">退貨不退款:</label>
                <select class="form-control" id="nonRefundable" name="nonRefundable">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
            </div>
            
            
            <div class="form-group control-label col-sm-2">
               <label for="receivedReturnsDate">收到退貨日:</label>
               <input type="date" class="form-control" id="receivedReturnsDate" name="receivedReturnsDate" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="customerRejected">客戶拒收:</label>
                <select class="form-control" id="customerRejected" name="customerRejected">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
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
                <label for="reasonsForReturns">退貨原因:</label>
                <select class="form-control" id="reasonsForReturns" name="reasonsForReturns">
                    
                    <option value="尺碼">尺碼</option>
                    <option value="瑕疵">瑕疵</option>
                    <option value="其他">其他</option>
               	</select>
            </div>
            
            
            
            <div class="form-group control-label col-sm-2">
                <label for="price">價格</label>
                    <input type="text" class="form-control" id="orderPrice" name="orderPrice">
            </div>
            
           
            
            <div class="form-group control-label col-sm-2">
                <label for="singleOrderRefund">單筆訂單退款:</label>
                    <input type="text" class="form-control" id="singleOrderRefund" name="singleOrderRefund">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="multileOrderRefund">多筆訂單退款:</label>
                    <input type="text" class="form-control" id="multileOrderRefund" name="multileOrderRefund">    
            </div>
            
            <div class="form-group control-label col-sm-3">
                <label for="bankAccount">匯款帳號</label>
                    <input type="text" class="form-control" id="bankAccount" name="bankAccount">
            </div>
            
            <div class="form-group control-label col-sm-3">
               <label for="remittanceDay">匯款日:</label>
               <input type="date" class="form-control" id="remittanceDay" name="remittanceDay" min="2011-04-01" max="2117-04-30" >
           </div>
            
            
            <div class="form-group control-label col-sm-3">
                <label for="customerNoticeRefund">通知客戶已退款:</label>
                <select class="form-control" id="customerNoticeRefund" name="customerNoticeRefund">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
            </div>
            
            <div class="form-group control-label col-sm-4"style="display:none">
                <label for="employee">工作人員:</label>
                    <input type="text" class="form-control" id="employee" name="employee" >    
                </div>
            
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="2" id="hint" name="hint"></textarea>
            </div>
            
            <div class="col-sm-12">   
                <button type="submit" class="btn btn-primary">新增</button>
            </div>
        </form>    
    </div>
    
    <div>
		<br/>
    </div>
    
	<div class="container" id="newStock" style="display:none">
   	 	<table id="newStockTable"> </table>
    	<button id="deleteNewReturns" type="button" onclick="" class="btn btn-warning">刪除新增</button> 
    	<button id="confirmNewReturns" type="button" class="btn btn-primary">確認新增</button> 
	</div>
	
	<div>
		<br/>
    </div>
  
    <div class="container">
      <form class="form-inline"> 
          <label for="queryStockPoNumId" style="margin:5px 5px 5px 5px;">搜尋:</label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="queryReturns" name="queryReturns">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="queryReturns" class="btn btn-success">搜尋退貨紀錄</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container" id="queryReturnsTableContainer" style="display:none">
		<table id="queryReturnsTableContainer" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
	              <th>FB/Line/網站名+電話末五碼(客戶ID)</th>
                  <th>客戶來源</th>
	              <th>收件人</th>
	              <th>電話</th>
	              <th>貨號</th>
                  <th>客戶通知退貨日</th>
	              <th>客戶收貨日</th>
	              <th>退貨不退款</th>
	              <th>收到退貨日</th>
	              <th>客戶拒收</th>
	              <th>退貨原因</th>
	              <th>價格</th>
	              <th>運費方案</th>   
	              <th>單筆訂單退款</th>
                  <th>多筆訂單退款</th>
                  <th>匯款帳號</th>
                  <th>匯款日</th>
                  <th>通知客戶已退款</th>
                  <th>工作人員</th>
                  <th>備註</th>
            	</tr>
        	</thead>
		</table>
	</div>
	
	
	<div id="update" class="container" style="display:none;">
	<div id="updateTitle"></div>
      <form id="updateForm">
           <input type="hidden" class="form-control" id="updateCustomerId" name="customerId">
		  
		   <div class="form-group control-label col-sm-3">
               <label for="customerId">FB/Line/網站名+電話末五碼(客戶ID):</label>
               <input type="text" class="form-control" id="updateCustomerId" name="customerId">
           </div>
        
         <div class="form-group control-label col-sm-2">
               <label  for="customerSource">客戶來源:</label>
               <select class="form-control" id="updateCustomerSource" name="customerSource">
                   <option value="FB">FB</option>
                   <option value="Line">Line</option>
                   <option value="網站">網站</option>
                   <option value="電話">電話</option>   
               </select>
           </div>
            <div class="form-group control-label col-sm-2">
                <label for="name">收件人:</label>
                <input type="text" class="form-control" id="updateName" name="name">
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="phone">電話:</label>
                    <input type="text" class="form-control" id="updatePhone" name="phone">    
            </div>
            
          <div class="form-group control-label col-sm-2">
               <label for="customerReturnsDate">客戶通知退貨日:</label>
               <input type="date" class="form-control" id="updatecustomerReturnsDate" name="customerReturnsDate" min="2011-04-01" max="2117-04-30" >
           </div>
          
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
               <label for="customerReceivingDate">客戶收貨日:</label>
               <input type="date" class="form-control" id="updateCustomerReceivingDate" name="customerReceivingDate" min="2011-04-01" max="2117-04-30" >
           </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="nonRefundable">退貨不退款:</label>
                <select class="form-control" id="updateNonRefundable" name="nonRefundable">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
            </div>
            
            
            <div class="form-group control-label col-sm-2">
               <label for="receivedReturnsDate">收到退貨日:</label>
               <input type="date" class="form-control" id="updateReceivedReturnsDate" name="receivedReturnsDate" min="2011-04-01" max="2117-04-30">
           </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="customerRejected">客戶拒收:</label>
                <select class="form-control" id="updateCustomerRejected" name="customerRejected">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
            </div>
          
          
          <div class="form-group control-label col-sm-3">
                <label for="delivery">運費方案:</label>
                    <select class="form-control" id="updateDelivery" name="delivery">
                    <option value="60">本島運費60</option>
                    <option value="200">外島運費200</option>
                    <option value="0">完全免運</option>
                    <option value="0">三件或滿2000免運</option>
                    <option value="0">來貨問題新單免運</option>
                </select>
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="reasonsForReturns">退貨原因:</label>
                <select class="form-control" id="updateReasonsForReturns" name="reasonsForReturns">
                    <option value="0">N</option>
                    <option value="尺碼">尺碼</option>
                    <option value="瑕疵">瑕疵</option>
                    <option value="其他">其他</option>
               	</select>
            </div>
            
            
            
            <div class="form-group control-label col-sm-2">
                <label for="price">價格</label>
                    <input type="text" class="form-control" id="updatePrice" name="price">
            </div>
            
           
            
            <div class="form-group control-label col-sm-2">
                <label for="singleOrderRefund">單筆訂單退款:</label>
                    <input type="text" class="form-control" id="updateSingleOrderRefund" name="singleOrderRefund">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="multileOrderRefund">多筆訂單退款:</label>
                    <input type="text" class="form-control" id="updateMultileOrderRefund" name="multileOrderRefund">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="bankAccount">匯款帳號</label>
                    <input type="text" class="form-control" id="updateBankAccount" name="bankAccount">
            </div>
            
            <div class="form-group control-label col-sm-2">
               <label for="remittanceDay">匯款日:</label>
               <input type="date" class="form-control" id="updateRemittanceDay" name="remittanceDay" min="2011-04-01" max="2117-04-30">
           </div>
            
            
            <div class="form-group control-label col-sm-2">
                <label for="customerNoticeRefund">通知客戶已退款:</label>
                <select class="form-control" id="updateCustomerNoticeRefund" name="customerNoticeRefund">
                    <option value="0">N</option>
                    <option value="1">Y</option>
               	</select>
            </div>
            
            <div class="form-group control-label col-sm-4" style="display:none">
                <label for="employee">工作人員:</label>
                    <input type="text" class="form-control" id="updatEemployee" name="employee">    
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
          <button type="button" onclick="reload()" class="btn btn-success">取消更新</button>
      </div>
    </div>
</body>
</html>