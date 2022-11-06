import React from 'react'

const MainVideo = () => {
    return (
        <>
            <navbar>
                <div className="logo" style={{ color: "#cb43fc", display: "inline-block" }}>
                    SmartClass - iMeet
                </div>
            </navbar>
            {/* <div class="landing"> */}
            {/* <div class="head-cont unselectable">
                Welcome to QuickMeet!
                </div> */}
            <div className="main">
                <div className="create-join">
                    <div className="text">
                        <div className="head" style={{ color: "#f0f0f0" }}>
                            Tạo cuộc họp nhanh chỉ bằng một cú nhấp chuột
                        </div>
                        <div className="subtext">
                            Bạn không cần phải tạo tài khoản! Bắt đầu nhanh thôi! 🧡
                        </div>
                    </div>
                    <button
                        id="createroom"
                        className="createroom-butt unselectable"
                        style={{
                            backgroundColor: "#3f51b5",
                            border: "none",
                            width: 300,
                            marginBottom: 26
                        }}
                    >
                        <i style={{ marginRight: 26 }} className="fas fa-video" /> Tạo phòng mới
                    </button>
                    <br />
                    <a
                        href="http://localhost:3000/"
                        className="createroom-butt unselectable"
                        style={{
                            backgroundColor: "#cb43fc",
                            border: "none",
                            width: 300,
                            paddingLeft: 32,
                            paddingRight: 32
                        }}
                    >
                        <i style={{ marginRight: 26 }} className="fas fa-home" /> Quay về iChat
                    </a>
                    <br />
                    <input
                        type="text"
                        name="room"
                        spellCheck="false"
                        placeholder="Nhập mã phòng"
                        id="roomcode"
                        className="roomcode"
                    />
                    <br />
                    <div
                        className="joinroom unselectable"
                        id="joinroom"
                        style={{ color: "red", textDecoration: "none" }}
                    >
                        Tham gia
                    </div>
                </div>
                <div className="video-cont">
                    <video className="video-self" autoPlay="" muted="" playsInline="" />
                    <div className="settings">
                        <div className="device" id="mic">
                            <i className="fas fa-microphone" />
                        </div>
                        <div className="device" id="webcam">
                            <i className="fas fa-video" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="main-cont">

                <form class="roomform" action="room.html" method="GET">
                    <div class="formcont">
                        <input type="text" name="name" placeholder="Enter your name" id="username" class="inputtext"><br>
                        
                        <button type="submit" class="butt unselectable" id="joinroom">Join Room</button>
                        
                    </div>
                </form>

            </div> */}
            {/* </div> */}
            <div
                style={{
                    marginTop: 46,
                    marginBottom: 46,
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        padding: "0 12%",
                        marginTop: 32,
                        textAlign: "center"
                    }}
                >
                    <img
                        src="./img/logo-hutech.png"
                        alt="Logo Hutech"
                        style={{ color: "#cb43fc" }}
                        width="auto"
                        height="80px"
                    />
                    <p style={{ color: "white" }}>SmartClass supports for HUTECH IT</p>
                </div>
            </div>
        </>

    )
}

export default MainVideo;

