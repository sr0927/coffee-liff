<template>
    <div>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{ enabled: false }"
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
        }"
      />
    </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
    name: "pbtable",
    components: {
        VueGoodTable,
    },
    data() {
        return {
            columns: [
                {
                    label: "日期",
                    field: "date",
                    dateInputFormat: "yyyy-MM-dd",
                    dateOutputFormat: "yyyy-MM-dd",   
                },
                {
                    label: "風味",
                    field: "type",
                }
            ],
            rows: [
                {date: '2024/4/5', type: "奶油風味"}
            ]              
        }      
    }
}
</script>