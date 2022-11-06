import React from 'react'

const Room = () => {
    return (
        <>
            <div className="overlay" id="overlay">
                <div className="box">
                    <div className="head-name">Nhập Nickname</div>
                    <input
                        type="text"
                        className="name-field"
                        placeholder="Nhập Nickname ở đây..."
                        id="name-field"
                    />
                    <br />
                    <button className="continue-name">
                        <i className="fas fa-arrow-right" /> Tiếp tục
                    </button>
                </div>
            </div>
            <div className="container-room">
                <div className="left-cont" style={{ backgroundColor: "#171c2e" }}>
                    <div className="video-cont-single" id="vcont">
                        <div className="video-box">
                            <video
                                className="video-frame"
                                id="vd1"
                                autoPlay=""
                                playsInline=""
                            ></video>
                            <div className="nametag" id="myname">
                                Tên của bạn
                            </div>
                            <div className="mute-icon" id="mymuteicon">
                                <i className="fas fa-microphone-slash" />
                            </div>
                            <div className="video-off" id="myvideooff">
                                Video Off
                            </div>
                        </div>
                    </div>
                    <div className="whiteboard-cont">
                        <canvas id="whiteboard" height={1000} width={1000} />
                        <div className="colors-cont">
                            <div className="black" onclick="setColor('black')" />
                            <div className="red" onclick="setColor('#e74c3c')" />
                            <div className="yellow" onclick="setColor('#f1c40f')" />
                            <div className="green" onclick="setColor('#badc58')" />
                            <div className="blue" onclick="setColor('#3498db')" />
                            <div className="orange" onclick="setColor('#e67e22')" />
                            <div className="purple" onclick="setColor('#9b59b6')" />
                            <div className="pink" onclick="setColor('#fd79a8')" />
                            <div className="brown" onclick="setColor('#834c32')" />
                            <div className="grey" onclick="setColor('gray')" />
                            <div className="eraser" onclick="setEraser()">
                                <i className="fas fa-eraser" />
                            </div>
                            <div className="clearboard" onclick="clearBoard()">
                                <i className="fas fa-trash-alt" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="utils">
                            <div className="audio tooltip">
                                <i className="fas fa-microphone" />
                                <span className="tooltiptext">Âm thanh</span>
                            </div>
                            <div className="novideo tooltip">
                                <i className="fas fa-video" />
                                <span className="tooltiptext">Video</span>
                            </div>
                            <div className="screenshare tooltip">
                                <i className="fas fa-desktop" />
                                <span className="tooltiptext">Chia sẻ màn hình</span>
                            </div>
                            <div className="board-icon tooltip">
                                <i className="fas fa-chalkboard" />
                                <span className="tooltiptext">Bảng trắng</span>
                            </div>
                            <div className="cutcall tooltip">
                                <i className="fas fa-phone-slash" />
                                <span className="tooltiptext">Thoát cuộc gọi</span>
                            </div>
                        </div>
                        <div className="copycode-cont">
                            <div className="roomcode" />
                            <button className="copycode-button" onclick="CopyClassText()">
                                Copy Code
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-cont" style={{ backgroundColor: "#202124" }}>
                    <div className="head-title" style={{ backgroundColor: "#202124" }}>
                        <div className="chats" style={{ color: "white" }}>
                            <i className="fas fa-comment-alt mr-1" />
                            Trò chuyện
                        </div>
                        <div className="attendies" style={{ color: "white" }}>
                            <i className="fas fa-users mr-1" />
                            Người tham dự
                        </div>
                    </div>
                    <div className="chat-cont" style={{ backgroundColor: "#202124" }}></div>
                    <div
                        className="chat-input-cont"
                        style={{ backgroundColor: "#202124", marginBottom: 0 }}
                    >
                        <div className="ci-cont">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Chat tại đây.."
                            />
                        </div>
                        <div className="ci-send">
                            <button className="chat-send">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Room;