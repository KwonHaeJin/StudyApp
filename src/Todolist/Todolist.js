/* eslint-disable */
import React, { useState } from 'react';
import { useLongPress } from 'use-long-press';
import pictureAlram from '../images/bell3.png';
import iconImg from '../images/icon.png';
import iconImg2 from '../images/icon2.png';
import iconImg3 from '../images/icon3.png';
import iconImg4 from '../images/icon4.png';
import iconImg5 from '../images/icon5.png';
import iconImg6 from '../images/plus.png';
import '../App.css';
import './Todolist.css';
import { useNavigate } from 'react-router-dom';


const Todolist = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const navigate = useNavigate();
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showDPopup, setDShowPopup] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isExiting2, setIsExiting2] = useState(false);
    const [longPressTimeout, setLongPressTimeout] = useState(null);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleXButtonClick = () => {
        setShowPopup(false);
    };

    const handleDelteButton = () =>{
        setDShowPopup(false);
    };

    const saveNote = event => {
        setNote(event.target.value);
        console.log(event.target.value);
    };
    const saveTitle = event => {
        setTitle(event.target.value);
        console.log(event.target.value);
    }; const saveContent = event => {
        setContent(event.target.value);
        console.log(event.target.value);
    };

    const [tasks, setTasks] = useState([
        { id: 1, profile: iconImg2, checked: true, content: "Running", range: "p100~110", color: "#E1EEE6" },
        { id: 2, profile: iconImg, checked: false, content: "Bicycle", range: "p100~110", color: "#F1EDFA" },
        { id: 3, profile: iconImg3, checked: true, content: "Security", range: "p100~110", color: "#F7ECEC" },
        { id: 4, profile: iconImg4, checked: false, content: "Network", range: "p100~110", color: "#EAEBF6" },
        { id: 5, profile: iconImg5, checked: false, content: "Coding", range: "p100~110", color: "#EFEEEE" },
    ]);

    const handleCheckboxChange = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, checked: !task.checked } : task
            )
        );
    };

    const bind = useLongPress(() => {
        setDShowPopup(true);
    }, {
        onFinish: () => console.log("Long press finished"),
        threshold: 1000,
        capture: true,
    });

    return (
        <div className="main" style={{ marginBottom: "2vh" }}>
            <div style={{ height: "7vh" }}></div>
            <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
                <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '14px' }}>{month},</p>
                    <div style={{ width: "2vw" }}></div>
                    <p style={{ color: "#FF7A00", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '14px' }}>{day}</p>
                </div>
                <button style={{ position: "absolute", right: "1px", border: "none", backgroundColor: "transparent", transition: "transform 0.2s ease-in-out", }}
                    onClick={(e) => {
                        e.target.style.transform = "scale(0.9)";  // 버튼 클릭 시 확대 효과
                        setTimeout(() => {
                            e.target.style.transform = "scale(1)";  // 0.2초 후 원래 크기로 돌아옴
                        }, 200);
                        navigate('/notification');
                    }}>
                    <img src={pictureAlram} width='20vw' height='20vh'>
                    </img>
                </button>
            </div>
            <p style={{ fontFamily: "Basic", fontSize: "30px", marginRight: "14.5vh", color: "#FF7A00", fontWeight: "Bold", marginBottom: "1vh" }}>Weekely Notes</p>
            <textarea className="note-box" type="text" value={note} onChange={saveNote} />
            <p style={{ marginRight: "21vh", color: "black", fontFamily: "Baisc", fontSize: "20px", fontWeight: "Bold" }}>Today, todolist</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', width: "100%", alignItems: "flex-start" }}>
                {tasks.map(task => (
                    <button key={task.id}  {...bind()} style={{ flexDirection: "column", border: 'none', borderRadius: '2vh', padding: '1.5vh', height: "20vh", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: task.color, }}>
                        <div className='row-content'>
                            <img src={task.profile} style={{
                                width: '5vh',
                                height: '5vh',
                                marginLeft: '1vh',
                                marginTop: '1vh',
                            }}></img>
                            <div style={{ width: "10vw" }}></div>
                            <input
                                className='check-box'
                                type="checkbox"
                                checked={task.checked}
                                onChange={() => handleCheckboxChange(task.id)}
                            />
                        </div>
                        <p style={{ marginLeft: "2vw", marginTop: "3.5vh", marginBottom: "0.5vh", fontFamily: "Basic", fontSize: "17px", fontWeight: "500" }}>{task.content}</p>
                        <p style={{ marginLeft: "2vw", marginTop: "0", fontFamily: "Basic", fontSize: "12px" }}>{task.range}</p>
                    </button>
                ))}
                <button onClick={handleButtonClick} style={{ display: "flex", border: '1.5px solid #E4E4E4', borderRadius: '20px', padding: '3vh', height: "20vh", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "#F2F2F2", flexDirection: "column" }}>
                    <img src={iconImg6} style={{
                        width: '3vh',
                        height: '3vh',
                    }}></img>
                    <p style={{ marginBottom: "0", fontFamily: "Basic", fontSize: "18px", }}>Add to</p>
                    <p style={{ marginTop: "0", fontFamily: "Basic", fontSize: "18px", }}>task</p>
                </button>
                <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
                {showPopup && (
                    <div className={`popup ${isExiting ? 'exiting' : ''}`}>
                        <div className="popup-content" style={{ width: "80vw", height: "28vh", backgroundColor: "white", border: "1px solid #E6E6E6" }}>
                            <div style={{ height: "2vh" }}></div>
                            <div style={{ marginLeft: "4vw" }} className='row-content'>
                                <p style={{ fontFamily: "Basic", fontSize: "16px" }} >title</p>
                                <div style={{ width: "10vw" }}></div>
                                <input type='text' value={title} onChange={saveTitle} style={{ fontFamily: "Basic", fontSize: "16px", border: "none", borderBottom: "1px solid #E4E4E4" }} />
                            </div>
                            <div style={{ marginRight: "6vw" }} className='row-content'>
                                <p style={{ fontFamily: "Basic", fontSize: "16px" }}>contents</p>
                                <div style={{ width: "10vw" }}></div>
                                <input type='text' value={content} onChange={saveContent} style={{ fontFamily: "Basic", fontSize: "16px", border: "none", borderBottom: "1px solid #E4E4E4" }} />
                            </div>
                            <div style={{ height: "8vh" }}></div>
                            <div className='row-content'>
                                <button className="round-button" style={{ backgroundColor: "#FFFFFF", color: "black", fontSize: "12px" }} onClick={handleXButtonClick}>취소</button>
                                <div style={{ width: "1.5vh" }}></div>
                                <button className="round-button-orange" style={{ backgroundColor: "#FF7A00", color: "white", fontSize: "12px" }}>완료</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`shadow ${showDPopup ? 'active' : ''}`} style={{ display: showDPopup ? 'block' : 'none' }}></div>
                {showDPopup && (
                    <div className={`popup ${isExiting2 ? 'exiting' : ''}`}>
                        <div className="popup-content" style={{ width: "50vw", height: "3.5vh", backgroundColor: "white", border: "1px solid #E6E6E6", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <div className='row-content'>
                                <p style={{ fontFamily: "Basic", fontSize: "16px", fontWeight:"bold" }} >todoTitle</p>
                                <div style={{ width: "2vw" }}></div>
                                <button onClick={handleDelteButton} style={{ fontFamily: "Basic", fontSize: "16px", border: "none", color:"red", backgroundColor:"transparent", fontWeight:"bold" }}>삭제</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Todolist;