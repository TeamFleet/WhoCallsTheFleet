_g.events = [
    // {
    //     code: 'leyteA',
    //     title: {
    //         ja_jp: '捷号決戦！邀撃、レイテ沖海戦(前篇)',
    //         zh_cn: '捷号决战！迎击莱特湾海战（前篇）',
    //     },
    //     start: 1510844400000, // 2017.11.17
    //     // start: 1510328726083, // !!TEST!! 2017.11.10
    //     end: 1512957600000, // 2017.12.11 11:00 JST
    // },
    {
        code: 'leyteB',
        title: {
            ja_jp: '捷号決戦！邀撃、レイテ沖海戦(後篇)',
            zh_cn: '捷号决战！迎击莱特湾海战（后篇）',
        },
        start: 1510844400000, // 2017.11.17
        // start: 1510328726083, // !!TEST!! 2017.11.10
        end: 1521770400000, // 2018.03.23 10:00 +0800
    },
    {
        code: 'hawaii2nd',
        title: {
            ja_jp: '発動！友軍救援「第二次ハワイ作戦」',
            zh_cn: '发动！友军救援“第二次夏威夷作战”',
        },
        historicalFleets: [
            'E1: 第四百战队',
            'E2: 第二舰队 & 其他加强舰',
            'E3: 第五战队 & 苏联友军',
            'E4: 参与珍珠港空袭'
        ],
        start: 1558364400000, // 2019.05.21
        // start: 1510328726083, // !!TEST!! 2017.11.10
        end: 1561082400000, // 2019.06.21 10:00 +0800
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
