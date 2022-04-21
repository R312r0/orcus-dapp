import Numeral from 'numeral';
import BigNumber from "bignumber.js";
import fromExponential from "from-exponential";
import {MAX_INT} from "./constants";

// Format number for more human readable for example (100k $, 1b $, 150m $)
export const formattedNum = (number, usd = false, acceptNegatives = false) => {
    if (isNaN(number) || number === '' || number === undefined) {
        return usd ? '$0' : 0
    }
    let num = parseFloat(number)

    if (num > 500000000) {
        return (usd ? '$' : '') + toK(num.toFixed(0), true)
    }

    if (num === 0) {
        if (usd) {
            return '$0'
        }
        return 0
    }

    if (num < 0.0001 && num > 0) {
        return usd ? '< $0.0001' : '< 0.0001'
    }

    if (num > 1000) {
        return usd ? formatDollarAmount(num, 0) : Number(parseFloat(num).toFixed(0)).toLocaleString()
    }

    if (usd) {
        if (num < 0.1) {
            return formatDollarAmount(num, 4)
        } else {
            return formatDollarAmount(num, 2)
        }
    }

    return Number(parseFloat(num).toFixed(4)).toString()
}

// Addition for "formattedNum"
export const formatDollarAmount = (num, digits) => {
    const formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    })
    return formatter.format(num)
}

// Addition for "formattedNum"
export const toK = (num) => {
    return Numeral(num).format('0.[00]a')
}

export const getDateDiff = (date1, date2) => {
    const diff = new Date(date2.getTime() - date1.getTime());

    return {
        year: diff.getUTCFullYear() - 1970,
        month: diff.getUTCMonth(),
        day: diff.getUTCDate() - 1,
        hour: diff.getUTCHours(),
        minute: diff.getUTCMinutes(),
        second: diff.getUTCSeconds()
    };
};

export const formatToDecimal = (value, decimals) => {
    if (value === "MAX") return MAX_INT;
    let returned_amount = new BigNumber(new BigNumber(value).multipliedBy(new BigNumber(10**decimals))).toString()
    if (returned_amount.includes('e')) {
        returned_amount = fromExponential(returned_amount)
    }
    const result = returned_amount;
    return result
}

export const formatFromDecimal = (value, decimals) => {
    if(isNaN(Number(value))) {
        return;
    }

    let returned_amount = new BigNumber(value).div(new BigNumber(10**decimals)).toString()

    if (returned_amount.includes('e')) {
        returned_amount = fromExponential(returned_amount)
    }
    return returned_amount;
}

// Format user address to "ffff....ffff" type.
export const formatAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
};
