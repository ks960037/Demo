export default defineEventHandler(async (event) => {
    console.log("查報告");
    try {
        let msgBody = {
            clientid: "b0b2o0",
            password: "5690dddfa28ae085d23518a035707282"
        };
        const msgBodyString = JSON.stringify(msgBody);
        // console.log(msgBody);
        let response = await fetch(
            'https://httpsms.rtl.hk/sms-server/getreport',
            {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json;charset=utf-8;",
                    "Accept": "application / json;"
                }),
                body: msgBodyString,
            });
        let result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        // 處理錯誤...
        console.log(error);
        return error;
    }
})
