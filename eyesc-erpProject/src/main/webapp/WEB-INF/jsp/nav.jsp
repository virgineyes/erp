<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span> 
            </button>
            <a class="navbar-brand" style = "color : aliceblue">進銷存系統</a>
        </div>
        
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li class="active"><a href="../erp/customer.do">客戶資料表</a></li>
                <li class="active"><a href="../erp/order.do">客戶互動紀錄表</a></li>
                <li class="active"><a href="../erp/material.do">散客物品表</a></li>
                <li class="active"><a href="../erp/stock.do">庫存資料表</a></li>
                <li class="active"><a href="../erp/shipping.do">出貨表</a></li>
                <li class="active"><a href="../erp/returns.do">退貨匯款表</a></li>
                <li class="active"><a href="../erp/salesOrder.do">下單銷單追貨表</a></li>
                <li><a href="#">訂單總覽</a></li>
            </ul>
        </div>
    </div>    
</nav>