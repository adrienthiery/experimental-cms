class Page {
    name = 'Page';
    title = 'Sample Title';
    description = 'Sample Description';
    url = '/sample';
    content = [];

    constructor(name, title, description, url, content) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.url = url;
        this.content = content;
    }

    toJSONString() {
        let clone = Object.assign({}, this);

        delete clone.toJSON;

        return JSON.stringify(clone, null, 4);
    }
}

export default Page;