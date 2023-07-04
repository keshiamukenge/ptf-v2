export function getNormalizeHTMLElementPosition(element: HTMLElement): [number, number, number] {
    if(!element) return [0, 0, 0]

    const { x, y, width, height } = element.getBoundingClientRect();
    
    const position: [number, number, number] = [
        x + width / 2 - window.innerWidth / 2,
        -y - height / 2 + window.innerHeight / 2,
        1
    ]

    return position
}

export function getHTMLElementSize(element: HTMLElement, widthSegments: number, heightSegments: number): [number, number, number, number] {
    if(!element) return [0, 0, widthSegments, heightSegments]

    const sizes: [number, number, number, number] = [
        element.getBoundingClientRect().width,
        element.getBoundingClientRect().height,
        widthSegments,
        heightSegments
    ]
    
    return sizes
}
