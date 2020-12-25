import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

// 获取用户列表
export function userData(data) {
  console.log(data);
  return request({
    url:
      "/users?query=" +
      data.query +
      "&pagesize=" +
      data.pagesize +
      "&pagenum=" +
      data.pagenum,
    method: "get"
  });
}

// 添加用户
export function userAdd(data) {
  console.log(data);
  return request({
    url: "/users",
    method: "post",
    data
  });
}

// 修改用户状态
export function userState(data) {
  console.log(data);
  return request({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: "put"
  });
}

// 根据id查询用户信息
export function userGetById(data) {
  return request({
    url: `users/${data}`,
    method: "get"
  });
}

// 修改用户信息
export function userEdit(data) {
  console.log(data);
  return request({
    url: `users/${data.id}`,
    method: "put",
    data
  });
}

// 删除用户信息
export function userDelete(data) {
  console.log(data);
  return request({
    url: `users/${data}`,
    method: "delete"
  });
}

// 获取所有角色列表
export function roleData(data) {
  return request({
    url: "roles",
    method: "get"
  });
}

// 分配用户角色
export function roleSet(data, selectedId) {
  return request({
    url: `users/${data.id}/role`,
    method: "put",
    data: {
      rid: selectedId
    }
  });
}
