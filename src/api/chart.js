import request from "@/utils/request";

// 获取折线图数据
export function chartData(data) {
  return request({
    url: "reports/type/1",
    method: "get"
  });
}
