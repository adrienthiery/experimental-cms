class Field {
    name = 'Sample field';
    // type can be string, boolean, text, number, component, date, media
    type = 'string';
    value = 'Sample field value';
    props = null;
    required = false;

    constructor(name, type, value, required) {
        if (type === 'component') {
            this.props = [];
            this.value = null;
        }
    }

    toJSONString() {
        let clone = Object.assign({}, this);

        delete clone.toJSON;

        return JSON.stringify(clone, null, 4);
    }
}