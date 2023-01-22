import {
  DotsHorizontalIcon,
  GlobeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/solid";
import {
  EmojiHappyIcon,
  ChatIcon,
  ThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Post({ image, text, timeStamp, userImg, userName }) {
  const { data: session } = useSession();
  const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(true)

  const comments = [
    {
      id: 1,
      name: "Tales Rocha",
      image: "https://github.com/taleshrocha.png",
      input: "Comment one. Hello",
    },
    {
      id: 2,
      name: "Mozart",
      image: "https://github.com/taleshrocha.png",
      input: "Comment two. World",
    },
    {
      id: 3,
      name: "Bethoveen",
      image: "https://github.com/taleshrocha.png",
      input: "Comment three. I'm Tales Rocha",
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg bg-white mb-4">
      {/** Header */}
      <div className="flex justify-between items-center p-2 mx-2 mt-2">
        <img className="h-12 rounded-full" src={userImg} alt="" />
        <div className="ml-2 flex-1">
          <h1 className="font-bold">{userName}</h1>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            {/** Message elapsed time */}
            <p>2d</p>
            <p>·</p>
            <GlobeIcon className="h-4" />
          </div>
        </div>
        <DotsHorizontalIcon className="icon bg-transparent" />
      </div>

      {/** Caption */}
      <p className="ml-4 mb-2">{text}</p>

      {/** Content */}
      {image && <img className="object-cover w-full" src={image} alt="" />}

      {/** Content Info */}
      <div className="flex justify-between text-sm text-gray-600 items-center p-2">
        <p>100 likes</p>
        <div className="flex space-x-2">
          <p>50 comments</p>
          <p>25 shares</p>
        </div>
      </div>

      {/** Like, Comments, Share */}
      <div className="flex justify-center border-y m-2">
        <IconButton Icon={ThumbUpIcon} name="Like" />
        <IconButton Icon={ChatIcon} name="Comment" />
        <IconButton Icon={ShareIcon} name="Share" />
      </div>

      {/** Comment Input */}
      {session && (
        <div className="flex items-center m-4">
          <img className="h-8 rounded-full" src={session.user.image} alt="" />

          <div
            className="flex-col bg-gray-200 rounded-2xl 
            pl-2 pt-1 pb-2 pr-4 ml-2 flex-1"
          >
            <textarea
              className="ml-2 bg-transparent outline-none 
              text-sm resize-none w-full h-full overflow-hidden"
              placeholder="Write a comment..."
              onChange={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setIsTextAreaEmpty(e.target.value == "") 
              }}
            />
            <div className="flex justify-between mt-5 mb-1">
              <EmojiHappyIcon className="h-5 text-gray-500" />
              <PaperAirplaneIcon
                className={`h-5 text-gray-500 rotate-90 
                ${!isTextAreaEmpty && "text-blue-500"}`}
              />
            </div>
          </div>
        </div>
      )}

      {/** Comments*/}
      {comments.map((comment) => (
        <div key={comment.id} className="mx-4 my-1">
          <div className="flex">
            <img className="h-8 rounded-full" src={comment.image} alt="" />
            {/** Name and comment */}
            <div className="ml-2">
              <div className="bg-gray-200 rounded-2xl p-2 items-center">
                <p className="font-bold text-sm">{comment.name}</p>
                <p className="text-sm">{comment.input}</p>
              </div>
              {/** Likes, shares */}
              <div className="ml-4 flex space-x-6 items-end">
                <CommentButton name="Like" />
                <CommentButton name="Reply" />
                <p className="font-normal text-xs text-gray-500">5h</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IconButton({ Icon, name }) {
  return (
    <div
      className="flex space-x-2 px-8 py-1 hover:bg-gray-200 transition-all items-center
     duration-200 ease-out rounded-sm text-gray-500 hover:cursor-pointer my-1"
    >
      <Icon className="h-4 sm:h-6" />
      <p className="text-xs sm:text-base font-bold">{name}</p>
    </div>
  );
}

function CommentButton({ name }) {
  return <button className="text-gray-500 font-bold text-sm">{name}</button>;
}

export default Post;
