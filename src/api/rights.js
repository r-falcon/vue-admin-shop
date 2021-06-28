import request from "@/utils/request";

// 获取角色列表
export function roleShow() {
  return request({
    url: "roles",
    method: "get",
  });
}

// 获取权限列表
export function rightsData() {
  return request({
    url: "rights/list",
    method: "get",
  });
}

// 添加角色
export function roleAdd(data) {
  return request({
    url: "roles",
    method: "post",
    data,
  });
}

// 修改角色
export function roleEdit(data) {
  console.log(data);
  return request({
    url: `roles/${data.id}`,
    method: "put",
    data,
  });
}

// 删除角色
export function roleDelete(data) {
  return request({
    url: `roles/${data}`,
    method: "delete",
  });
}

// 分配权限
export function rightsAttr(data) {
  console.log(data);
  return request({
    url: `roles/${data.roleId}/rights`,
    method: "post",
    data: { rids: data.rids },
  });
}

// 删除角色指定的权限
export function rightsDelete(data) {
  console.log(data);
  return request({
    url: `roles/${data.role.id}/rights/${data.rightId}`,
    method: "delete",
  });
}
