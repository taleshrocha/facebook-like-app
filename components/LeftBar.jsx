import { ClockIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function LeftBar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col md:max-w-xs mt-4">
      <BarButton
        name={session.user.name}
        Icon={() => (
          <img className="rounded-full h-7" src={session.user.image} alt="" />
        )}
      />
      <BarButton name="Find Friends" Icon={UsersIcon} />
      <BarButton name="Most Recent" Icon={ClockIcon} />
      <BarButton
        name="Welcome"
        Icon={() => (
          <img
            className="rounded-full h-7"
            src="https://links.papareact.com/5me"
            alt=""
          />
        )}
      />

      <BarButton name="Groups" Icon={UserGroupIcon} />
    </div>
  );
}

export default LeftBar;

function BarButton({ name, Icon }) {
  return (
    <button
      className="hover:bg-gray-200 p-3 w-full text-start flex space-x-2
    rounded-lg ml-2 items-center transition-color duration-500 ease-out"
    >
      <Icon className="h-7" />
      <p>{name}</p>
    </button>
  );
}
