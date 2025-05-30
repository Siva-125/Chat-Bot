import { createContext, useState } from "react";
import runChat from "../config/gemini_API";

export const Context=createContext();

const ContextProvider = (props)=>{

    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    const delayData=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }
    
    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined){
            response=await runChat(prompt);
        }else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        let responseArr=response.split("**");
        let newResponse="";
        for(let i=0;i<responseArr.length; i++){
            if (i===0||i%2!==1){
                newResponse+=responseArr[i];
            }else{
                newResponse+="<b>"+responseArr[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let updatedResponse=newResponse2.split(" ");
        for (let i=0; i<updatedResponse.length; i++){
            const nextWord=updatedResponse[i];
            delayData(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")

    }
    
    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;