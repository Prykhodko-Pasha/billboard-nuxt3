<template>
  <LoadSpinner v-if="loading" />
  <div>
    <div class="nav-menu">
      <!-- // Hamburger icon with click method -->
      <i class="fas fa-bars" @click="showMenu()"> </i>
      <div
        class="nav-content"
        :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
      >
        <!-- <div class="h-full flex flex-col">
    <div class="bg-indigo-600">
      <nav class="px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between"> -->
        <!-- Mobile menu button -->
        <!-- <div @click="toggleNav" class="flex md:hidden">
            <button
              type="button"
              class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div> -->

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <!-- // Menu content -->
        <ul class="nav-items">
          <div>
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li v-if="user">
              <NuxtLink to="/profile">Profile</NuxtLink>
            </li>
          </div>
          <div>
            <li v-if="!user" class="button">
              <NuxtLink to="/login">Login</NuxtLink>
            </li>
            <li v-if="!user" class="button">
              <NuxtLink to="/signup">Signup</NuxtLink>
            </li>
            <li v-if="user" @click="handleLogout" class="button">
              <button>Logout</button>
            </li>
          </div>
        </ul>
        <!-- <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="flex-col md:w-full md:justify-between mt-8 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <div class="flex flex-col space-x-10">
            <li class="text-gray-100 hover:text-indigo-400">
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li v-if="user" class="text-gray-100 hover:text-indigo-400">
              <NuxtLink to="/profile">Profile</NuxtLink>
            </li>
          </div>
          <div class="flex flex-col space-x-10">
            <li v-if="!user" class="text-gray-100 hover:text-indigo-400">
              <NuxtLink to="/login">Login</NuxtLink>
            </li>
            <li v-if="!user" class="text-gray-100 hover:text-indigo-400">
              <NuxtLink to="/signup">Signup</NuxtLink>
            </li>
            <li v-if="user" @click="handleLogout">
              <button>Logout</button>
            </li>
          </div>
        </ul> -->
        <!-- </nav> -->
      </div>
      <!-- <div class="h-full flex flex-col"> -->
      <!-- <div class="container bg-gray-50">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/profile">Profile</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/login">Login</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signup">Signup</NuxtLink></li>

        <li v-if="user" @click="handleLogout">
          <button>Logout</button>
        </li>
      </ul>
       <LanguageSwitch /> 
      <AppBar /> 
    </div> -->
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

let showMenu = ref(false);
const toggleNav = () => (showMenu.value = !showMenu.value);
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

.nav-menu {
  background-color: #818cf8;
}
.nav-content {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  align-items: center;
}
.nav-items {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 0 10px;
}
i {
  display: none;
}
/* // Mobile version - hidden hamburger menu */
@media screen and (max-width: 768px) {
  .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 100%;
  }
  .open-menu {
    opacity: 1;
    height: 150px;
  }
  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }
  .nav-content {
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
  }
  .nav-items {
    flex-direction: column;
  }
  i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
  }
}
</style>
