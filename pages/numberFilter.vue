<template>
    <div class="container">
        <!-- 電話號碼分析工具的標題 -->
        <div class="row">
            <div class="col">
                <h1>電話號碼分析工具</h1>
            </div>
        </div>
        <!-- 切換模式的 radio button -->
        <div class="row">
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="mode" id="uploadMode" value="upload" v-model="mode">
                    <label class="form-check-label" for="uploadMode">
                        檔案上傳模式
                    </label>
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="mode" id="inputMode" value="input" v-model="mode">
                    <label class="form-check-label" for="inputMode">
                        文字輸入模式
                    </label>
                </div>
            </div>
        </div>
        <div class="row" v-if="mode === 'upload'">
            <div class="col">
                <!-- 選取檔案上傳的輸入框，當檔案改變時調用 onFileChange 方法 -->
                <input type="file" @change="onFileChange" class="form-control">
            </div>
        </div>
        <div class="row" v-if="mode === 'input'">
            <div class="col">
                <!-- 文字輸入模式 -->
                <textarea class="form-control" v-model="fileContent"></textarea>
            </div>
        </div>
        <!-- 確認按鈕，當點擊時處理資料 -->
        <div class="row">
            <div class="col">
                <button :disabled="!checkFileContent" @click="processNumbers" class="btn btn-primary mt-3 mx-3">確認</button>
                <button :disabled="!checkContentProcessed" @click="downloadCSV" class="btn btn-primary mt-3 mx-3">下載
                    CSV</button>
            </div>
        </div>
        <!-- 輸出內容 -->
        <div class="row">
            <div class="col" v-for="(numbers, category) in processedContent" :key="category">
                <div class="card mt-3">
                    <div class="card-header">{{ category }}</div>
                    <div class="card-body">
                        <div v-for="(number, index) in numbers" :key="index">{{ index + "." + number }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css");
</style>

<script>
import { parsePhoneNumberFromString } from 'libphonenumber-js'

definePageMeta({
    layout: false,
});
export default {
    data() {
        return {
            mode: 'upload',  // 預設模式為檔案上傳模式
            fileContent: '', // 儲存檔案內容的數據屬性
            processedContent: null
        };
    },
    computed: {
        // 計算屬性，判斷 fileContent 是否超過 1 個字元
        checkFileContent() {
            return this.fileContent.length > 1;
        },
        // 判斷檔案處理好了沒
        checkContentProcessed() {
            return this.processedContent != null;
        }
    },
    methods: {
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
        // 當檔案改變時調用的方法
        onFileChange(e) {
            // 從事件對象中獲取選擇的檔案
            const file = e.target.files[0];
            // 創建一個 FileReader 對象來讀取檔案
            const reader = new FileReader();
            // 當 FileReader 讀取檔案完成時調用的方法
            reader.onload = (e) => {
                // 將檔案的內容儲存到 fileContent 數據屬性中
                this.fileContent = e.target.result;
            };
            // 讀取檔案的內容
            reader.readAsText(file);
        },
        /**
         * 對數字進行處理
         * @return {void}
         */
        async processNumbers() {
            this.processedContent = {};
            // 將檔案內容分割成行
            let lines;
            if (this.mode == "upload")
                lines = this.fileContent.split('\r\n');
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
            // 將篩號結果儲存進資料庫中
            let save = await useFetch(`/api/insertManyNumbers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: this.processedContent
            });
            console.log(save);
        },
        // 報表導出功能
        downloadCSV() {
            // 將處理後的內容轉換為 CSV 格式
            let csvContent;
            for (let category in this.processedContent) {
                csvContent = '';
                for (let number of this.processedContent[category]) {
                    csvContent += `${number}\n`;
                }
                // 創建一個 Blob 對象來儲存 CSV 內容
                const blob = new Blob([csvContent], { type: 'text/txt;charset=utf-8;' });
                // 創建一個可以下載的 URL
                const url = URL.createObjectURL(blob);
                // 創建一個隱藏的下載鏈接
                const link = document.createElement('a');
                link.href = url;
                link.download = `${category}.txt`;
                link.style.display = 'none';
                document.body.appendChild(link);
                // 觸發下載
                link.click();
                // 移除下載鏈接
                document.body.removeChild(link);
            }
        }
    }
};
</script>
