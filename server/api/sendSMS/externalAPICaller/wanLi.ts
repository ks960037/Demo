const url = useRuntimeConfig().wanliUrl;
const acc = useRuntimeConfig().wanliAcc;
const pas = useRuntimeConfig().wanliPas;
export function fetchWanLi(
    uid: string,
    number: string,
    content: string,
    sendtime: string) {

    let msgBody = {
        clientid: acc,
        password: pas,
        mobile: number,
        content: content,
        extend: null,
        uid: uid,
        sendtime: sendtime
    };

    const msgBodyString = JSON.stringify(msgBody);

    return fetch(
        url + '/sendsms',
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8;'
            }),
            body: msgBodyString,
        });
}