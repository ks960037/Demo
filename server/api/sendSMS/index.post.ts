export default defineEventHandler(async (event) => {
    // console.log('發送SMS');
    const body = await readBody(event);
    // console.log(body);
    const numbers = body.numbers;
    // console.log(numbers);
    const smsContent = "【签名】" + body.smsContent;
    // console.log(smsContent);

    let numberList: string = "";
    for (let number of numbers) {
        numberList += "00" + number + ",";
    }
    numberList = numberList.slice(0, numberList.length - 1);
    // console.log(numberList);

    let response: Response;
    let result;
    try {
        let msgBody = {
            clientid: "b0f0e2",
            password: "5690dddfa28ae085d23518a035707282",
            mobile: numberList,  // 傳送對象
            content: smsContent, // 訊息內容 todo: 傳入資料
            extend: null,
            uid: null,
            sendtime: null
        };
        const msgBodyString = JSON.stringify(msgBody);
        // console.log(msgBody);
        response = await fetch(
            'https://httpsms.rtl.hk/sms-server/sendsms',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json;charset=utf-8;'
                }),
                body: msgBodyString,
            });
        result = await response.json();
        console.log(result);
    } catch (error) {
        // 處理錯誤...
        console.log(error);
    }

    return result;
})
