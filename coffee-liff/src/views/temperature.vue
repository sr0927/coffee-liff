<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 select-nav mb-2">
                    <select class="form-select" aria-label="Default select example" v-model="select_machine">
                        <option v-for="(machine, idx) in machines" v-bind:value="idx" :key="idx">{{
                        machine.machine_name }}
                        </option>
                    </select>
                </div>
                <div class="col-12">
                    <div class="show">
                        <div class="row">
                            <div class="col-6">
                                <h1>設定溫度</h1>
                                <div class="row">
                                    <div class="col-7 text-end">
                                        <h2 class="now_temperature">{{ set_temperature }}</h2>
                                    </div>
                                    <div class="col-5 text-start">
                                        <h2 class="unit fs-1">C</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <h1>現在溫度</h1>
                                <div class="row">
                                    <div class="col-7 text-end">
                                        <h2 class="now_temperature">{{ now_temperature }}</h2>
                                    </div>
                                    <div class="col-5 text-start">
                                        <h2 class="unit fs-1">C</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12">
                            <VueInputNumber type="number" v-model="input_temperature"
                                class="set-input text-center p-1" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <button type="button" class="btn btn-dark h-65" @click="ClickPlus">
                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                                    stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                                        fill-rule="nonzero" />
                                </svg>
                            </button>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-dark h-65" @click="ClickSet(machine_id)">
                                設定
                            </button>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-dark h-65" @click="ClickMinus">
                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                                    stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm4.253 7.75h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"
                                        fill-rule="nonzero" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import liff from "@line/liff";
import axios from 'axios'
import { VueInputNumber } from '@robin-rossow/vue-input-number'

export default {
    data() {
        return {
            url: import.meta.env.VITE_BACKEND,
            now_temperature: 0,
            set_temperature: 0,
            input_temperature: 0,
            machines: [],
            user: "",
            select_machine: 0,
            machine_id: "",
        };
    },
    created() {
        // setInterval(this.GetTemperature(this.machine_id, 1000))
    },
    mounted() {
        liff
            .init({
                liffId: import.meta.env.VITE_LIFF_ID
            })
            .then(() => {
                if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href });
                liff.getProfile().then(response => {
                    this.user = response.userId;
                    this.getmachine(this.user);
                })
            })
            .catch((e) => {
            });

    },
    methods: {
        ClickPlus() {
            this.input_temperature += 1;
        },
        ClickMinus() {
            this.input_temperature -= 1;
        },
        ClickSet(machine) {
            const api = this.url + `/api/Temperature/${machine}`;
            axios.put(api, {
                "temperature": this.input_temperature
            }).then(response => {
                this.set_temperature = this.input_temperature;
            })
        },
        getmachine(id) {
            const api = this.url + `/api/MachineSelect/${id}`;
            axios.get(api).then(response => {
                this.machines = response.data.machines;
                this.SetTemperature();
                this.machines = this.filteredMachines
            })

        },
        SetTemperature() {
            this.set_temperature = this.machines[this.select_machine].temperature;
            this.input_temperature = this.set_temperature;
            this.machine_id = this.machines[this.select_machine].machine_id;
        },
        GetTemperature(machine) {
            const api = this.url + `/api/RealTemperature/${machine}`;
            axios.get(api).then(response => {
                this.now_temperature = response.data.now_temperature;
            })
        }
    },
    watch: {
        machine_id: function () {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.GetTemperature(this.machine_id);
            }, 1000);
        },
        select_machine: function () {
            this.machine_id = this.machines[this.select_machine].machine_id;
            this.SetTemperature();
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.GetTemperature(this.machine_id);
            }, 1000);
        }
    },
    computed: {
        filteredMachines() {
            return this.machines.filter(machine => machine.machine_state === "1");
        }
    }

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');

@font-face {
    font-family: DS-DIGII;
    src: url("../assets/fonts/DS-DIGII.TTF");
}

h1 {
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
}

h2 {
    font-family: 'DS-DIGII';
}

.show {
    margin-bottom: 20px;
    padding: 5%;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
}

.select-nav {
    height: 40px;
}

.now_temperature,
.unit {
    font-size: 5rem !important;
}

.now_temperature {
    color: red;
}

.unit {
    position: relative;
}

.unit::before {
    font-family: "Noto Sans TC", sans-serif;
    position: absolute;
    content: "o";
    font-size: 2rem;
    left: -11px;
    top: -7px;
}

.btn {
    width: 100%;
}

svg {
    height: 50px;
    fill: #fff;
}

.btn-dark {
    text-align: center;
}

.set-input {
    width: 40%;
    font-size: 3rem;
}

.h-65 {
    height: 65px;
}
</style>