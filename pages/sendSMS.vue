<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mx-auto">
                <div class="mt-4 card card-body">
                    <h2 class="mb-0">發送簡訊</h2>
                    <!-- 模式選擇 -->
                    <div class="row">
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="mode" id="uploadMode" value="upload"
                                    v-model="mode">
                                <label class="form-check-label" for="uploadMode">
                                    檔案上傳模式
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="mode" id="inputMode" value="input"
                                    v-model="mode">
                                <label class="form-check-label" for="inputMode">
                                    文字輸入模式
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- 檔案上傳模式 -->
                    <div class="row" v-if="mode === 'upload'">
                        <div class="col">
                            <p class="mb-0 text-sm">上傳發送清單 → 查看辨識結果 → 填入欲發送訊息內容 → 確認發送</p>
                            <hr class="my-3 horizontal dark" />
                            <label class="form-label">上傳發送清單</label>
                            <div class="">
                                <input name="file" type="file" @change="onFileChange" class="fallback form-control">
                            </div>
                        </div>
                    </div>
                    <!-- 文字輸入模式 -->
                    <div class="row" v-if="mode === 'input'">
                        <div class="col">
                            <p class="mb-0 text-sm">輸入號碼 → 確認號碼分類結果 → 填入訊息內容 → 確認發送</p>
                            <hr class="my-3 horizontal dark" />
                            <textarea class="form-control" v-model="fileContent"></textarea>
                            <input type="button" @click="processNumbers" class="btn btn-sm btn-primary mt-1" value="分析" />
                        </div>
                    </div>
                    <!-- 電話號碼分析結果 -->
                    <div v-if="processedContent">
                        <hr class="my-3 horizontal dark" />
                        <label for="projectName" class="form-label">號碼分析結果</label>
                        <div class="row">
                            <div class="col" v-for="(numbers, category) in processedContent" :key="category">
                                <div class="card mt-3">
                                    <div class="card-header pb-0">{{ category }}</div>
                                    <div class="card-body">
                                        <div v-for="(number, index) in numbers.slice(0, 3)" :key="index">
                                            {{ number }}
                                        </div>
                                        <div v-if="numbers.length > 3">...</div>
                                        總筆數：{{ numbers.length }} 筆
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-3 horizontal dark" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mx-auto col-12">
                <div class="mt-4 card card-body">
                    <label class="mt-4">簡訊內容</label>
                    <p class="text-xs form-text text-muted ms-1">
                        欲發送的簡訊內容
                    </p>
                    <textarea class="form-control" v-model="SMSContent"></textarea>

                    <div class="mt-4 d-flex justify-content-end">
                        <!-- <button type="button" name="button" class="m-0 btn btn-light" @click="confirmSend">
                            排程發送
                        </button> -->
                        <button type="button" name="button" class="m-0 btn bg-gradient-success ms-2" @click="confirmSend">
                            立即發送
                        </button>
                    </div>

                    <!-- 結果顯示於此 -->
                    <div v-if="apiResponse">
                        <h2>Response:</h2>
                        <p>Code: {{ apiResponse.code }}</p>
                        <p>Message: {{ apiResponse.msg }}</p>
                        <p>Total Fee: {{ apiResponse.total_fee }}</p>
                        <p>UID: {{ apiResponse.uid }}</p>
                        <div v-for="(item, index) in apiResponse.data" :key="index">
                            <p>Fee: {{ item.fee }}</p>
                            <p>Mobile: {{ item.mobile }}</p>
                            <p>SID: {{ item.sid }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
</script>

<script>
import flatPickr from "vue-flatpickr-component";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default {
    components: { QuillEditor, flatPickr },
    data() {
        return {
            mode: 'upload',  // 預設模式為檔案上傳模式
            fileContent: '', // 儲存檔案內容的數據屬性
            processedContent: null, // 分類結果
            SMSContent: "",
            config: {
                allowInput: true,
            },
            apiResponse: null, // API 回應
        };
    },
    mounted() {
        // 取消 choices
        // 取消 drop zone
    },
    methods: {
        // 上傳檔案時調用
        onFileChange(e) {
            console.log("開始處理");
            // 從事件對象中獲取選擇的檔案
            const file = e.target.files[0];
            // 創建一個 FileReader 對象來讀取檔案
            const reader = new FileReader();
            // 當 FileReader 讀取檔案完成時調用的方法
            reader.onload = (e) => {
                // 將檔案的內容儲存到 fileContent 數據屬性中
                this.fileContent = e.target.result;
                // 接著處理上傳內容
                this.processNumbers();
            };
            // 讀取檔案的內容
            reader.readAsText(file);
        },
        // 處理上傳內容
        processNumbers() {
            console.log("進行分析");
            this.processedContent = {};
            // 將檔案內容分割成行
            let lines;
            if (this.mode == "upload")
                lines = this.fileContent.split('\r\n'); // Win系統換行
            else
                lines = this.fileContent.split('\n');
            // 使用 Set 來去除重複的行，然後再轉換回陣列
            const uniqueLines = [...new Set(lines)];
            // 對每一行進行處理
            uniqueLines.forEach(line => {
                // 使用 libphonenumber-js 來解析行中的電話號碼
                const phoneNumber = parsePhoneNumberFromString(line, "PH");
                // 檢查解析出的電話號碼是否有效
                if (phoneNumber && phoneNumber.isValid()) {
                    // 分類
                    const classify = this.getClassifyByNumber(phoneNumber.formatInternational());
                    if (!this.processedContent[classify]) this.processedContent[classify] = [];
                    var formatNumber = phoneNumber.number.slice(1); // 去掉 + 號
                    this.processedContent[classify].push(formatNumber);
                } else {
                    if (!this.processedContent["NONE"]) this.processedContent["NONE"] = [];
                    this.processedContent["NONE"].push('Invalid number')
                }
            });
            console.log("結果：", this.processedContent);
        },
        getClassifyByNumber(input) {
            if (input == null) return 'NONE';
            var tests = input.split(' ');
            var first5 = tests[1];
            switch (first5) {
                case "907":
                case "908":
                case "909":
                case "910":
                case "912":
                case "918":
                case "919":
                case "920":
                case "921":
                case "922":
                case "923":
                case "924":
                case "925":
                case "928":
                case "929":
                case "930":
                case "931":
                case "932":
                case "933":
                case "938":
                case "939":
                case "942":
                case "943":
                case "946":
                case "947":
                case "948":
                case "950":
                case "951":
                case "960":
                case "961":
                case "962":
                case "963":
                case "964":
                case "968":
                case "969":
                case "970":
                case "973":
                case "974":
                case "981":
                case "988":
                case "998":
                case "999":
                    return "SMART";
                case "904":
                case "905":
                case "906":
                case "915":
                case "916":
                case "917":
                case "926":
                case "927":
                case "935":
                case "936":
                case "945":
                case "952":
                case "953":
                case "954":
                case "955":
                case "956":
                case "965":
                case "966":
                case "967":
                case "975":
                case "977":
                case "983":
                case "986":
                case "987":
                case "989":
                case "995":
                case "997":
                    return "GLOBE";
                case "991":
                case "992":
                case "993":
                case "994":
                    return "DITO";
                case "996":
                    return "CHERRY";
                default:
                    return "NONE";
            }
        },
        // 發送 API
        async sendSMS() {
            let numbers = [];
            let smsContent = this.SMSContent;
            if (this.processedContent != null) {
                // 將所有分類的號碼重新塞回陣列
                let keys = Object.keys(this.processedContent);
                for (let key of keys) {
                    console.log(key);
                    if (key == "NONE") continue;
                    let classifiedPhones = this.processedContent[key];
                    for (let phone of classifiedPhones) {
                        numbers.push(phone)
                    }
                }
                // 發送到後端
                let result = await $fetch(`/api/sendSMS`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: { numbers: numbers, smsContent: smsContent }
                });
                // console.log(result);
                this.$swal({
                    icon: "success",
                    title: "發送成功!",
                    text: result,
                });
            } else {
                this.$swal({
                    icon: "error",
                    title: "發送失敗!",
                    text: "缺少內容",
                });
            }
        },
        // 確認彈窗
        confirmSend() {
            this.$swal({
                title: "確認發送?",
                text: "即將扣費",
                showCancelButton: true,
                confirmButtonText: "確認發送",
                cancelButtonText: "取消",
                reverseButtons: true,
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    // 確認送出
                    this.sendSMS();
                } else if (
                    result.dismiss === this.$swal.DismissReason.cancel
                ) {
                    // 取消
                    this.$swal({
                        title: "取消送出!",
                        text: "本次發送取消",
                        icon: "error",
                        customClass: {
                            confirmButton: "btn bg-gradient-success",
                        },
                        buttonsStyling: false,
                    });
                }
            });
        }
    },
};
</script>
