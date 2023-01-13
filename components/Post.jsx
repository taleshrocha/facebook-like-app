import {
  DotsHorizontalIcon,
  GlobeAltIcon,
  GlobeIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
function Post() {
  return (
    <div>
      {/** Header */}
      <div>
        <div className="flex p-4 justify-between items-center">
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
      </div>

      {/** Caption */}
      <div>
        <p>Yoo look at that!</p>
      </div>

      {/** Content */}

      {/** Content Info */}

      {/** Like, Comments, Share */}

      {/** Comments*/}
    </div>
  );
}

export default Post;
