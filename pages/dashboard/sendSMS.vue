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
                <input
                  class="form-check-input"
                  type="radio"
                  name="mode"
                  id="uploadMode"
                  value="upload"
                  v-model="mode"
                />
                <label class="form-check-label" for="uploadMode"> 檔案上傳模式 </label>
              </div>
            </div>
            <div class="col">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="mode"
                  id="inputMode"
                  value="input"
                  v-model="mode"
                />
                <label class="form-check-label" for="inputMode"> 文字輸入模式 </label>
              </div>
            </div>
          </div>
          <!-- 檔案上傳模式 -->
          <div class="row" v-if="mode === 'upload'">
            <div class="col">
              <p class="mb-0 text-sm">
                上傳發送清單 → 查看辨識結果 → 填入欲發送訊息內容 → 確認發送
              </p>
              <hr class="my-3 horizontal dark" />
              <label class="form-label">上傳發送清單</label>
              <div class="">
                <input
                  name="file"
                  type="file"
                  @change="onFileChange"
                  class="fallback form-control"
                  ref="fileInput"
                />
              </div>
            </div>
          </div>
          <!-- 文字輸入模式 -->
          <div class="row" v-if="mode === 'input'">
            <div class="col">
              <p class="mb-0 text-sm">
                輸入號碼 → 確認號碼分類結果 → 填入訊息內容 → 確認發送
              </p>
              <hr class="my-3 horizontal dark" />
              <textarea class="form-control" v-model="fileContent"></textarea>
              <input
                type="button"
                @click="processNumbers"
                class="btn btn-sm btn-primary mt-1"
                value="分析"
              />
            </div>
          </div>
          <!-- 電話號碼分析結果 -->
          <div v-if="processedContent">
            <hr class="my-3 horizontal dark" />
            <label for="projectName" class="form-label">號碼分析結果</label>
            <div class="row">
              <div
                class="col"
                v-for="(numbers, category) in processedContent"
                :key="category"
              >
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
          <p class="text-xs form-text text-muted ms-1">欲發送的簡訊內容</p>
          <textarea class="form-control" v-model="SMSContent"></textarea>
          <p class="text-xs form-text text-end my-0">
            目前字數 {{ textCount }}字(包含簽名) 每 160 字為一則簡訊，當前預計發送<span
              class="lead"
              style="color: red"
              >{{ SMSCount }}</span
            >則訊息。
          </p>
          <p class="text-xs form-text text-end my-0">
            若文字內有中文，則 67 字計一則簡訊。
          </p>

          <!-- 送出方式選擇 -->
          <div class="row">
            <div class="col">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sendMode"
                  id="iMode"
                  value="immediate"
                  v-model="sendMode"
                />
                <label class="form-check-label" for="iMode"> 立即送出 </label>
              </div>
            </div>
            <div class="col">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sendMode"
                  id="lMode"
                  value="schedule"
                  v-model="sendMode"
                />
                <label class="form-check-label" for="lMode"> 預約發送 </label>
              </div>
            </div>
          </div>
          <!-- 發送按鈕 -->
          <div class="d-flex justify-content-end">
            <div v-if="sendMode == 'schedule'" class="d-flex w-100">
              <argon-input
                class="mb-0"
                type="date"
                placeholder="Date"
                v-model="sendDate"
              />
              <argon-input
                class="mb-0"
                type="time"
                placeholder="Time"
                v-model="sendTime"
              />
              <button
                type="button"
                name="button"
                class="m-0 btn bg-gradient-info w-100"
                @click="confirmSend"
              >
                預約發送
              </button>
            </div>
            <button
              v-if="sendMode == 'immediate'"
              type="button"
              name="button"
              class="m-0 btn bg-gradient-success w-100 ms-2"
              @click="confirmSend"
            >
              立即發送
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

let today = new Date();
let todayDate =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  today.getDate().toString().padStart(2, "0");
let now =
  today.getHours().toString().padStart(2, "0") +
  ":" +
  today.getMinutes().toString().padStart(2, "0");

const mode = ref("upload"); // 預設模式為檔案上傳模式
const fileContent = ref(""); // 儲存檔案內容的數據屬性
const processedContent = ref(null); // 分類結果
const SMSContent = ref(""); // 簡訊內容
const sendMode = ref("immediate"); // 發送模式
const sendDate = ref(todayDate);
const sendTime = ref(now);
const fileInput = ref();
function resetInput() {
  fileContent.value = "";
  processedContent.value = null;
  SMSContent.value = "";
  fileInput.value.value = null;
}

const { textCounter } = useTextCounter();
// 字數
const textCount = computed(() => SMSContent.value.length + 5);
// 簡訊數
const SMSCount = computed(() => {
  const result = textCounter(SMSContent.value);
  // console.log(result);
  if (result.other) return Math.ceil((SMSContent.value.length + 5) / 67);
  else return Math.ceil((SMSContent.value.length + 5) / 160);
});

definePageMeta({
  layout: "default",
  middleware: "auth",
});
// 上傳檔案時調用
function onFileChange(e) {
  console.log("開始處理");
  // 從事件對象中獲取選擇的檔案
  const file = e.target.files[0];
  // 創建一個 FileReader 對象來讀取檔案
  const reader = new FileReader();
  // 當 FileReader 讀取檔案完成時調用的方法
  reader.onload = (e) => {
    // 將檔案的內容儲存到 fileContent 數據屬性中
    fileContent.value = e.target.result;
    // 接著處理上傳內容
    processNumbers();
  };
  // 讀取檔案的內容
  reader.readAsText(file);
}
// 處理上傳內容
const processNumbers = () => {
  console.log("進行分析");
  processedContent.value = {};
  // 將檔案內容分割成行
  let lines;
  if (mode.value == "upload") lines = fileContent.value.split("\r\n");
  // Win系統換行
  else lines = fileContent.value.split("\n");
  // 使用 Set 來去除重複的行，然後再轉換回陣列
  const uniqueLines = [...new Set(lines)];
  // 對每一行進行處理
  uniqueLines.forEach((line) => {
    // 使用 libphonenumber-js 來解析行中的電話號碼
    const phoneNumber = parsePhoneNumberFromString(line, "PH");
    // 檢查解析出的電話號碼是否有效
    if (phoneNumber && phoneNumber.isValid()) {
      // 分類
      const classify = getClassifyByNumber(phoneNumber.formatInternational());
      if (!processedContent.value[classify]) processedContent.value[classify] = [];
      var formatNumber = phoneNumber.number.slice(1); // 去掉 + 號
      processedContent.value[classify].push(formatNumber);
    } else {
      if (!processedContent.value["NONE"]) processedContent.value["NONE"] = [];
      processedContent.value["NONE"].push("Invalid number");
    }
  });
  console.log("結果：", processedContent.value);
};
function getClassifyByNumber(input) {
  if (input == null) return "NONE";
  var tests = input.split(" ");
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
}
// 發送 API
async function sendSMS() {
  /** 欲發送的號碼 */
  let numbers = [];
  if (processedContent.value != null) {
    // 將所有分類的號碼重新塞回陣列
    let keys = Object.keys(processedContent.value);
    for (let key of keys) {
      console.log(key);
      if (key == "NONE") continue;
      let classifiedPhones = processedContent.value[key];
      for (let phone of classifiedPhones) {
        numbers.push(phone);
      }
    }
  }
  /** 欲發送的內容 */
  let smsContent = SMSContent.value;

  if (smsContent.length == 0) {
    sendLog("sendSMS", `發送失敗，理由:缺少內容`);
    return Swal.fire({
      icon: "error",
      title: "發送失敗!",
      text: "缺少內容",
    });
  }
  if (numbers.length == 0) {
    sendLog("sendSMS", `發送失敗，理由:沒有可發送的號碼`);
    return Swal.fire({
      icon: "error",
      title: "發送失敗!",
      text: "沒有可發送的號碼",
    });
  }

  let sendtime = null;
  // 預約發送要添加時間資料
  if (sendMode.value == "schedule") {
    let scheduleTime = new Date(sendDate.value + " " + sendTime.value + ":00");
    sendtime =
      "" +
      scheduleTime.getFullYear() +
      (scheduleTime.getMonth() + 1).toString().padStart(2, "0") +
      scheduleTime.getDate().toString().padStart(2, "0") +
      scheduleTime.getHours().toString().padStart(2, "0") +
      scheduleTime.getMinutes().toString().padStart(2, "0") +
      scheduleTime.getSeconds().toString().padStart(2, "0");
  }
  const user = useAuthUser();
  const userId = user.value.id;
  // 發送到後端
  sendLog("sendSMS", `送出 API`);
  let result = await useFetchWithToken(`/api/sendSMS`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      numbers: numbers,
      smsContent: smsContent,
      sendtime: sendtime,
      userId: userId,
    },
  });
  // 結果:餘額不足
  if (result == "餘額不足") {
    sendLog("sendSMS", `發送結果: 餘額不足`);
    return Swal.fire({
      icon: "error",
      title: "餘額不足!",
      text: result,
    });
  }

  // 刷新點數記錄
  const credit = useCredits();
  credit.value = await useFetchWithToken("/api/credit", {
    method: "GET",
  });
  resetInput();

  console.log(result);
  sendLog("sendSMS", `發送結果: 成功。 回傳: ${result}`);
  Swal.fire({
    icon: "success",
    title: "發送成功!",
    text: result,
  });
}
const { sendLog } = useCloudwatchLogger();
// 確認彈窗
function confirmSend() {
  sendLog("sendSMS", `按下 發送`);
  Swal.fire({
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
    console.log("輸入", result);
    if (result.isConfirmed) {
      sendLog("sendSMS", `確認 發送`);
      sendSMS();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      sendLog("sendSMS", `取消 發送`);
      // 取消
      Swal.fire({
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
</script>
