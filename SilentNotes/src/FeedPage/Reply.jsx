import axios from 'axios';
import React, { memo, useState } from 'react'
import DOMPurify from 'dompurify';
import ReactTimeAgo from 'react-time-ago';
import { useNavigate } from 'react-router-dom';

const Reply = ({data}) => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = new useState(data.liked);
  const [isLiking, setIsLiking]= useState(false)
  const [likeCnt, setLikeCnt] = useState(data.likeCnt)

  return (
    <span className="flex flex-row mt-4 ">
      <div className=" min-h-9 min-w-9 overflow-hidden mr-2">
        <img src={data.avatar} />
      </div>
      <div className=" w-full mr-4">
        <div className=" bg-gray-200 rounded-lg py-2 px-4">
          {/* Reply top bar */}
          <span className="flex flex-wrap h-min flex-row text-gray-600 justify-start items-center">
            <a href={"http://"+data.collegeDomain} target="_blank">
              <span className="hover:underline underline-offset-2 inline-block font-semibold text-xs h-max break-all">
              {data.college}
            </span>
            </a>
            {/* Seperator circle */}
            <span className="text-[0.3rem] flex justify-center items-center mx-1">
              <i className="fa-solid fa-circle"></i>
            </span>
            <span className="text-xs flex justify-center items-center">
              {data.username}
            </span>
            {/* Seperator circle */}
            <span className="text-[0.3rem] flex justify-center items-center mx-1">
              <i className="fa-solid fa-circle"></i>
            </span>
            <span className="text-xs flex justify-center items-center h-full">
              <ReactTimeAgo  date={new Date(data.createdAt)} locale="en-US"/>
            </span>
          </span>
          <div className="mt-2 break-all" dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.body.substring(0, 400), {
            ADD_ATTR: ["target", "className"],
          }),
        }}>
          </div>
        </div>
        <span className="mt-1 ml-1 flex flex-row">
          <span onClick={()=>{
              setIsLiking(true)
              axios({
                url:import.meta.env.VITE_BACKEND+"/like/reply/"+data.id,
                withCredentials: true,
                method:"POST"
              }).then(
                ({data})=>{
                  if(data.event==1)setIsLiked(true)
                  else setIsLiked(false)
                  setIsLiking(false)
                  setLikeCnt(likeCnt+data.event)
                }
              ).catch(({response})=>{
                if(response && response.status && response.status === 401) {
                  navigate("/auth/login");
                  toast.info("Hey! join the discussions here.");
                } else
                  toast.error(
                    (response && response.data && response.data.error) ||
                      "Something went wrong"
                  );
                  setIsLiking(false)
              })
            }} className="text-sm buttonDataShakeAnimation flex text-accenty hover:bg-gray-100 transition-all py-1 px-2 rounded-full">
            <span>
              {isLiked?
              <img src="https://img.icons8.com/papercut/15/like.png" />
              :
              <i className={`${isLiking && "heartBeatAnimation"} fa-regular fa-heart mr-1`}></i>}
            </span>
            <span className='text-sm flex justify-center items-center'>{likeCnt}</span>
          </span>
        </span>
      </div>
    </span>
  );
};

export default memo(Reply)
