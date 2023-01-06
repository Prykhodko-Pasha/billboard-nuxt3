<template>
  <div class="h-full flex flex-col">
    <div class="container bg-gray-50">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li v-if="isAuth"><NuxtLink to="/profile">Profile</NuxtLink></li>
        <li v-if="!isAuth"><NuxtLink to="/login">Login</NuxtLink></li>
        <li v-if="!isAuth"><NuxtLink to="/signup">Signup</NuxtLink></li>
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
const isAuth = useState("user");
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
