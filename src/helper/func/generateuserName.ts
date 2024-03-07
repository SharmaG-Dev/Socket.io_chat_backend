


export function GenerateUserName() {
    const items = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name: string = "";
    for (let i = 0; i < 6; i++) {
        name += items.charAt(Math.floor(Math.random() * items.length));
    }
    return name;
}
