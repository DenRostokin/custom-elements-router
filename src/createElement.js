const createElement = (elementName, props) => {
    const node = document.createElement(elementName)

    node.props = { ...props }

    return node
}

export default createElement
