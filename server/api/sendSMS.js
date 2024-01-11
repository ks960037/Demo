export default defineEventHandler(async (event) => {
    console.log('發送SMS');
    console.log(event);
    let response;
    try {
        let msgBody = {
            clientid: "b0f0e2",
            password: "5690dddfa28ae085d23518a035707282",
            mobile: "00639650975003,00639057431218,00639056405133,00639928793385", // 傳送對象 todo: 傳入資料
            content: "", // 訊息內容 todo: 傳入資料
            extend: null,
            uid: null,
            sendtime: null
        };
        response = await fetch(
            'https://httpsms.rtl.hk/sms-server/sendsms',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgBody),
            });
    } catch (error) {
        // 處理錯誤...
        console.log(error);
    }
    return response.status;
})
