export function fetchYKGMS(msgBody: any) {
    const config = useRuntimeConfig();
    const key = config.YKAcc;
    const pas = config.YKPas;
    const phone = "";
    const content = "";
    const url = `http://114.119.185.174:9090/sms/batch/v2?appkey=${key}&appsecret=${pas}&phone=${phone}&msg=${content}`;
    return fetch(
        url,
        {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json;charset=utf-8;",
                "Accept": "application / json;"
            }),
            body: msgBody,
        }
    );
}