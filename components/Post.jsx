import {
  DotsHorizontalIcon,
  GlobeIcon,
  PaperAirplaneIcon,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";
import {
  EmojiHappyIcon,
  ChatIcon,
  ThumbUpIcon as ThumbUpIconLine,
  ShareIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, image, text, timeStamp, userImg, userName }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const textAreaRef = useRef(null);
  const popUpMenuRef = useRef(null);
  const buttonPopUpRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popUpMenuRef.current &&
        buttonPopUpRef.current &&
        !popUpMenuRef.current.contains(e.target) &&
        !buttonPopUpRef.current.contains(e.target)
      )
        setPopUpMenu(false);
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [popUpMenuRef, buttonPopUpRef]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  // Get all the likes
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "likes"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [db, id]
  );

  // Get if the user has liked the post
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.id) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.id));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.id), {
        userName: session.user.name,
        timeStamp: serverTimestamp(),
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    // Avoid spans
    const commentToSend = comment;

    setComment("");
    textAreaRef.current.style.height = "inherit";

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userName: session.user.name,
      userImg: session.user.image,
      timeStamp: serverTimestamp(),
    });

    console.log("Comment:", commentToSend, "\nSended to Post with id:", id);
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white mb-4">
      {/** Header */}
      <div className="flex justify-between items-center p-2 mx-2 mt-2 relative">
        <img className="h-12 rounded-full" src={userImg} alt="" />
        <div className="ml-2 flex-1">
          <h1 className="font-bold">{userName}</h1>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            {/** Message elapsed time */}
            <Moment fromNow>{timeStamp?.toDate()}</Moment>
            <p>·</p>
            <GlobeIcon className="h-4" />
          </div>
        </div>
        <button
          ref={buttonPopUpRef}
          className="icon bg-transparent"
          onMouseUp={() => setPopUpMenu(!popUpMenu)}
        >
          <DotsHorizontalIcon />
        </button>
        {popUpMenu && (
          <div
            ref={popUpMenuRef}
            className="flex justify-center absolute right-0 top-0 mr-8 mt-10 bg-white w-40 h-60 z-10 shadow-md rounded-xl"
          >
            <button className="flex-1 h-8 hover:bg-gray-100">
              Delete post
            </button>
          </div>
        )}
      </div>

      {/** Caption */}
      <p className="whitespace-pre-wrap overflow-scroll mx-4 mb-2 max-h-36">
        {text}
      </p>

      {/** Content */}
      {image && <img className="object-cover w-full" src={image} alt="" />}

      {/** Content Info */}
      <div className="flex justify-between text-sm text-gray-600 items-center p-2">
        <p>
          {likes.length == 0
            ? "No likes"
            : `${likes.length} 
              like${likes.length == 1 ? "" : "s"}`}
        </p>
        <div className="flex space-x-2">
          <p>
            {comments.length == 0
              ? "No comments"
              : `${comments.length} 
              comment${comments.length == 1 ? "" : "s"}`}
          </p>
          <p>25 shares</p>
        </div>
      </div>

      {/** Like, Comments, Share */}
      <div className="flex justify-center border-y m-2">
        <IconButton
          className={`${hasLiked ? "!text-blue-500" : ""}`}
          onClick={likePost}
          Icon={hasLiked ? ThumbUpIconSolid : ThumbUpIconLine}
          name="Like"
        />
        <IconButton Icon={ChatIcon} name="Comment" />
        <IconButton Icon={ShareIcon} name="Share" />
      </div>

      {/** Comment Input */}
      {session && (
        <div className="flex items-center m-4">
          {session.user.image ? (
            <img className="h-8 rounded-full" src={session.user.image} alt="" />
          ) : (
            <div className="h-8 rounded-full bg-red-500"></div>
          )}

          <div
            className="flex-col bg-gray-200 rounded-2xl 
            pl-2 pt-1 pb-2 pr-4 ml-2 flex-1"
          >
            <textarea
              className="ml-2 bg-transparent outline-none 
                text-sm resize-none w-full h-full overflow-hidden"
              placeholder="Write a comment..."
              value={comment}
              ref={textAreaRef}
              rows={1}
              onKeyDown={(e) => {
                if (e.key == "Enter" && !e.shiftKey) {
                  comment.trim() ? sendComment(e) : e.preventDefault();
                }
              }}
              onChange={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setComment(e.target.value);
              }}
            />
            <div className="flex justify-between mt-5 mb-1">
              <EmojiHappyIcon className="h-5 text-gray-500" />
              <button
                className="group"
                disabled={!comment.trim()}
                onClick={sendComment}
              >
                <PaperAirplaneIcon
                  className="h-5 rotate-90 text-blue-500 
                    group-disabled:text-gray-500"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Comments*/}
      <div className=" max-h-52 overflow-y-scroll">
        {comments.map((comment) => (
          <div key={comment.id} className="mx-4 my-1">
            <div className="flex">
              <img
                className="h-8 rounded-full"
                src={comment.data().userImg}
                alt=""
              />
              {/** Name and comment */}
              <div className="ml-2">
                <div className="bg-gray-200 rounded-2xl p-2 items-center">
                  <p className="font-bold text-sm">{comment.data().userName}</p>
                  <p className="text-sm break-words whitespace-pre-wrap max-w-xs max-h-24 overflow-y-scroll">
                    {comment.data().comment}
                  </p>
                </div>
                {/** Likes, shares */}
                <div className="ml-4 flex space-x-6 items-end">
                  <CommentButton name="Like" />
                  <CommentButton name="Reply" />
                  <Moment fromNow className="font-normal text-xs text-gray-500">
                    {comment.data().timeStamp?.toDate()}
                  </Moment>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconButton({ Icon, name, className, ...props }) {
  return (
    <button
      {...props}
      className={`flex space-x-2 px-8 py-1 hover:bg-gray-200 transition-all items-center
     duration-200 ease-out rounded-sm text-gray-500 hover:cursor-pointer my-1 ${className}`}
    >
      <Icon className={`h-4 sm:h-6 ${className}`} />
      <p className="text-xs sm:text-base font-bold">{name}</p>
    </button>
  );
}

function CommentButton({ name }) {
  return <button className="text-gray-500 font-bold text-sm">{name}</button>;
}

export default Post;
