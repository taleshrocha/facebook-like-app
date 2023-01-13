import { DotsHorizontalIcon, GlobeIcon } from "@heroicons/react/solid";
import { ChatIcon, ThumbUpIcon, ShareIcon } from "@heroicons/react/outline";

function Post() {
  return (
    <div className="border border-gray-300 rounded-lg">
      {/** Header */}
      <div className="flex justify-between items-center p-2">
        <img
          className="h-12 rounded-full"
          src="https://github.com/taleshrocha.png"
          alt=""
        />
        <div className="ml-2 flex-1">
          <h1 className="font-bold">Tales Rocha</h1>
          <div className="flex items-baseline text-gray-500 text-sm">
            {/** Message elapsed time */}
            <p>2d . </p>
            <GlobeIcon className="h-4" />
          </div>
        </div>
        <DotsHorizontalIcon className="icon bg-transparent" />
      </div>

      {/** Caption */}
      <p className="ml-2 mb-2">Yoo look at that!</p>

      {/** Content */}
      <img
        className="object-cover w-full"
        src="https://github.com/taleshrocha.png"
        alt=""
      />

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

      {/** Comments*/}
      <div className="p-8"></div>
    </div>
  );
}

function IconButton({ Icon, name }) {
  return (
    <div
      className="flex space-x-2 px-8 py-1 hover:bg-gray-200 transition-all
     duration-200 ease-out rounded-sm text-gray-500 hover:cursor-pointer my-1"
    >
      <Icon className="h-6" />
      <p className="font-bold">{name}</p>
    </div>
  );
}

export default Post;
