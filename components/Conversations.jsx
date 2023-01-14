import {
  ClockIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

export default function Conversations() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col mt-4 mr-3 container max-w-xs justify-self-end">
      <button
        className="hover:bg-gray-200 p-3 w-full flex space-x-2
    rounded-lg items-center transition-color duration-500 ease-out"
      >
        <div className="p-1 rounded-full bg-gray-300">
          <PlusIcon className="h-4" />
        </div>
        <p>Create new group</p>
      </button>

      <Conversation
        name="Tales Rocha"
        photo="https://www.github.com/taleshrocha.png"
      />
    </div>
  );
}

function Conversation({ name, photo }) {
  return (
    <button
      className="hover:bg-gray-200 p-3 w-full flex space-x-2
    rounded-lg items-center transition-color duration-500 ease-out"
    >
      <img className="rounded-full h-10" src={photo} alt="" />
      <p className="font-bold">{name}</p>
    </button>
  );
}
