const tool = {
    setStorage(name: string, val: any) {
        let value = JSON.stringify(val);
        localStorage.setItem(name, value);
    },
    getStorage(name: string): any {
        let val: any = localStorage.getItem(name);
        return JSON.parse(val);
    }
}

export default tool