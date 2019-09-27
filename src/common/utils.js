// 公共的方法

// 函数防抖
export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer)
            clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay);
    }
}