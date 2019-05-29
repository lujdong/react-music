import { connect } from 'react-redux'
import { showPlayer, changeSong } from '../redux/actions'
import Player from '../components/play/Player'

// 映射 redux 的 state 到组件的 props 上
const mapStateToProps = (state, ownProps) => {
    return {
        showStatus: state.showStatus,
        currentSong: state.song,
        playSongs: state.songs
    }
}

// 映射 dispatch 到组件的 props 上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showMusicPlayer: (status) => {
            dispatch(showPlayer(status))
        },
        changeCurrentSong: song => {
            dispatch(changeSong(song))
        }
    }
}

// 将 UI 包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Player)
