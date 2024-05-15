<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 select-nav mb-4">
                    <select class="form-select" aria-label="Default select example" v-model="select_machine">
                        <option v-for="(machine, idx) in machines" v-bind:value="idx" :key="idx">{{
                        machine.machine_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <img class="" src="@/assets/images/coffee_icon.png">
                </div>
            </div>
            <div class="row justify-content-center mt-5 mb-4">
                <div class="col-6 align-self-center" @click="brewhandler">
                    <button type="button" class="btn btn-dark brew-btn">
                        <svg class="c-svg mb-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M13 24h-7c-2.564-3.483-5-9.782-5-16h17c0 6.167-2.5 12.625-5 16zm6.088-14c-.051.688-.115 1.356-.192 2h1.707c-.321 1.635-1.463 3.331-2.756 4.677-.358 1.283-.772 2.439-1.153 3.229 3.153-1.453 5.987-6.389 6.306-9.906h-3.912zm-8.49-3.001c1.52-.352 2.555-1.276 2.466-2.399-.117-1.485-3.134-2.718-2.32-4.6-4.735 3.817 1.764 3.902-.146 6.999zm-3.207.001c1.523-.29 1.832-1.067 1.832-1.533 0-1.045-2.279-2.002-1.528-3.795-3.648 3.094.995 3.088-.304 5.328z" />
                        </svg>
                        <br />沖煮</button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <div class="input-group input-group-lg">
                        <span class="input-group-text" id="inputGroup-sizing-lg">風味</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-lg" v-model="capsule_type">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="show">
                        <label for="customRange3" class="form-label">水量: {{ waterrange[water - 1] }}</label>
                        <input type="range" class="form-range" min="1" max="5" step="1" id="customRange3"
                            v-model="this.water">
                    </div>
                </div>
                <div class="col-12">
                    <div class="show">
                        <label for="customRange4" class="form-label">水溫: {{ temperature }}</label>
                        <br />
                        <input type="range" class="form-range" min="60" max="90" step="1" id="customRange3"
                            v-model="this.temperature">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import liff from "@line/liff";
import axios from 'axios';

export default {
    data() {
        return {
            url: import.meta.env.VITE_BACKEND,
            capsule_type: "個人獨特風味",
            machines: [],
            user: "",
            select_machine: 0,
            machine_id: "",
            water: 3,
            temperature: 70,
            waterrange: [
                "細杯",
                "小杯",
                "中杯",
                "大杯",
                "特大杯"
            ],
            rangevolume: {
                "細杯": 60,
                "小杯": 160,
                "中杯": 270,
                "大杯": 360,
                "特大杯": 470
            },
            air: 2,
            mqttOptions: {
                clientID: 'clitent-6666',
                username: "",
                password: "",
                keepAlive: 60
            }
        }
    },
    created() {
        const q_capsule_type = this.$route.query.capsule_type
        const q_water = this.$route.query.water
        const q_temperature = this.$route.query.temperature
        if (q_capsule_type != undefined && q_capsule_type !== null) {
            this.capsule_type = q_capsule_type
        }
        if (q_water != undefined && q_water !== null) {
            this.water = q_water
        }
        if (q_temperature != undefined && q_temperature !== null) {
            this.temperature = q_temperature
        }

    },
    destroyed() {
        //this.$mqtt.end();
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
        getmachine(id) {
            const api = this.url + `/api/MachineSelect/${id}`;
            axios.get(api).then(response => {
                this.machines = response.data.machines;
                this.machines = this.filteredMachines
            })

        },
        brewhandler() {
            const api = this.url + "/api/BrewLog"
            const d = new Date()
            const timestamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
            const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const type = this.capsule_type;
            const user_id = this.user;
            const machine_id = this.machines[this.select_machine].machine_id;
            const water_volume = this.rangevolume[this.waterrange[this.water - 1]];
            const water_temperature = this.temperature;
            const air_pressure = this.air;

            axios.post(api, {
                "brew_timestamp": timestamp,
                "brew_date": date,
                "capsule_type": type,
                "user_id": user_id,
                "machine_id": machine_id,
                "Water_volume": water_volume,
                "temperature": water_temperature,
                "air_pressure": air_pressure
            }).then(response => {
                console.log(response);
                alert("開始沖煮")
            })

        },
    },
    computed: {
        filteredMachines() {
            return this.machines.filter(machine => machine.machine_state === "1");
        }
    }
}

</script>

<style>
.show {
    margin-bottom: 20px;
    padding: 5%;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
}

.align-self {
    align-self: center;
}

.brew-btn {
    width: 100%;
    height: 120px;
    font-weight: bold;
    font-size: 20px;
}

.c-svg {
    fill: aliceblue;
    width: 30%;
    height: auto;
}

.w-90 {
    width: 90%;
}
</style>
