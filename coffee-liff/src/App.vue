<template>
  <router-view />
</template>

<script>
import liff from "@line/liff";

export default {
  data() {
    return {
    };
  },
  mounted() {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        //if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href });
      })
      .catch((e) => {
      });
  },
  methods: {
    QRcodeScan(){
      this.os = liff.getOS();
      if (liff.scanCodeV2) {
        liff.scanCodeV2().then(result => {r
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
