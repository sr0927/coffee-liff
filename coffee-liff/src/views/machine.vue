<template>
    <div class="container">
        <div class="d-flex flex-row-reverse bd-highlight mb-2">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addmachine"
                data-bs-whatever="@mdo">新增機器</button>
        </div>
        <div class="modal fade" id="addmachine" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增機器</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3 text-start">
                                <label for="recipient-name" class="col-form-label">機器ID:</label>
                                <input type="text" class="form-control" id="recipient-name" v-model.trim="machine_id">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="addmachine">新增</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(machine, idx) in machines" :key="idx">
            <div class="card_machine">
                <div class="row">
                    <div class="col-4 align-self">
                        <img class="card-img" src="@/assets/images/coffee_icon.png" alt="">
                    </div>
                    <div class="col-5 align-self text-start p-0">
                        <h5 class="card-title"><span class="badge bg-primary">機器名稱: </span>
                            <br />{{ machine.machine_name }}
                        </h5>
                        <p class="card-text" v-if='machine.machine_state == "0"'><svg class="stateicon enable"
                                clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
                            </svg>
                            <span class="badge bg-danger">離線中</span>
                        </p>
                        <p class="card-text" v-if='machine.machine_state == "1"'><svg class="stateicon disable"
                                clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.998" cy="11.998" fill-rule="nonzero" r="9.998" />
                            </svg>
                            <span class="badge bg-success">在線中</span>
                        </p>
                    </div>
                    <div class="col-3 align-self h100">
                        <button class="card-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemachine"
                            @click="clickdelete(machine.machine_name, machine.machine_id, idx)">刪除</button>
                        <div class="modal fade" id="deletemachine" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">確認刪除</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        確定刪除[{{ this.machine_name }}]
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">關閉</button>
                                        <button type="button" class="btn btn-danger"
                                            @click="deletemachine(this.delete_id, this.user_id, this.index)"
                                            data-bs-dismiss="modal">刪除</button>
                                    </div>
                                </div>
                            </div>
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

export default {
    data() {
        return {
            url: import.meta.env.VITE_BACKEND,
            user_id: "",
            machine_id: "",
            machine_name: "",
            delete_id: "",
            index: 0,
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
                        this.getmachine(profile.userId);
                    })
                    .catch()
            })
            .catch((e) => {
            });
    },
    methods: {
        getmachine(id) {
            const api = this.url + `/api/MachineSelect/${id}`;
            axios.get(api).then(response => {
                this.machines = response.data.machines;
            })
        },
        deletemachine(id, user, index) {
            const api = this.url + `/api/MachineUser/${id}`;
            axios.delete(api, { data: { "machineuser": user } }).then(response => {
                this.machines.splice(index, 1)
            }).catch((err) => {
                console.log(err)
            })
        },
        clickdelete(name, id, idx) {
            this.machine_name = name;
            this.delete_id = id;
            this.index = idx;
        },
        addmachine() {
            const api = this.url + `/api/MachineUser`;
            const listapi = this.url + `/api/SelectMchine/${this.machine_id}`;
            let data = "";
            axios.post(api, {
                "machine_id": this.machine_id,
                "user_id": this.user_id
            }).then(response => {
                if (response.data.msg == "新增成功") {
                    axios.get(listapi).then(response => {
                        data = response.data.machine;
                        this.machines.push(data);
                    })
                }
            })

        }
    }
};
</script>

<style>
.card_machine {
    height: 150px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.72);
    overflow: hidden;
    box-sizing: border-box;
}

.card-img {
    width: 100%;
}

.align-self {
    align-self: center;
}

.h100 {
    height: 100%;
}

.card-btn {
    width: 100%;
    height: 150px;
    border-radius: 0%;
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
</style>