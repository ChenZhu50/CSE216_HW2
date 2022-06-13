class KeyValuePair {

    /**
     * Creates an instance of KeyValuePair.
     * @param {*} initKey
     * @param {*} initValue
     * @memberof KeyValuePair
     */
    constructor(initKey, initValue) {
            this.key = initKey;
            this.val = initValue;
        }
        /**
         *
         *
         * @return {*} 
         * @memberof KeyValuePair
         */
    toString() {
        return "(" + this.key + ", " + this.val.toString() + ")";
    }
}

/**
 *
 *
 * @class HasTable
 */
export default class HashTable {
    /**
     * Creates an instance of HasTable.
     * @param {number} [initSize=7]
     * @param {number} [loadFactor=1.0]
     * @memberof HasTable
     */
    constructor(initSize = 7, initKeyLength = 8) {
        this.storage = [];
        this.count = 0;
        this.limit = initSize || 7;
        this.keyLength = initKeyLength || 8
        this.loadFactor = 1.0;
    }

    getSize() {
        return this.count;
    }


    /**
     *
     *
     * @return {*} 
     * @memberof HashTable
     */
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar = String.fromCharCode(97 + randomNum);
            key += randomChar;
        }
        return key;
    }

    /**
     *
     *
     * @param {string} str
     * @return {number} 
     * @memberof HasTable
     */
    hasFunc(str) {
        let hascode = 0;
        for (let i = 0; i < str.length; i++) {
            hascode = hascode * 37 + str.charCodeAt(i);
        }
        hascode = hascode % this.limit;
        return hascode;
    }

    /**
     *
     *
     * @return {*} 
     * @memberof HasTable
     */
    isEmpty() {
        return !this.count;
    }

    /**
     *
     *
     * @param {string} key
     * @param {*} val
     * @return {*} 
     * @memberof HasTable
     */
    putValue(key, val) {
        let hascode = this.hasFunc(key);
        if (this.storage[hascode] == null) {
            this.storage[hascode] = [new KeyValuePair(key, val)];
            this.count++;
            this.resize();
            return;
        }
        let index = 0;
        let chain = this.storage[hascode];

        while (index < chain.length) {
            if (chain[index].key === key) {
                chain[index].val = val;
                return;
            }
            index++;
        }
        chain.push(new KeyValuePair(key, val));
        this.count++;
        this.resize();
    }

    /**
     *
     *
     * @param {string} key
     * @return {*} 
     * @memberof HasTable
     */
    getValue(key) {
        if (this.isEmpty()) return null;
        let hascode = this.hasFunc(key);
        if (!this.storage[hascode]) return null;
        let index = 0;
        let chain = this.storage[hascode];

        while (index < chain.length) {
            if (chain[index].key === key) {
                return chain[index].val;
            }
            index++;
        }
        //没找到返回null
        return null;
    }

    /**
     *
     *
     * @param {string} key
     * @return {*} 
     * @memberof HasTable
     */
    removeValue(key) {
        if (this.isEmpty()) return -1;
        let hascode = this.hasFunc(key);
        if (!this.storage[hascode]) return -1;
        let index = 0;
        while (index < this.storage[hascode].length) {
            if (this.storage[hascode][index].key == key) {
                this.count--;
                return this.storage[hascode].splice(index, 1);
            }
            index++;
        }
        return -1;
    }


    /**
     *
     *
     * @return {*} 
     * @memberof HasTable
     */
    resize() {
        if (this.count / this.limit < this.loadFactor) return;
        this.limit = this.limit * 2 + 1;
        while (!this.isPrime(this.limit)) {
            this.limit++;
        }
        let oldStorage = this.storage;
        this.storage = [];
        this.count = 0;
        let index = 0;
        while (index < oldStorage.length) {
            if (oldStorage[index]) {
                let chainIndex = 0;
                while (chainIndex < oldStorage[index].length) {
                    let obj = oldStorage[index][chainIndex];
                    this.putValue(obj.key, obj.val);
                    chainIndex++;
                }
            }
            index++;
        }
    }


    /**
     *
     * @param {number} num
     * @return {boolean} 
     * @memberof HasTable
     */
    isPrime(num) {
        let newNum = parseInt(Math.sqrt(num));
        for (let i = 2; i <= newNum; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    toString() {
        let text = "[\n";
        let num = 0;
        this.storage.forEach(element => {
            if (element) {
                element.forEach((kvp) => {
                    num++;
                    text += `  ${num}  :  ${kvp.toString()}\n`
                })
            }

        });
        text += "]\n";
        return text;
    }
}