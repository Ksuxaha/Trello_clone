
export const clock = () => {
    const clock = document.querySelector('.clock');

    const setTime = () => {
        const time = new Date().toLocaleTimeString();
        clock.textContent = time;
    }
    setTime();

    setInterval(setTime, 1000);
};
