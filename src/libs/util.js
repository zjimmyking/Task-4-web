
const util = {};

util.getWebImUsername = function () {
    return localStorage.getItem('webImUsername');
}

util.setWebImUsername = function (username) {
    localStorage.setItem('webImUsername', username);
}

util.getWebImNickName = function () {
    return localStorage.getItem('webImNickName');
}

util.setWebImNickName = function (nickName) {
    localStorage.setItem('webImNickName', nickName);
}

util.getWebImToken = function () {
    return localStorage.getItem('webImToken');
}

util.setWebImToken = function (token) {
    localStorage.setItem('webImToken', token);
}

util.createNotification = function (title, tag, body, image, closeTime) {
    let Notification = window.Notification || window.mozNotification || window.webkitNotification;
    if (Notification) {
        if (Notification.permission === 'granted') {
            let notify = new Notification(
                title,
                {
                    tag,
                    body,
                    image,
                    data: ''
                }
            );

            if (closeTime && closeTime > 0) {
                notify.onshow = function () {
                    setTimeout(function () {
                        notify.close();
                    }, 3000);
                };
            }

            return notify;
        }
    }
};

util.dateFormat = function (d, fmt) {
    let dd = d;
    if (!d) return '';
    if (typeof dd !== 'string') {
        if (dd.toString().length === 10) d = d * 1000;
    }
    let date = new Date(d);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;

    function padLeftZero (str) {
        return ('00' + str).substr(str.length);
    }
};

export default util;
