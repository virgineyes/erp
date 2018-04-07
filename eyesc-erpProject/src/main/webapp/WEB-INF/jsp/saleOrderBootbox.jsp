<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="form-content" style="display: none;">
	<form id="updateForm">
		<div class="form-group">
			<label for="JOOrderDate">JO下單日:</label> <input type="date"
				class="form-control" id="JOOrderDate" name="JOOrderDate"
				min="2011-04-01" max="2117-04-30">
		</div>
		
		<div class="form-group">
				<label for="noStock">通知沒貨:</label> <select class="form-control"
					id="noStock" name="noStock">
					<option value="0">N</option>
					<option>通知客戶沒貨</option>
				</select>
			</div>
	</form>
</div>
