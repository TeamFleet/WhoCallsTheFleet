_g.events = [
    {
        code: 'leyteA',
        title: {
            ja_jp: '捷号決戦！邀撃、レイテ沖海戦(前篇)',
            zh_cn: '捷号决战！迎击莱特湾海战（前篇）',
        },
        // start: 1510844400000, // 2017.11.17
        start: 1510328726083, // !!TEST!! 2017.11.10
        end: 1512658800000, // !!TBA!! 2017.12.08
    }
]

_g.getCurrentEvent = (now) => {
    if (now instanceof Date)
        now = now.valueOf
    else if (typeof now === 'string')
        now = parseInt(now)
    else if (!now)
        now = (new Date()).valueOf()

    return _g.events.filter(event => (now >= event.start && now < event.end))
}