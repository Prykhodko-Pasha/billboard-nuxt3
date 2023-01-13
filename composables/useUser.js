import isAuthenticated from "~~/helpers/isAuthenticated";
import { getUserAPI } from "~~/services/users-api";

export default function useUser() {
  const user = useState("user", () => null);

  const setUser = (userData) => {
    user.value = userData;
    console.log("useUser user.value :>> ", user.value);
  };

  const authUser = async () => {
    const isAuth = isAuthenticated();
    console.log("authUser :>> ");
    //   console.log("user :>> ", user.value);
    if (!isAuth) {
      try {
        console.log("onBeforeMount 2:>> ");
        // try to get user data by refresh token
        const loggedUser = await getUserAPI();
        console.log("loggedUser :>> ", loggedUser);
        if (loggedUser) {
          setUser(loggedUser);
          console.log("user 2:>> ", user.value);

          switch (useRoute().path) {
            case "/login":
              return navigateTo("/profile");
            case "/signup":
              return navigateTo("/profile");
            default:
              break;
          }
        }
      } catch (error) {
        // if token is absent or expired, navigate to login page
        console.log(error);
        switch (useRoute().path) {
          case "/profile":
            return navigateTo("/login");
          case "/bill/edit":
            return navigateTo("/login");
          case "/bill/edit/[id]":
            return navigateTo("/login");
          case "/user/edit/[id]":
            return navigateTo("/login");
          default:
            break;
        }
      }
    }
  };

  return { user, setUser, authUser };
}
