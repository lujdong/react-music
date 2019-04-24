import React from 'react'
import './recommend.styl'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

import { getCarousel, getAlbums } from '@/api/recommend'
import { CODE_SUCCESS } from '@/api/config'
import * as AlbumModel from '@/model/album'
import { getNewAlbum } from '../../api/recommend';

class Recommend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sliderList: [],
            newAlbums: []
        }
    }

    componentDidMount() {
        getCarousel().then(res => {
            if (res && res.code === CODE_SUCCESS) {
                this.setState({
                    sliderList: res.data.slider
                }, () => {  // this.state 已经更新
                    if (!this.sliderSwiper) {
                        // 初始化轮播图
                        this.sliderSwiper = new Swiper('.slider-container', {
                            loop: true,
                            autoplay: 3000,
                            autoplayDisableOnInteraction: false,
                            pagination: '.swiper-pagination'
                        })
                    }
                })
            }
        })

        getNewAlbum().then(res => {
            if (res && res.code === CODE_SUCCESS) {
                // 根据发布时间降序排列
                let albumList = res.albumlib.data.list
                albumList.sort((a, b) => {
                    return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
                })
                this.setState({
                    newAlbums: albumList
                })
            }
        })
    }

    toLink(linkUrl) {
        /* 使用闭包把参数变为局部变量使用 */
        return () => {
            window.location.href = linkUrl
        }
    }

    render() {
        let albums = this.state.newAlbums.map(item => {
            //通过函数创建专辑对象
            let album = AlbumModel.createAlbumByList(item);
            return (
                <div className="album-wrapper" key={album.mId}>
                    <div className="left">
                        <img src={album.img} width="100%" height="100%" alt={album.name} />
                    </div>
                    <div className="right">
                        <div className="album-name">
                            {album.name}
                        </div>
                        <div className="singer-name">
                            {album.singer}
                        </div>
                        <div className="public-time">
                            {album.publicTime}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="music-recommend">
                <div className="slider-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.sliderList.map(item => {
                                return (
                                    <div className="swiper-slide" key={item.id}>
                                        <a href="" className="slider-nav" onClick={() => this.toLink(item.linkUrl)}>
                                            <img src={item.picUrl} alt="" width="100%" height="100%" />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="album-container">
                    <h1 className="title">最新专辑</h1>
                    <div className="album-list">
                        {albums}
                    </div>
                </div>
            </div>
        )
    }
}


export default Recommend