/**
 *  @eyesc
 */

//$.validator.addMethod("phoneUS", function (phone_number, element) {
//    phone_number = phone_number.replace(/\s+/g, "");
//    return this.optional(element) || phone_number.length > 9 &&
//          phone_number.match(/^\(?[\d\s]{9}-[\d\s]{3}-[\d\s]{4}$/);
//}, "Invalid phone number");

//customerIdEqualPhone
$.validator.addMethod("customerIdEqualPhone", function (customer, element) {
    return this.optional(element) || customer.slice(-5) == $('input#phone').val().slice(-5);
}, "請確認電話末五碼");

//customerIdEndCode
$.validator.addMethod("customerIdEndCode", function (customer, element) {
    return this.optional(element) || customer.slice(-5).match(/\d{5}/);
}, "請輸入電話末五碼");

//shippingMoneyValidation
$.validator.addMethod("numberValidation", function (shipMoney, element) {
    return this.optional(element) || shipMoney.match(/\d+/);
}, "請輸入數字");

//phoneValidation
$.validator.addMethod("phoneValidation", function (phonecode, element) {
    return this.optional(element) || phonecode.match(/^0\d{9}$/);
}, "請確認電話格式(0xxxxxxxxx)");

//addressValidation
$.validator.addMethod("addressValidation", function (address, element) {  
    var re = /(全家便利商店|OK便利商店|萊爾富便利商店|便利商店|7-ELEVEN|統一便利商店|全家|OK|萊爾富|7-11)/;
    return this.optional(element) || !address.match(re);
}, "不可輸入便利商店");
