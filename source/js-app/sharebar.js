class ShareBar{
	constructor(options){
		options = options || {}
		this.settings = $.extend(true, {}, ShareBar.defaults, options)
		
		this.el = this.create();
		
		return this
	}
	
	create(){
		this.el = $('<div class="sharebar"/>')
		
		this.settings.sites.forEach(function(site){
			let link = $('<a/>',{
					'class':			'sharebar-share sharebar-site-'+site,
					'data-share-site':	site,
					'href':				'javascript:;',
					'target':			'_self',
					'icon':				ShareBar.iconmap[site] || site
				}).appendTo(this.el)
		
			if( this.settings.modifyItem )
				this.settings.modifyItem(link)
		}.bind(this))
		
		this.el.on('click.sharebar-share', 'a[data-share-site]', function(e, is_to_launch){
            let $el = $(e.target)
                ,site = $el.attr('data-share-site')
            $el.attr({
                'href': 	'http://s.jiathis.com/?webid='
                            + site
                            + '&url='
                            + encodeURIComponent(this.getContent( 'url', location.href ))
                            + '&title='
                            + encodeURIComponent(this.getContent( 'title', document.title ))
                            + '&summary='
                            + encodeURIComponent(this.getContent( 'summary', $('meta[name="description"]').attr('content') ))
                            
                            + (this.settings.uid ? ('&uid=' + this.settings.uid) : '')
                            + (this.settings.appkey[site] ? ('&appkey=' + this.settings.appkey[site]) : '')
                            
                            + '&shortUrl=true',
                'target': 	'_blank'
            })
		}.bind(this))
		
		return this.el
	}
	
	getContent(t, fallback){
		if( typeof this.settings[t] == 'function' )
			return this.settings[t](this)
		if( this.settings[t] )
			return this.settings[t]
		return fallback
	}
}

ShareBar.defaults = {
	// url: null,
	// title: null,
	// summary: null,
	
	// 修改创建的链接
	// modifyItem: function(el){},
	
	// JiaThis的用户ID
	// uid: null,
	
	// 支持的网站 http://www.jiathis.com/help/html/support-media-website
	sites: [
		'tsina',		// 微博
		'tqq',			// 腾讯微博
		'cqq',			// QQ好友
		'twitter',
		'tieba'			// 百度贴吧
	],

	appkey: {}
};

ShareBar.iconmap = {
	'tsina':	'weibo',
	'tqq':		'tencent-weibo',
	'cqq':		'qq'
}
