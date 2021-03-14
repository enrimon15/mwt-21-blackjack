export function setStyle(element, objProps) {
    const keys = Object.keys(objProps);
    keys.forEach(function(key) {
        element.style[key] = objProps[key];
    });
}

export function initAbsolute(element, props) {
    element.style.position = 'absolute';
    props.forEach(function(key) {
        element.style[key] = 0;
    });
}

export function setCenterFlexLayout(element) {
    setStyle(element, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });
}
