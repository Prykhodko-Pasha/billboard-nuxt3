<template>
  <LoadSpinner v-if="loading" />
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
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { logoutUserAPI } from "~~/services/users-api";

const { user, authUser } = useUser();
const { loading, setLoading } = useLoading();
console.log("user :>> ", user);

// try to auth user if page reloaded
onBeforeMount(() => {
  authUser();
});

onMounted(async () => {
  setLoading(false);
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
