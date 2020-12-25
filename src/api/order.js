import request from "@/utils/request";

// 获取订单列表数据
export function ordersData(data) {
  return request({
    url: `orders?query=${data.query}&pagesize=${data.pagesize}&pagenum=${data.pagenum}`,
    method: "get"
  });
}

// 查看订单详情
export function ordersDetail(data) {
  console.log(data);
  return request({
    url: `orders/${data}`,
    method: "get"
  });
}
