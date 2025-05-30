import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context';
const Sidebar = () => {
    const [extend, setExtend] = useState(false);
    const {onSent, prevPrompt, setRecentPrompt,newChat} = useContext(Context);

    const loadPrompt= async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <>
            <div className="sidebar">
                <div className="top">
                    <div className="menu">
                        <img onClick={() => setExtend(prev => !prev)} src={assets.menu_icon} alt="menu-icon" />
                        {extend ? <p>Menu</p> : null}
                    </div>
                    <div onClick={()=>newChat()} className="new-chat">
                        <img src={assets.newchat_icon} alt="new-chat" />
                        {extend ? <p>New Chat</p> : null}
                    </div>
                    {extend
                        ? <div className="history">
                            <div className="history-title">
                                <img src={assets.history_icon} alt="history-icon" />
                                <p>History</p>
                            </div>
                            {prevPrompt.map((item, index) => {
                                return (
                                    <div onClick={()=>loadPrompt(item)} key={index} className="chats">
                                        <p>{item.slice(0,20)}...</p>
                                    </div>
                                )
                            })}

                        </div>
                        : null
                    }


                </div>
            </div>
        </>
    )
}

export default Sidebar