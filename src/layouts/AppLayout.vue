<template>
  <AtNavbar
    class="xl:px-32 w-full z-0"
    style="z-index: 4"
    :logo="logo"
    :nav-links="navLinks"
    @logout="logout"
    in-container
  />
  <div class="container mx-auto px-4 xl:px-36 pt-6">
    <router-view></router-view>
  </div>
</template>

<script>
  import { defineAsyncComponent, ref } from 'vue';
  import VueCookie from 'vue-cookie';
  import logoGulchitay from '~/assets/img/logoGulchitay.svg';
  import { useRouter } from 'vue-router';
  export default {
    name: 'AppLayout',
    components: {
      AtNavbar: defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtNavbar/AtNavbar')),
    },
    setup() {
      const router = useRouter();
      const logo = ref({
        name: 'Gulchitay',
        path: logoGulchitay,
      });
      function logout() {
        VueCookie.delete('auth');
        router.push({ name: 'auth' });
      }
      const navLinks = ref([
        { title: 'Персональные данные', to: { name: 'personalData' } },
        { title: 'Скоринг карты', to: { name: 'creditsCard' } },
        { title: 'КБ', to: { name: 'creditByuro' } },
      ]);
      return { navLinks, logoGulchitay, logo, logout, router };
    },
  };
</script>
