// 手机
let mobileReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

// 邮箱
let emailReg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/;

let FormValidate = (function() {
  function FormValidate() {}
  FormValidate.Form = function() {
    return {
      // 邮箱验证
      validEmail(rule, value, callback) {
        if (value !== "") {
          if (!emailReg.test(value)) {
            callback(new Error("请输入合法邮箱"));
          } else {
            callback();
          }
        }
      },

      // 手机验证
      validMobile(rule, value, callback) {
        if (value !== "") {
          if (!mobileReg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }
    };
  };

  return FormValidate;
})();

exports.FormValidate = FormValidate;
