class YuubariFrame {
    enabled = false;
    iframe = undefined;
    frame = undefined;

    constructor() {
        if (!node || !node.path) return;

        const localCheck = node.path.resolve(_g.root, '../Yuubari');
        if (node.fs.existsSync(localCheck)) {
            this.enabled = true;
            this.root = 'http://localhost:8703/';
        }
    }

    init() {
        if (!this.enabled) return;

        _frame.dom.yuubariFrame = $('<div class="yuubari-frame"/>').appendTo(
            _frame.dom.main
        );
        _frame.dom.yuubariFrameIframe = $(
            `<iframe src="${this.root}?v0" allowTransparent />`
        ).appendTo(_frame.dom.yuubariFrame);

        this.iframe = _frame.dom.yuubariFrameIframe;
        this.frame = _frame.dom.yuubariFrameIframe[0].contentWindow;
    }

    show() {
        if (!this.enabled) return;
    }
    hide() {
        if (!this.enabled) return;
    }

    go(route) {
        if (!this.enabled) return;
    }
    replace(route) {
        if (!this.enabled) return;
    }

    message(msg) {
        if (!this.enabled) return;
    }
}
