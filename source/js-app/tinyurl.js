// use Q for promise
// use jQuery for AJAX

/*
var tinyurl = {
    create: function(url){
        let deferred = Q.defer()
        
        $.ajax({
            //'url':      'http://dwz.cn/create.php',
            //'method':   'POST',
            //'data': {
            //    url: url
            //},
            'url':      `http://tinyurl.com/api-create.php?url=${url}`,
            'method':   'GET',
            'success': function(data){
                data = JSON.parse(data)
                _g.log(`[tinyurl] success: ${data.tinyurl}`, data)
                deferred.resolve(data.tinyurl)
            }
        })
        
        return deferred.promise
    }
}
*/