export const store = {
    state: {
        isReload: false,
    },
    changestate() {
        this.state.isReload = true;
    }
}