import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-10 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          alt=""
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      {/* Profile Pic */}

      {session ? (
        <div className="flex items-center sm:space-x-2 justify-end">
          <p className="whitespace-nowrap font-semibold pr-3 ">
            {session.user.name}
          </p>

          <ViewGridIcon className="icon" />
          <ChatIcon className="icon" />
          <BellIcon className="icon" />

          <img
            onClick={signOut}
            className="icon p-0 hover:brightness-90"
            src={session.user.image}
            alt=""
          />
        </div>
      ) : (
        <button
          className="whitespace-nowrap font-semibold pr-3 "
          onClick={signIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default Header;
