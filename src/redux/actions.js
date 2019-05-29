import * as ActionTypes from './actionTypes'

/**
 * Action 是把数据从应用传到 store 里，它是 store 数据的唯一来源
 */

//  action 创建函数，用来创建 action 对象，使用 action 创建函数更容易移植和测试, 通过 type 表示要执行的操作
export const showPlayer = showStatus => {
    return {
        type: ActionTypes.SHOW_PLAYER,
        showStatus
    }
}

export const changeSong = song => {
    return {
        type: ActionTypes.CHANGE_SONG,
        song
    }
}

export const removeSong = id => {
    return {
        type: ActionTypes.REMOVE_SONG_FROM_LIST,
        id
    }
}

export const setSongs = songs => {
    return {
        type: ActionTypes.SET_SONGS,
        songs
    }
}
