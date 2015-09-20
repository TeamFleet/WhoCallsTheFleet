/**
 *  弹出盒
 *
 ***********************************************************************************************************************
 *  元素属性
 *      acgdb-popup="[值]"
 *          猛击弹出一个弹出盒，弹出方式根据 [值] 进行定义
 *
 *      acgdb-popup-disable-actions
 *          需要禁用的 popup 按钮
 *          示例: acgdb-popup-disable-actions="close"
 *
 *      acgdb-popup-extra-actions
 *          额外的 popup 按钮
 *          示例: acgdb-popup-extra-actions="new-tab"
 *          
 ***********************************************************************************************************************
 *  方法
 *      init()
 *          初始化
 *
 *      show(opts)
 *          显示弹出盒
 *          @param  {opts}          {object}        可选设置集
 *              use_iframe          {boolean}       是否使用 <iframe />, 默认: true
 *              src                 {string}        <iframe /> 的地址
 *              className           {string}        #popup 的样式类
 *              callbefore          {function}      在显示弹出盒之前调用的方法
 *              disable_actions     {array}         不使用的动作集合
 *              extra_actions       {array}         额外的动作集合
 *
 *      hide(opts)
 *          隐藏弹出盒
 *          @param  {opts}          {object}        可选设置集
 *              callbefore          {function}      在隐藏之前调用，如果执行完毕后返回 true，那么将不再隐藏弹出盒
 *              callback            {function}      在隐藏之后调用的方法
 *
 *      dom(use_iframe)
 *          生成弹出盒结点集
 *          @param  {use_iframe}    {boolean}       是否使用 <iframe /> 作为内容区的填充
 *          @return {jQuery DOM}    jQuery Nodelist
 *      
 ***********************************************************************************************************************
 *  方法字典
 *      funcs
 *          [acgdb-popup] 处理方法字典, 需使用 Function.call()
 *          @this   {DOM}           被猛击的元素
 *          @param  {_popup}        _p.el.popup 的引用
 *          
 ***********************************************************************************************************************
 *  defaults            常量字典
 *  controls            控制按钮字典
 *  controls_events     控制按钮的猛击事件
 *  
 ***********************************************************************************************************************
 *  DOM 参考
 *      <div id="popup-mask" class="on"></div>
 *      <div id="popup" class="on">
 *          <div class="container ready" style="width: 85%; height: 85%;">
 *              <div class="controls">
 *                  <a href="javascript:;" acgdb-icon="tab"></a>
 *                  <a href="javascript:;" acgdb-icon="expand"></a>
 *                  <a href="javascript:;" acgdb-icon="&times;"></a>
 *              </div>
 *              <div class="main">
 *                  <div class="loading"></div>
 *                  <iframe src="http://www.oschina.net/code/snippet_1266917_27073"></iframe>
 *              </div>
 *              <h2><dfn><i acgdb-icon="edit" class="color-0">文章</i></dfn>禁忌领域同人展</h2>
 *          </div>
 *      </div>
 */

_p.el.popup = {
    defaults: { LOADING: '加载中...' },

    init: function() {
        $body.on('click', '[acgdb-popup]', function(e) {
            e.preventDefault();
            if(e.result == 'popup') return ;

            var _popup  =   _p.el.popup,
                funcs   =   _popup.funcs,
                $el     =   $(this),
                name    =   $el.attr('acgdb-popup'),
                disable_actions = ($el.attr('acgdb-popup-disable-actions') || '').split(/\s*,\s*/),
                extra_actions = ($el.attr('acgdb-popup-extra-actions') || '').split(/\s*,\s*/);

            if($.isFunction(funcs[name]))
                funcs[name].call(this, _popup, { 
                    disable_actions: disable_actions,
                    extra_actions: extra_actions,
                    setWidth:       $el.attr('acgdb-popup-width')
                });

            return 'popup';
        });

        _frame.global.esc_register(function() {
            var $close = $('[acgdb-action="close"]');
            if($close.length) $close.trigger('click');
            else _p.el.popup.hide();
        });
    },

    funcs: {
        'true': function(_popup, opts) {
            _popup.show({
                src:                this.href,
                disable_actions:    opts.disable_actions,
                extra_actions:      opts.extra_actions,
                setWidth:           opts.setWidth,
                callbefore:     function(opts, $dom) {
                    opts.use_iframe && opts.src && $dom.iframe.on('load.auto', function() {
                        var $body = $(this).contents().find('body'),
                            $content = $('#content'),
                            width, height;
                        if(!$content.length) $content = $('article');
                        if(!$content.length) $content = $('#main');
                        width = opts.setWidth
                                    ? _g.get_rem(opts.setWidth)
                                    : ((width = $content.width()) > 1024 ? 1024 : width);
                        height = $content.height();

                        $dom.container.css({ width: width, height: height });
                    });
                }
            });
        },
        'wide': function(_popup, opts) {
            _popup.show({
                src:                this.href,
                className:          'wide',
                disable_actions:    opts.disable_actions,
                extra_actions:      opts.extra_actions
            });
        }
    },

    show: function(opts) {
        opts = $.extend({
            use_iframe:         true,
            src:                null,
            className:          null,
            callbefore:         null,
            disable_actions:    [],
            extra_actions:      []
        }, opts || {});

        var $dom = this.dom(opts.use_iframe);

        opts.className && $dom.root.addClass(opts.className);

        if(opts.disable_actions && opts.disable_actions.length) {
            for(var i = 0; i < opts.disable_actions.length; i++) {
                var disabled = opts.disable_actions[i];
                disabled && $('[acgdb-action="' + disabled + '"]', $dom.root).remove();
            }
        }

        if(opts.extra_actions && opts.extra_actions.length) {
            for(var i = 0; i < opts.extra_actions.length; i++) {
                var extra = opts.extra_actions[i];
                extra && this.controls[extra] && $('<a />', {
                    'acgdb-action': extra,
                    'acgdb-icon':   this.controls[extra].icon,
                    'acgdb-tip':    this.controls[extra].tip,
                    href:           'javascript:;'
                }).prependTo($dom.controls);
            }
        }

        if(opts.use_iframe) {
            opts.src && $dom.iframe.attr('src', opts.src).on('load.base', function() {
                var header = $(this).contents().find('h1').html();
                $dom.loading.fadeOut();
                header && $dom.header.fadeOut(400, function() {
                    $dom.header.html(header);
                    $(this).fadeIn();
                });
            });
        }

        if(_g.preference.data['popup-full-screen']) $('[acgdb-action="full-screen"]', $dom.root).trigger('click');

        $.isFunction(opts.callbefore) && opts.callbefore(opts, $dom);

        setTimeout(function() {
            $dom.mask.addClass('on');
            $dom.root.addClass('on');
        }, 8);
    },

    hide: function(opts) {
        opts = $.extend({
            callbefore: null,
            callback:   null
        }, opts);

        if($.isFunction(opts.callbefore) && opts.callbefore()) return ;

        var $nodes = $('#popup-mask, #popup').removeClass('on');
        setTimeout(function() { 
            $nodes.remove(); 
            $.isFunction(opts.callback) && opts.callback();
        }, _g.animate_duration_delay);
    },

    dom: function(use_iframe) {
        var $dom = {},
            controls = ['full-screen', 'close'];

        $dom.mask = $('#popup-mask').length ? $('#popup-mask') : $('<div />', { id: 'popup-mask' }).appendTo('body');
        $dom.root = $('#popup').length ? $('#popup') : $('<div />', { id: 'popup' }).appendTo('body');

        $dom.mask.removeClass('on');
        $dom.root.removeClass().empty();
        $dom.container  =   $('<div />').addClass('container').appendTo($dom.root);
        $dom.h2         =   $('<h2 />').appendTo($dom.container);
        $dom.header     =   $('<span />').text(this.defaults.LOADING).appendTo($dom.h2);
        $dom.controls   =   $('<div />').addClass('controls').appendTo($dom.container)
                                .on('click', 'a', function(e) {
                                    var $el = $(this),
                                        events = _p.el.popup.controls_events,
                                        act = $(this).attr('acgdb-action');

                                    if($.isFunction(events[act])) events[act].call(this, e);
                                });
        $dom.main       =   $('<div />').addClass('main').appendTo($dom.container);

        for( var i = 0; i < controls.length; i++ ) {
            var con = controls[i];
            if(this.controls[con])
                $('<a />', {
                    'acgdb-action': con,
                    'acgdb-icon':   this.controls[con].icon,
                    // 'acgdb-tip':    this.controls[con].tip,
                    href:           'javascript:;'
                }).appendTo($dom.controls);
        }

        if(use_iframe === true) {
            $dom.content    =   $('<div />').addClass('content').appendTo($dom.main);
            $dom.loading    =   $('<div />').addClass('loading').appendTo($dom.content);
            $dom.iframe     =   $('<iframe />').appendTo($dom.content);
        }

        return $dom;
    },

    controls: {
        'wide':         { icon: 'screen', tip: '宽屏' },
        'full-screen':  { icon: 'expand', tip: '全屏' },
        'restore':      { icon: 'contract', tip: '还原' },
        'close':        { icon: 'cancel', tip: '关闭' },
        'new-tab':      { icon: 'new-tab', tip: '一个新窗口（可能会导致数据丢失）' }
    },

    controls_events: {
        'close': function(e) {
            _p.el.popup.hide();
        },

        'full-screen': function(e) {
            var restore = _p.el.popup.controls.restore;
            $('#popup').addClass('full-screen');
            $(this).attr({
                'acgdb-icon':   restore.icon,
                // 'acgdb-tip':    restore.tip,
                'acgdb-action': 'restore'
            });

            _g.preference.update('popup-full-screen', true);
        },

        'restore': function(e) {
            var full_screen = _p.el.popup.controls['full-screen'];
            $('#popup').removeClass('full-screen');
            $(this).attr({
                'acgdb-icon':   full_screen.icon,
                // 'acgdb-tip':    full_screen.tip,
                'acgdb-action': 'full-screen'
            });

            _g.preference.update('popup-full-screen', false);
        },

        'new-tab': function() {
            var $iframe = $('iframe', '#popup');
            window.open($iframe.attr('src'));
        },
    }
};