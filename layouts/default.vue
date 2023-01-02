<template>
  <div class="container">
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/profile">Profile</NuxtLink></li>
      <li><NuxtLink to="/login">Login</NuxtLink></li>
      <li><NuxtLink to="/signup">Signup</NuxtLink></li>
    </ul>
    <!-- <LanguageSwitch /> -->
    <!-- <AppBar /> -->
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem 2rem;
  height: 100%;
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
