'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * jQuery Popup Layer Plugin
 * https://github.com/edwardnevermind/jquery.popuplayer.js
 *
 * @author Edward
 * MIT licensed
 */

;;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($) {

    var PopupLayer = function PopupLayer(elem, opt) {
        this.$elem = $(elem);
        this.$mask = $("<div class='popup-layer'></div>");
        this.$content = $("<div class='popup-layer-content'></div>");
        this.$blurAreas = $("body > *");

        this.defaults = {
            content: "", // 内容可以传入，纯文本和类名
            target: "body", // 把弹出层添加到的目标节点
            to: "top", // 向哪个方向展开
            screenRatio: 0.3, // 占屏幕百分比
            heightOrWidth: 300, // 当且仅当screenRatio为0时生效
            blur: false, // 是否开启毛玻璃效果
            speed: 200, // 动画速度
            color: "#000", // 文本颜色
            backgroundColor: "#fff", // 背景颜色
            contentToggle: false, // 点击content是否关闭弹出层
            closeBtn: null, // 指定关闭按钮
            openCallback: null, // 展开的回调
            closeCallback: null // 关闭的回调
        };

        // 合并默认参数和自定义参数
        this.options = $.extend({}, this.defaults, opt);
    };

    PopupLayer.prototype = {
        init: function init() {
            this.attachElems();
            this.updateContent();
            this.bindEvents();
        },
        updateContent: function updateContent() {
            this.$content.html($(this.options.content));

            var that = this;
            $(function () {
                that.$content.children().show();
            });

            var content_position = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };

            content_position[this.options.to] = "100%";

            this.$content.css({
                'top': content_position.top,
                'right': content_position.right,
                'bottom': content_position.bottom,
                'left': content_position.left,
                'color': this.options.color,
                'background-color': this.options.backgroundColor,
                'transition': 'all ' + this.options.speed / 1000 + 's',
            });
        },
        attachElems: function attachElems() {
            this.$content.appendTo(this.$mask);
            this.$mask.appendTo($(this.options.target));
        },
        open: function open() {
            this.$mask.fadeIn(this.options.speed);

            // 如果screenRatio为0那么根据屏幕宽高计算占比
            if (this.options.screenRatio != 0) {
                this.$content.css(_defineProperty({}, this.options.to, (1 - this.options.screenRatio) * 100 + "%"));
            } else {
                var ratio = 0;

                if (this.options.to == "left" || this.options.to == "right") {
                    ratio = this.options.heightOrWidth / $(window).outerWidth();
                } else {
                    ratio = this.options.heightOrWidth / $(window).outerHeight();
                }
                this.$content.css(_defineProperty({}, this.options.to, (1 - ratio) * 100 + "%"));
            }

            if (this.options.blur) {
                this.$blurAreas.addClass('popup-layer-blur');
            }

            if (this.options.openCallback) {
                this.options.openCallback();
            }
        },
        close: function close() {
            this.$mask.fadeOut(this.options.speed);
            this.$content.css(_defineProperty({}, this.options.to, "100%"));

            if (this.options.blur) {
                this.$blurAreas.removeClass('popup-layer-blur');
            }

            if (this.options.closeCallback) {
                this.options.closeCallback();
            }
        },
        bindEvents: function bindEvents() {
            var that = this;
            this.$elem.click(function () {
                that.open();
            });

            // 阻止点击content时冒泡到上层
            if (!this.options.contentToggle) {
                this.$content.click(function (event) {
                    event.stopPropagation();
                });
            }

            this.$mask.click(function () {
                that.close();
            });

            if (this.options.closeBtn) {
                $(this.options.closeBtn).click(function () {
                    that.close();
                });
            }
        }
    };

    $.fn.PopupLayer = function (options) {
        return this.each(function () {
            new PopupLayer(this, options).init();
        });
    };
});