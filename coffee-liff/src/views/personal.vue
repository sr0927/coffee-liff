<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="show">
                    <div class="row">
                        <div class="col-6">
                            <div class="header">
                                <img :src="picurl">
                            </div>
                        </div>
                        <div class="col-6 align-self">
                            <ul>
                                <li><span class="badge bg-success fs-6 ">名稱:{{ name }}</span></li>
                                <li>
                                    <button type="button" class="btn btn_fix btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        <div class="id_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M6 12h10v1h-10v-1zm7.816-3h-7.816v1h9.047c-.45-.283-.863-.618-1.231-1zm5.184 1.975v2.569c0 4.106-6 2.456-6 2.456s1.518 6-2.638 6h-7.362v-20h9.5c.312-.749.763-1.424 1.316-2h-12.816v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.886c-.623.26-1.297.421-2 .475zm-13-3.975h6.5c-.134-.32-.237-.656-.319-1h-6.181v1zm17-2.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
                                            </svg>查看ID
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <vue-good-table :columns="columns" :rows="rows" :search-options="{ enabled: false }"
                    :pagination-options="{
                                    enabled: true,
                                    mode: 'records',
                                    perPage: 15,
                                    position: 'top',
                                    perPageDropdown: [10, 15, 20],
                                    dropdownAlloAll: false,
                                    setCurrentPage: 1,
                                    nextLabel: '下一頁',
                                    prevLabel: '上一頁',
                                    rowsPerPageLabel: '每頁幾筆',
                                    ofLabel: 'of',
                                    pageLabel: '頁',
                                    allLabel: 'All',
                                }" />
            </div>
        </div>
    </div>
    <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ID</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ userid }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn_id btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button @click="copyid" type="button" class="btn_id btn btn-primary"
                        data-bs-dismiss="modal">複製ID</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import liff from "@line/liff";
import axios from 'axios'
import { format } from 'date-fns';
//import Message from 'vue-element-multiple-message'
//Vue.prototype.$message = Message
export default {

    data() {
        return {
            url: import.meta.env.VITE_BACKEND,
            name: "",
            userid: "",
            picurl: "",
            isReload: localStorage.getItem("isReload"),
            columns: [
                {
                    label: "日期",
                    field: "date",
                    type: 'date',
                    dateInputFormat: "EEE, dd MMM yyyy HH:mm:ss \'GMT\'",
                    dateOutputFormat: "yyyy-MM-dd",
                },
                {
                    label: "風味",
                    field: "type",
                },
                {
                    label: "機器",
                    field: "machine",
                }
            ],
            rows: []
        };
    },
    mounted() {
        liff.init({
            liffId: import.meta.env.VITE_LIFF_ID
        })
            .then(() => {
                if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href });
                liff.getProfile()
                    .then((profile) => {
                        this.name = profile.displayName;
                        this.userid = profile.userId;
                        this.picurl = profile.pictureUrl;
                        this.getbrewlog();
                    })
            })
            .catch((e) => {
            });

        if (!this.isReload) {
            this.reloaditem();
        }
    },
    methods: {
        copyid() {
            navigator.clipboard.writeText(this.userid)
                .then(() => {
                })
        },
        reloaditem() {
            localStorage.setItem("isReload", true);
            setTimeout(() => {
                location.reload();
            }, 500);
        },
        getbrewlog() {
            const api = this.url + "/api/BrewLog/" + this.userid;
            axios.get(api).then(response => {
                this.rows = response.data.brew_log;
                console.log(this.rows)
            })
        }
    },
};
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

img {
    width: 100%;
}

ul {
    list-style: none;
    text-align: left;
    padding-left: 10px;
}

li {
    height: 50px;
}

.align-self {
    align-self: center;
}

.header {
    border-radius: 50%;
    overflow: hidden;
}

svg {
    fill: #fff;
    margin-right: 5px;
}

.btn_id {
    padding: 5px 10px !important;
    width: auto;
    height: auto;
}

.btn_fix,
.btn_fix:focus,
.btn_fix:active,
.btn_fix:disabled {
    padding: 0px;
    box-sizing: border-box;
    border-radius: .25rem;
    width: 105px !important;
    height: 40px !important;
    background-color: #0d6efd !important;
    color: #fff !important;
    border-color: #0d6efd !important;
}

.btn_fix:hover {
    border-radius: .25rem;
    background-color: #0b5ed7 !important;
    color: #fff !important;
    border-color: #0b5ed7 !important;
}

/* .id_content {
    height: 37px;
    padding-top: 0px;
    margin-top: -3px;
    text-align: center;
} */
</style>