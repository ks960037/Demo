import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default function () {
    let fileContent = '';
    let processedContent: any = null;
    let mode = "upload";

    function getClassifyByNumber(input: string) {
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
    };

    function processNumbers() {
        processedContent = {};
        // 將檔案內容分割成行
        let lines;
        // 確認資料分行的模式
        if (mode == "upload")
            lines = fileContent.split('\r\n');
        else
            lines = fileContent.split('\n');
        // 使用 Set 來去除重複的行，然後再轉換回陣列
        const uniqueLines = [...new Set(lines)];
        // 對每一行進行處理
        uniqueLines.forEach(line => {
            // 使用 libphonenumber-js 來解析行中的電話號碼
            const phoneNumber = parsePhoneNumberFromString(line, "PH");
            // 檢查解析出的電話號碼是否有效
            if (phoneNumber && phoneNumber.isValid()) {
                // 分類
                const classify = getClassifyByNumber(phoneNumber.formatInternational());
                if (!processedContent[classify]) processedContent[classify] = [];
                var formatNumber = phoneNumber.number.slice(1); // 去掉 + 號
                processedContent[classify].push(formatNumber);
            } else {
                if (!processedContent["NONE"]) processedContent["NONE"] = [];
                processedContent["NONE"].push('Invalid number')
            }
        });
    };

    let checkFileContent = false;
    // 匯出元件所需要使用到的變數
    return {
        fileContent,
        processedContent,
        processNumbers,
        checkFileContent,

    }
}