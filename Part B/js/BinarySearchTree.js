class Node {
    constructor(initKey, initData) {
        this.key = initKey;
        this.data = initData;
        //this.parent = this;
        this.left = null;
        this.right = null;
    }
    toString() {
        return `${this.key} ${this.data.toString()}`;
    }
}

class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar = String.fromCharCode(97 + randomNum);
            key += randomChar;
        }
        return key;
    }

    getSize() {
        return this.size;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        let newNode = new Node(key, value);
        if (!this.root) {
            this.root = newNode;
            this.size = 1;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
                this.size++;
            } else {
                this.insertNode(node.left, newNode)
            }
        } else if (newNode.key > node.key) {
            if (node.right === null) {
                node.right = newNode
                this.size++;
            } else {
                this.insertNode(node.right, newNode)
            }
        } else {
            node.data = newNode.data
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        if (!this.root) {
            return null;
        } else {
            return this.searchNode(key, this.root)
        }
    }

    searchNode(key, node) {
        if (key < node.key) {
            if (node.left === null) {
                return null;
            } else {
                return this.searchNode(key, node.left)
            }
        } else if (key > node.key) {
            if (node.right === null) {
                return null
            } else {
                return this.searchNode(key, node.right)
            }
        } else {
            return node.data;
        }
    }

    min(node) {
        const minNode = (node) => {
            return node ? (node.left ? minNode(node.left) : node) : null;
        }
        return minNode(node || this.root)
    }

    max(node) {
        const maxNode = (node) => {
            return node ? (node.right ? maxNode(node.right) : node) : null
        }
        return maxNode(node || this.root)
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        const removeNode = (node, key) => {
            if (node === null) {
                return null;
            }
            if (node.key === key) {
                if (node.left === null && node.right === null) {
                    return null
                } else if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                } else {
                    let minNode = this.min(node.right);
                    node.key = minNode.key;
                    node.data = minNode.data;
                    node.right = removeNode(node.right, node.key)
                    this.size--;
                    return node;
                }

            } else if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node
            } else {
                node.right = removeNode(node.right, key)
                return node
            }
        }
        removeNode(this.root, key)
    }


    /**
     *后序遍历
     *
     * @return {*} 
     * @memberof BinarySearchTree
     */
    postOrderTraverse() {
        let backs = [];
        const callback = data => {
            return data
        }
        const inOrderNode = (node, callback) => {
            if (node !== null) {
                inOrderNode(node.left, callback);     
                inOrderNode(node.right, callback) 
                backs.push(callback(node.data)); 
            }
        }
        inOrderNode(this.root, callback)
        return backs
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level + 1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level + 1);
        return text;
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}