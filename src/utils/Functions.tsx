
export const HashColorGenerate = (): string => {
    const num = Math.floor(Math.random() * 16777215).toString(16)
    return "#" + num
}

