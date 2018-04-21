<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
  		<title>出貨表</title>
		<%@ include file="header.jsp" %>
	    <script src="public/js/shipping.js"></script>
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	</head>
    
	<body>
  	<%@ include file="nav.jsp" %>
    
    <div class="container">
       <br>
   	   <br>
       <h2>出貨表</h2>
       <br>
	   <div class="container" id="queryShippingTableContainer" style="display:none">
		   <table id="queryShippingTable" class="table table-striped table-bordered"> 
	       <thead>
           		<tr>		
            			<th>細節</th>
	                <th>客戶ID</th>
                    <th>收件人</th>
	                <th>運費方案</th>
	                <th>出貨前通知</th>
	                <th>電話</th>
	                <th>貨號</th>
	                <th>剪標尺碼</th>
                    <th>客要尺碼</th>
                    <th>顏色</th>
	                <th>價格</th>  
	                <th>購物金隨貨出</th>
					<th>出貨日</th>
	                <th>到貨日</th>
                    <th>工作人員</th>
                    <th>狀態</th>
                	    <th>出貨</th> 
            		</tr>
        		</thead>
			</table>
		</div>
		</div>
		<%@ include file="shippingBootbox.jsp" %>
</body>
</html>