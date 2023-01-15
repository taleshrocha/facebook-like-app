import { useSession } from "next-auth/react";
import Post from "./Post";

function Feed() {
  const { data: session } = useSession();
  const firstName = session.user.name.split(" ")[0];
  return (
    <div className="col-span-3 sm:col-span-2 sm:pr-4 lg:col-span-1 lg:pr-0">
      {/** Add post */}
      <div className="flex border border-gray-300 rounded-lg bg-white my-4 p-3">
        <img className="h-12 rounded-full" src={session.user.image} alt="" />
        <button
          className="bg-gray-100 text-gray-500 rounded-full px-3 flex-1 mx-3
        hover:bg-gray-300 text-start -py-1"
        >
          What's on your mind, {firstName}?
        </button>
      </div>
      <Post />
    </div>
  );
}

export default Feed;
