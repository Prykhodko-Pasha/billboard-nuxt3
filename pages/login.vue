<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Log in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address *</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address *"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password *</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password *"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "@vue/reactivity";
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const credentials = { email: email.value, password: password.value };
    // console.log("credentials :>> ", credentials);
    const user = await $fetch("/api/auth", {
      method: "PUT",
      body: credentials,
    });
    console.log("user :>> ", user);
    if (user) {
      // await setUser(user);
      useState("user").value = user;

      //   setCookies(user.token);

      // Router.push("/profile");
      useRouter().push("/profile");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
