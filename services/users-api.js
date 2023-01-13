export const getUserAPI = async () => await $fetch("/api/auth");

export const getAllUsersAPI = async (params) =>
  await $fetch("/api/user", {
    method: "GET",
    params: { ...params },
  });

export const addUserAPI = async (body) =>
  await $fetch("/api/user", {
    method: "PUT",
    body,
  });

export const loginUserAPI = async (credentials) =>
  await $fetch("/api/auth", {
    method: "PUT",
    body: credentials,
  });

export const logoutUserAPI = async () =>
  await $fetch("/api/auth", {
    method: "PATCH",
  });

export const deleteUserAPI = async (userId) =>
  await $fetch(`/api/user`, {
    method: "DELETE",
    params: { userId },
  });

export const updateUserAPI = async (body) =>
  await $fetch(`/api/user`, { method: "PATCH", body });
