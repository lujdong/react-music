import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

import './progress.styl'

class Progress extends Component {

    // TODO: 进度条拖拽原理
    componentDidMount() {

        let progressBarDOM = ReactDOM.findDOMNode(this.refs.progressBar);
        let progressDOM = ReactDOM.findDOMNode(this.refs.progress);
        let progressBtnDOM = ReactDOM.findDOMNode(this.refs.progressBtn);

        this.progressBarWidth = progressBarDOM.offsetWidth;

        let { disableButton, disableDrag, onDragStart, onDrag, onDragEnd } = this.props

        // 执行按钮和拖拽启用状态
        if (disableButton !== true && disableDrag !== true) {
            let downX = 0, buttonLeft = 0

            // 开始拖拽
            progressBtnDOM.addEventListener('touchstart', e => {

                let touch = e.touches[0]
                downX = touch.clientX
                buttonLeft = parseInt(touch.target.style.left, 10)
                if (onDragStart) {
                    onDragStart()
                }

            })
            // 拖拽
            progressBtnDOM.addEventListener('touchmove', e => {
                e.preventDefault()
                let touch = e.touches[0]
                let diffX = touch.clientX - downX

                let btnLeft = buttonLeft + diffX

                if (btnLeft > progressBarDOM.offsetWidth) {

                    btnLeft = progressBarDOM.offsetWidth;

                } else if (btnLeft < 0) {

                    btnLeft = 0;

                }

                //设置按钮left值
                touch.target.style.left = btnLeft + "px";
                //设置进度width值
                progressDOM.style.width = btnLeft / this.progressBarWidth * 100 + "%";

                if (onDrag) {
                    onDrag(btnLeft / this.progressBarWidth);
                }

            });
            // 停止拖拽
            progressBtnDOM.addEventListener("touchend", (e) => {

                if (onDragEnd) {
                    onDragEnd();
                }

            })
        }

    }

    componentDidUpdate(prevProps, prevState) {

        //组件更新后重新获取进度条总宽度
        if (!this.progressBarWidth) {
            this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth;
        }

    }

    render() {



        let { progress, disableButton } = this.props

        // 进度
        if (!progress) {
            progress = 0
        }

        // 按钮 left 值
        let progressButtonOffsetLeft = 0
        if (this.progressBarWidth) {
            progressButtonOffsetLeft = progress * this.progressBarWidth
        }
        return (
            <div className="progress-bar" ref="progressBar">
                <div className="progress-load"></div>
                <div className="progress" ref="progress" style={{ width: `${process * 100}%` }}></div>
                {
                    disableButton === true ? "" :
                        <div className="progress-button" ref="progressBtn" style={{ left: progressButtonOffsetLeft }}></div>
                }
            </div >
        )
    }

}

Progress.propTypes = {
    progress: PropTypes.number.isRequired,  // 进度
    disableButton: PropTypes.bool,          // 是否禁用按钮
    disableDrag: PropTypes.bool,            // 是否禁用拖拽
    onDragStart: PropTypes.func,            // 开始拖拽回调函数
    onDrag: PropTypes.func,                 // 拖拽中回调函数
    onDragEnd: PropTypes.func               // 拖拽结束回调
};

export default Progress
