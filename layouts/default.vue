<template>
  <div class="h-full flex flex-col">
    <div class="container bg-gray-50">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/profile">Profile</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/login">Login</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signup">Signup</NuxtLink></li>

        <li v-if="user" @click="handleLogout">
          <button>Logout</button>
        </li>
      </ul>
      <!-- <LanguageSwitch /> -->
      <!-- <AppBar /> -->
    </div>
    <div class="container grow">
      <main class="main">
        <!-- <p v-if="$fetchState.pending">Loading....</p>
        <p v-else-if="$fetchState.error">Error((</p> -->
        <!-- <div v-else> -->
        <NuxtLoadingIndicator />
        <slot />
        <!-- </div> -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { logoutUserAPI, getUserAPI } from "~~/services/users-api";
import isAuthenticated from "~~/helpers/isAuthenticated";

const isAuth = isAuthenticated();
const { user, setUser } = useUser();
console.log("user :>> ", user);

// get user data if page reloaded
onBeforeMount(async () => {
  console.log("onBeforeMount :>> ");
  console.log("user :>> ", user.value);
  if (!isAuth) {
    try {
      console.log("onBeforeMount 2:>> ");
      const loggedUser = await getUserAPI();
      console.log("loggedUser :>> ", loggedUser);

      setUser(loggedUser);
      console.log("user 2:>> ", user.value);

      useRouter().push("/profile");
    } catch (error) {
      console.error(error);
    }
  }
});

const handleLogout = async () => {
  try {
    await logoutUserAPI();
    useState("user").value = null;
    useRouter().push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.container {
  padding: 1rem 2rem;
  /* height: 100%; */
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
