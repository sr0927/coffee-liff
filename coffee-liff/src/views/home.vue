<template>
  <div>
    <div class="container ovh">
      <div class="row machineCards">
        <div v-for="(machine, idx) in machines" :key="'idx'" class="col-12">
          <!-- <div class="col-12"> -->
          <div class="show">
            <div class="row">
              <div class="col-6">
                <img class="home_img" src="@/assets/images/coffee_icon.png">
              </div>
              <div class="col-6 align-self">
                <ul>
                  <li><span class="badge bg-primary">機器名稱: </span>{{ machine.machine_name }}</li>
                  <li v-if='machine.machine_state == "0"'>
                    <svg class="stateicon enable" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                      stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
                    </svg>
                    <span class="badge bg-danger">離線中</span>
                  </li>
                  <li v-if='machine.machine_state == "1"'>
                    <svg class="stateicon disable" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                      stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
                    </svg>
                    <span class="badge bg-success">在線中</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <router-link :to="{ name: 'brew' }">
            <button type="button" class="btn btn-primary home-btn">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M13 20h-7c-2.174-3.004-4-6.284-4-12h15c0 5.667-1.88 9.089-4 12zm5.119-10c-.057.701-.141 1.367-.252 2h1.55c-.449 1.29-1.5 2.478-2.299 2.914-.358 1.038-.787 1.981-1.26 2.852 3.274-1.143 5.846-4.509 6.142-7.766h-3.881zm-7.745-3.001c4.737-4.27-.98-4.044.117-6.999-3.783 3.817 1.409 3.902-.117 6.999zm-2.78.001c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099zm9.406 15h-15v2h15v-2z" />
                </svg>
              </div>
              <p>沖煮</p>
            </button>
          </router-link>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-success home-btn" @click='QRcodeScan'>
            <div class="button-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M11 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1zm-2-10h4v4h2v-6h-6v2zm-16 4v-4h4v-2h-6v6h2zm4 16h-4v-4h-2v6h6v-2zm16-4v4h-4v2h6v-6h-2z" />
              </svg>
            </div>
            <p>掃描</p>
          </button>
        </div>
        <div class="col-6">
          <router-link :to="{ name: 'temperature' }">
            <button type="button" class="btn btn-danger home-btn">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M8.5 2c.827 0 1.5.673 1.5 1.5v7.525c0 1.569.514 2.287 1.411 3.05 1.01.858 1.589 2.106 1.589 3.425 0 2.481-2.019 4.5-4.5 4.5s-4.5-2.019-4.5-4.5c0-1.319.579-2.567 1.59-3.425.896-.761 1.41-1.48 1.41-3.05v-7.525c0-.827.673-1.5 1.5-1.5zm0-2c-1.933 0-3.5 1.567-3.5 3.5v7.525c0 .587-.258 1.145-.705 1.525-1.403 1.192-2.295 2.965-2.295 4.95 0 3.59 2.909 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-1.985-.892-3.758-2.295-4.95-.447-.38-.705-.938-.705-1.525v-7.525c0-1.933-1.567-3.5-3.5-3.5zm2.107 14.718c-1.012-.89-1.607-1.734-1.607-3.22v-6.498h-1v6.498c0 1.484-.597 2.332-1.607 3.22-.794.698-1.393 1.642-1.393 2.782 0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-1.14-.599-2.083-1.393-2.782zm11.393-8.718h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
                </svg>
              </div>
              <p>水溫</p>
            </button>
          </router-link>
        </div>
        <div class="col-6">
          <router-link :to="{ name: 'brew' }">
            <button type="button" class="btn btn-store home-btn">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M10 9v-1.098l1.047-4.902h1.905l1.048 4.9v1.098c0 1.067-.933 2.002-2 2.002s-2-.933-2-2zm5 0c0 1.067.934 2 2.001 2s1.999-.833 1.999-1.9v-1.098l-2.996-5.002h-1.943l.939 4.902v1.098zm-10 .068c0 1.067.933 1.932 2 1.932s2-.865 2-1.932v-1.097l.939-4.971h-1.943l-2.996 4.971v1.097zm-4 2.932h22v12h-22v-12zm2 8h18v-6h-18v6zm1-10.932v-1.097l2.887-4.971h-2.014l-4.873 4.971v1.098c0 1.066.933 1.931 2 1.931s2-.865 2-1.932zm15.127-6.068h-2.014l2.887 4.902v1.098c0 1.067.933 2 2 2s2-.865 2-1.932v-1.097l-4.873-4.971zm-.127-3h-14v2h14v-2z" />
                </svg>
              </div>
              <p>獲取膠囊</p>
            </button>
          </router-link>
        </div>
        <div class="col-6">
          <router-link :to="{ name: 'personal' }">
            <button type="button" class="btn btn-person home-btn">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                </svg>
              </div>
              <p>個人管理</p>
            </button>
          </router-link>
        </div>
        <div class="col-6">
          <router-link :to="{ name: 'machine' }">
            <button type="button" class="btn btn-secondary home-btn">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M5.496 1.261l3.77 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.77-3.771c-.172.585-.254 1.189-.254 1.793 0 1.602.603 3.202 1.826 4.426 1.351 1.351 3.164 1.957 4.931 1.821.933-.072 1.852.269 2.514.931l7.621 7.611c.577.578 1.337.915 2.096.915 1.661 0 3.047-1.411 3.012-3.077-.016-.737-.352-1.47-.914-2.033l-7.621-7.612c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.834-4.427-1.834-.603 0-1.207.09-1.791.261zm15.459 18.692c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z" />
                </svg>
              </div>
              <p>機器管理</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import liff from "@line/liff";
import axios from 'axios'
// import { getMaxListeners } from "events";

export default {
  data() {
    return {
      url: import.meta.env.VITE_BACKEND,
      os: "",
      user_id: "",
      machines: []
    };
  },
  async mounted() {
    await liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href });
        const accessToken = liff.getAccessToken()
        liff.getProfile()
          .then((profile) => {
            this.user_id = profile.userId;
            this.getMachine()
          })
          .catch()
      })
      .catch((e) => {
      });
    console.log(this.url + "/api/MachineSelect/" + this.user_id)
  },
  methods: {
    QRcodeScan() {
      if (liff.getOS() == "web") {
        if (liff.scanCodeV2) {
          liff.scanCodeV2()
            .then(result => {
              // result = { value: '' }
              alert(result.value);
            });
        }
      } else {
        if (liff.scanCode) {
          liff.scanCode()
            .then(result => {
              // result = { value: '' }
              alert(result.value);
            });
        }
      }

    },
    getMachine() {
      const api = this.url + "/api/MachineSelect/" + this.user_id;
      axios.get(api, { crossdomain: true }).then(response => {
        this.machines = response.data.machines;
      })
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

.home-btn {
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
}

.ovh {
  overflow: hidden;
}

.stateicon {
  height: 20px;
  border-radius: 50%;
  border: 1px solid #2c3e50;
  margin-right: 5px;
}

.enable {
  fill: rgb(255, 11, 11);
}

.disable {
  fill: rgb(7, 252, 7)
}

.machineCards {
  flex-flow: nowrap;
  overflow-y: auto;
}

.show {
  margin-bottom: 20px;
  padding: 5%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
  -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
  -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
}

.home_img {
  width: 100%;
}

ul {
  list-style: none;
  text-align: left;
}

.align-self {
  align-self: center;
}

.btn {
  text-align: left;
}

svg {
  fill: aliceblue;
  height: 45px;
}

.btn-person,
.btn-person:focus,
.btn-person:active,
.btn-person:disabled {
  background-color: #5e35b1 !important;
  color: #fff !important;
  border-color: #5e35b1 !important;
}

.btn-person:hover {
  background-color: #4c2b8f !important;
  color: #fff !important;
  border-color: #4c2b8f !important;
}

.btn-store,
.btn-store:focus,
.btn-store:active,
.btn-store:disabled {
  background-color: #fb8c00 !important;
  color: #fff !important;
  border-color: #fb8c00 !important;
}

.btn-store:hover {
  background-color: #cb7000 !important;
  color: #fff !important;
  border-color: #cb7000 !important;
}
</style>
