import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

    return (
        <>
            <div className="main">
                <div className="nav-bar">
                    <p>Chat Bot</p>
                    <img src={assets.user_icon} alt="user" />
                </div>
                <div className="container">
                    {!showResult
                    ?<>
                    <div className="greet">
                        <p><span>Hello!</span></p>
                        <p>What can I help you with today?</p>
                    </div>

                    <div className="cards">
                        <div className="card">
                            <p>Learn Something New</p>
                            <img src={assets.study_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Get Advice</p>
                            <img src={assets.advice_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Take a Quiz</p>
                            <img src={assets.quiz_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Translate</p>
                            <img src={assets.translate_icon} alt="" />
                        </div>
                    </div>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="output">
                            <img src={assets.bot_icon} alt="chat-bot" />
                            {loading
                            ?<div className="loading">
                                <p className='loader'>Wait a Moment.....</p>
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                        </div>
                    </div>
                }
                    
                    <div className="main-bottom">
                        <div className="input-box">
                            <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Enter a message here' />
                            <div>
                                <img src={assets.image_icon} alt="Add images" />
                                <img src={assets.mic_icon} alt="mic" />
                                {input?<img onClick={()=>onSent()} src={assets.enter_icon} alt="enter" />:null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main