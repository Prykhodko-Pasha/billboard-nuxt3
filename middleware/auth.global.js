import isAuthenticated from "../helpers/isAuthenticated";

export default defineNuxtRouteMiddleware((to) => {
  const isAuth = isAuthenticated();
  console.log("Middleware isAuth :>> ", isAuth);

  switch (to.path) {
    case "/profile":
      if (!isAuth) return navigateTo("/login");
      break;
    case "/bill/edit":
      if (!isAuth) return navigateTo("/login");
      break;
    case "/bill/edit/[id]":
      if (!isAuth) return navigateTo("/login");
      break;
    case "/user/edit/[id]":
      if (!isAuth) return navigateTo("/login");
      break;
    case "/login":
      if (isAuth) return navigateTo("/profile");
      break;
    case "/signup":
      if (isAuth) return navigateTo("/profile");
      break;
    default:
      break;
  }
});
