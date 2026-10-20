import React, { useState, useEffect, useRef } from 'react';
import styles from './TrainPage.css'; // 这里要确保你的样式文件引入正确


let block_msg_class='类别'

const TrainPage = ({ isTrain }) => {
  if (!isTrain) return null; 

  const channelTrain=new BroadcastChannel('channelTrain')
  function back(){
    channelTrain.postMessage(false)
  }
 
  
  let videoStream;
 
  const channelVideo = new BroadcastChannel('channelVideo')
  channelVideo.addEventListener('message',async (event)=>{
    if(typeof event.data=='string'){
      if(event.data=='close'){
        if(videoStream){
          videoStream.getTracks().forEach(track => track.stop());
        }
        
      }else{
        let video=iframeDocument.getElementById(event.data)
        videoStream=await navigator.mediaDevices.getUserMedia({video:true})
        video.srcObject = videoStream
      }
    }else{
      console.log(event.data)
    }
   
    
    
  })

  const currentURL = window.location.href;


// 方案1：基于当前页面的相对路径
const modelPath = '/m/static/aiModel/ai_choice.html'//new URL('../static/aiModel/ai_choice.html', window.location.href).href;
  console.log(modelPath)
  console.log(window.location.href)

  const modelSelectRef = useRef(null);
  const projectManagementRef = useRef(null)
  const topBarTiltRef = useRef(null)


  const iframeRef = useRef(null);
  let iframeDocument



  useEffect(() => {
    // 在 iframe 加载完成后，获取内部 DOM 元素
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        if (iframeRef.current) {
          iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
          
        }
      };
    }
  }, []);




  
  return (
    
    <div>
      <iframe
        id='myIframe'
        ref={iframeRef}
        src={modelPath}
        width="100%"
        height="600px"
        className={styles.total}
        allow="camera *; microphone *"
        sandbox="allow-scripts allow-same-origin allow-popups allow-modals allow-downloads"
      />
    </div>
    
  );
};

export default TrainPage;