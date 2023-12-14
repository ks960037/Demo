import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NumberSchema = new Schema({
    // 資料查詢主鍵
    _id: mongoose.Schema.Types.ObjectId,
    // 號碼
    phone_number: {
        type: String,
        validate: {
            validator: (value: String) => {
                console.log(value);
                if (value.length >= 10) {
                    return true;
                }
                else return false;
            },
            message: (props: any) => `${props.value}資料不符合規範`
        }
    },
    // 屬於哪個運營商
    tag: {
        type: String,
        require: true,
    },
    // 第一版不需要
    users: {
        type: Array<String>,
    },
    // 輸入日期
    update_at: Date,
    // 導出日期
    exported_at: Date
});

const PHNumber = mongoose.model("63_philippine", NumberSchema);

export default PHNumber;