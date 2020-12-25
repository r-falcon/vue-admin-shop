import request from "@/utils/request";

// 获取商品列表数据
export function goodsData(data) {
  return request({
    url: `goods?query=${data.query}&pagesize=${data.pagesize}&pagenum=${data.pagenum}`,
    method: "get"
  });
}

// 根据id删除对应商品数据
export function goodsDelete(data) {
  return request({
    url: `goods/${data}`,
    method: "delete"
  });
}

// 获取商品分类列表
export function goodsCate(data) {
  console.log(data);
  return request({
    url: `categories?type=${data.type}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`,
    method: "get"
  });
}

// 获取分类参数列表
export function cateSort(data) {
  console.log(data);
  return request({
    url: `categories/${data.cateId}/attributes`,
    method: "get",
    params: { sel: data.sel }
  });
}

// 添加商品
export function GoodsAdd(data) {
  console.log(data);
  return request({
    url: "goods",
    method: "post",
    data
  });
}

// 修改商品信息
export function GoodsEdit(data) {
  console.log(data);
  return request({
    url: `goods/${data.goods_id}`,
    method: "put",
    data
  });
}

// 添加分类
export function cateAdd(data) {
  console.log(data);
  return request({
    url: "categories",
    method: "post",
    data
  });
}

// 删除分类
export function cateDelete(data) {
  console.log(data);
  return request({
    url: `categories/${data}`,
    method: "delete"
  });
}

// 编辑分类
export function cateEdit(data) {
  console.log(data);
  return request({
    url: `categories/${data.cat_id}`,
    method: "put",
    data
  });
}

// 获取分类参数列表
export function cateData(data) {
  return request({
    url: "categories",
    method: "get"
  });
}

// 添加动态参数或者静态属性
export function paramsAdd(data) {
  console.log(data);
  return request({
    url: `categories/${data.cateId}/attributes`,
    method: "post",
    data
  });
}

// 修改动态参数或者静态属性
export function paramsEdit(data) {
  console.log(data);
  return request({
    url: `categories/${data.cateId}/attributes/${data.attr_id}`,
    method: "put",
    data
  });
}

// 删除动态参数或者静态属性
export function paramsDelete(data) {
  console.log(data);
  return request({
    url: `categories/${data.cateId}/attributes/${data.attr_id}`,
    method: "delete"
  });
}
