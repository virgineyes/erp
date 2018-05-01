<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
	<head>
  		<title>庫存資料表</title>
		<%@ include file="header.jsp" %>
	    <script src="public/js/stock.js"></script>  
	</head>
    
	<body>
  	<%@ include file="nav.jsp" %>
	<div class="container">
		<br>
		<br>
        <h2>庫存資料表</h2>
        <br>
		<div id="queryMaterialIdTableContainer" style="display:none">
			<table id="queryMaterialIdTableContainer" class="table table-striped table-bordered"> 
		       <thead>
	            	<tr>
		        		<th>ID</th>
	                <th>客戶ID</th>
           		    <th>貨號</th>
	                <th>季節</th>
	                <th>剪標尺碼</th>
	                <th>客要尺碼</th>
	                <th>胸圍B</th>
	                <th>腰圍W</th>
	                <th>臀圍H</th>
	                <th>衣長L</th>
	                <th>標示鞋碼</th>
	                <th>實際鞋碼</th>
	                <th>顏色</th>
                    <th>入庫工作人員</th>
                    <th>備註</th>
	            	</tr>
	        	</thead>
			</table>
		</div>
	</div>
	
<!-- 	
	<div id="update" class="container" style="display:none;">
	<div id="updateTitle"></div>
      <form id="updateForm">
           <input type="hidden" class="form-control" id="updateMaterialId" name="MaterialId">
		  
		   <div class="form-group control-label col-sm-2">
                <label for="materialId">貨號:</label>
                    <input type="text" class="form-control" id="updateMaterialId" name="materialId" disabled>    
            </div>
            
           <div class="form-group control-label col-sm-2">
               <label for="stock">已入庫/尚未入庫:</label>
               <input type="text" class="form-control" id="updateStock" name="stock" disabled>
           </div>
            
           <div class="form-group control-label col-sm-2">
               <label  for="updateSeason">夏/冬/不分季:</label>
               <select class="form-control" id="updateSeason" name="season">
                   <option value="夏">夏</option>
                   <option value="冬">冬</option>
                   <option value="不分季">不分季</option>
               </select>
           </div>   
            
            <div class="form-group control-label col-sm-2">
                <label for="bodyType">身型:</label>
                    <input type="text" class="form-control" id="updateBodyType" name="bodyType">    
            </div> 
            
            <div class="form-group control-label col-sm-2">
                <label for="bust">胸圍B:</label>
                    <input type="text" class="form-control" id="updateBust" name="bust">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="waistCircumference">腰圍W:</label>
                    <input type="text" class="form-control" id="updateWaistCircumference" name="waistCircumference">    
            </div>
            
             <div class="form-group control-label col-sm-2">
                <label for="hip">臀圍H:</label>
                    <input type="text" class="form-control" id="updateHip" name="hip">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="lengthClothing">衣長L:</label>
                    <input type="text" class="form-control" id="updateLengthClothing" name="lengthClothing">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="markingShoeSize">標示鞋碼:</label>
                    <input type="text" class="form-control" id="updateMarkingShoeSize" name="markingShoeSize">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="realShoeSize">實際鞋碼:</label>
                    <input type="text" class="form-control" id="updateRealShoeSize" name="realShoeSize">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="color">顏色:</label>
                    <input type="text" class="form-control" id="updateColor" name="color">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="stockNum">數量:</label>
                    <input type="text" class="form-control" id="updateStockNum" name="stockNum" disabled>    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="outStockNum">出庫數量:</label>
                    <input type="text" class="form-control" id="updateOutStockNum" name="outStockNum">    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="price">價格:</label>
                    <input type="text" class="form-control" id="updatePrice" name="poPrice" disabled>    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="stock25OffPrice">75折:</label>
                    <input type="text" class="form-control" id="updateStock25OffPrice" name="stock25OffPrice" disabled>    
            </div>
            
            <div class="form-group control-label col-sm-2">
                <label for="updateStockPrice">出清價:</label>
                    <input type="text" class="form-control" id="stockPrice" name="stockPrice" disabled>    
            </div>
            
            <div class="form-group control-label col-sm-2" style="display: none">
                <label for="inStockEmployee">入庫工作人員:</label>
                    <input type="text" class="form-control" id="updateInStockEmployee" name="inStockEmployee">    
            </div>
            
            <div class="form-group control-label col-sm-2" style="display: none">
                <label for="outStockEmployee">出庫工作人員:</label>
                    <input type="text" class="form-control" id="updateOutStockEmployee" name="outStockEmployee" >    
            </div>
            
            <div class="form-group control-label col-sm-12">
                <label for="hint">備註:</label>
                    <textarea class="form-control" rows="2" id="updateHint" name="hint"></textarea>
            </div>
                
            <div class="col-sm-1">   
                <button type="submit" class="btn btn-primary">更新庫存</button>
            </div>
      </form>
      <div class="col-sm-11">   
          <button type="button" onclick="reload()" class="btn btn-success">取消更新庫存</button>
      </div>
    </div>
 -->
	</body>
</html>