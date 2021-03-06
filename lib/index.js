"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elementResizeDetectorMaker = require("element-resize-detector");
var ResizeObserverLite = /** @class */ (function () {
    function ResizeObserverLite(handler) {
        var _this = this;
        this.handler = handler;
        this.listenedElement = null;
        this.hasResizeObserver = typeof window.ResizeObserver !== 'undefined';
        if (this.hasResizeObserver) {
            this.rz = new ResizeObserver(function (entries) {
                _this.handler(getSize(entries[0].target));
            });
        }
        else {
            this.erd = elementResizeDetectorMaker({ strategy: 'object' });
        }
    }
    ResizeObserverLite.prototype.observe = function (element) {
        var _this = this;
        if (this.listenedElement !== element) {
            if (this.listenedElement) {
                this.disconnect();
            }
            if (element) {
                if (this.hasResizeObserver) {
                    this.rz.observe(element);
                }
                else {
                    this.erd.listenTo(element, function (element) {
                        _this.handler(getSize(element));
                    });
                }
            }
            this.listenedElement = element;
        }
    };
    ResizeObserverLite.prototype.disconnect = function () {
        if (this.listenedElement) {
            if (this.hasResizeObserver) {
                this.rz.disconnect();
            }
            else {
                this.erd.uninstall(this.listenedElement);
            }
            this.listenedElement = null;
        }
    };
    return ResizeObserverLite;
}());
exports.default = ResizeObserverLite;
function getSize(element) {
    return {
        width: getNumber(window.getComputedStyle(element)['width']),
        height: getNumber(window.getComputedStyle(element)['height'])
    };
}
function getNumber(str) {
    var m = /^([0-9\.]+)px$/.exec(str);
    return m ? parseFloat(m[1]) : 0;
}
//# sourceMappingURL=index.js.map