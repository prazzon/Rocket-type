export default class View {
    _getWordOfType(index) {
        return document.querySelector(`.word:nth-of-type(${index})`);
    }

    _clearClass(nodeList, classNames) {
        nodeList.forEach((node) => {
            classNames.forEach((className) => {
                node.classList.remove(className);
            });
        });
    }
}
