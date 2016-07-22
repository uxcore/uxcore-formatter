/**
 * Formatter Component for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

var Formatter = {};

Formatter.date = function(str, pattern) {
    var date = new Date(str);
    if ( Object.prototype.toString.call(date) === "[object Date]" ) {
        // it is date

        if (isNaN(date.getTime())) {
            // invalid
            console.warn('Formatter: invalid date');
            return "";
        }
        pattern = pattern || 'YYYY-MM-DD';
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "D+": date.getDate(), //日 
            "d+": date.getDate(), //日 
            "H+": date.getHours(), //小时 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "Q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/i.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return pattern;
    }
    console.warn('Formatter: invalid date');
    return "";
    
}

Formatter.money = function(str, delimiter, fixedNum) {
    delimiter = delimiter || " ";
    if (fixedNum) {
        str = parseFloat(str).toFixed(fixedNum).toString()
    }
    if (str.indexOf(".") !== -1) {
        return str.replace(/(\d)(?=(?:\d{3})+(\.))/g, function(match, $1) {
            return $1 + delimiter;
        }).replace(/(\d{3})(?![$|\.|\(|\s])/g, function(match, $1) {
            return $1;
        });
    }
    else {
        return str.replace(/(\d)(?=(?:\d{3})+$)/g, function(match, $1) {
            return $1 + delimiter;
        })
    }
}

Formatter.cnmobile = function(str, delimiter) {
    delimiter = delimiter || " ";
    return str.replace(/^(\+?0?86)(?!$)/, "$1" + delimiter).replace(/(\d{4})(?!$)/g, "$1" + delimiter);
}

Formatter.card = function(str, delimiter) {
    delimiter = delimiter || " ";
    return str.replace(/(\d{4})(?!$)/g, "$1" + delimiter);
}

module.exports = Formatter;