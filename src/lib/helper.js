export default {
  getTypes: function(instence) {
    // 判断类型
    return Object.prototype.toString.call(instence).slice(8, -1);
  }
};