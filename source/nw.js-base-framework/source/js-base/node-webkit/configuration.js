var _config = {
    getFullKeyname: function (key) {
        return 'config_' + key
    },

    get: function (key) {
        if (!localStorage)
            return false

        key = _config.getFullKeyname(key)

        var value = Lockr.get(key)
        // var value = localStorage[_config.getFullKeyname(key)]

        if (value === 'true')
            return true

        if (value === 'undefined') {
            Lockr.rm(key)
            // delete localStorage[_config.getFullKeyname(key)]
            return null
        }

        return value
    },

    set: function (key, value) {
        if (!localStorage)
            return false

        key = _config.getFullKeyname(key)

        if (value === null && Lockr.get(key)) {
            // delete localStorage[_config.getFullKeyname(key)]
            Lockr.rm(key)
        } else {
            Lockr.set(key, value)
            // localStorage[_config.getFullKeyname(key)] = value
        }
    }
}




_frame.app_config = {
    //is_init: false,

    init: function () {
        if (_frame.app_config.is_init)
            return true

        _frame.app_config.is_init = true
    }
}