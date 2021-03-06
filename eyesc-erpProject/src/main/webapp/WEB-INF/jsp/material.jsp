<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
  		<title>散客物品表</title>
		<%@ include file="header.jsp" %>
	    <script src="public/js/material.js"></script>  
	</head>
    
	<body>
    <%@ include file="nav.jsp" %>

    <div class="container">
    	<br>
    	<br>
        <h2>散客物品表</h2>
        <br>
        <form id="materialForm">
            <div class="form-group control-label col-sm-4">
                <label for="materialId">貨號:</label>
                    <input type="text" class="form-control" id="materialId" name = "materialId">
            </div>
            <div class="form-group control-label col-sm-4">
                <label for="clothes">衣服名稱:</label>
                    <input type="text" class="form-control" id="cloth" name = "cloth">
            </div>
            
            <div class="form-group control-label col-sm-4">
                <label for="price">價格</label>
                    <input type="text" class="form-control" id="price" name="price">
            </div>
            
            <div class="col-sm-12">   
                <button type="submit" class="btn btn-primary">新增貨號</button>
            </div>
        </form>
    </div>
    <br/>
	<div class="container" id="newMaterial" style="display:none">
   	 	<table id="newMaterialTable"> </table>
    	<button id="deleteNewMaterial" type="button" onclick="" class="btn btn-warning">刪除新增貨號</button> 
    	<button id="confirmNewMaterial" type="button" class="btn btn-primary">確認新增貨號</button> 
	</div>
	<br/>
	
    <div class="container">
      <form class="form-inline"> 
          <label for="queryMaterail" style="margin:5px 5px 5px 5px;"></label>
          <input type="text" style="margin:5px 5px 5px 5px;" class="form-control" id="queryMaterialId" name="queryMaterail">    
          <button type="button" style="margin:5px 5px 5px 5px;" id="queryMaterial" class="btn btn-success">搜尋貨號</button>
      </form>
    </div>
    
    <div>
		<br/>
    </div>

	 <div class="container" id="queryMaterialTableContainer" style="display:none">
		<table id="queryMaterialTable" class="table table-striped table-bordered"> 
	       <thead>
            	<tr>
		      <th>貨號</th>
              <th>衣服名稱</th>
              <th>價格</th>
              <th>更新價格</th>
              <th>更新日期</th>
               <th>更新</th>	
            	</tr>
        	</thead>
		</table>
	</div>
	
    <%@ include file="materialBootbox.jsp" %>
</body>
</html>