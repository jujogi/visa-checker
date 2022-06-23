const delay = (promise: { (): Promise<void>; (): void; }, timeout: number) => new Promise<void>(resolve => {
    setTimeout(() => {
        promise();
        resolve();
    }, timeout);
});

export default delay;