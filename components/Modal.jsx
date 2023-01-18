import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef, useState } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function Modal() {
  const { isOpen, closeModal } = useContext(ModalContext);
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const firstName = session.user.name.split(" ")[0];
  const textRef = useRef(null);
  const filePickerRef = useRef(null);

  const uploadPost = async () => {
    // Create a post and add to the firestore 'posts' collection
    const docRef = await addDoc(collection(db, "posts"), {
      userName: session.user.name,
      userImg: session.user.image,
      text: textRef.current.value,
      timeStamp: serverTimestamp(),
    });

    console.log("\t### Modal -- uploadPost ###\nDOC ADDED WITH ID:", docRef.id);

    const imageRef = ref(storage, `posts/$docRef.id}/image`);

    await uploadString(imageRef, selectedImage, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setSelectedImage(null);

    console.log(
      "\t### Modal -- uploadPost ###\nIMAGE ADDED TO DOC, WITH ID:",
      docRef.id
    );

    closeModal;
  };

  const getImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed z-20 inset-0 bg-gray-200 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="flex flex-col max-w-lg 
                  transform overflow-hidden rounded-lg w-full
                bg-white shadow-2xl transition-all"
                >
                  {/** ### CONTENT ### */}
                  <div className="items-center">
                    {/** Header */}
                    <div className="flex items-center justify-center border-b p-4 relative">
                      <h1 className="flex-1 font-bold text-2xl">Create post</h1>
                      <button
                        className="rounded-full bg-gray-300 p-1 hover:bg-gray-400 active:scale-90"
                        onClick={closeModal}
                      >
                        <XIcon className="h-7 text-gray-600" />
                      </button>
                    </div>

                    {/** User */}
                    <div className="flex p-3">
                      <img
                        className="rounded-full h-12 mr-2"
                        src={session.user.image}
                        alt=""
                      />
                      <h1 className="font-bold">{session.user.name}</h1>
                    </div>

                    {/** Text Area */}
                    <textarea
                      className="text-2xl font-medium p-3 outline-none"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder={`What's on your mind, ${firstName}?`}
                      ref={textRef}
                    ></textarea>

                    {/** Add Image Button */}
                    <button
                      className="shadow-sm border rounded-md px-4 py-3 font-bold max-w-md w-full items-center mb-4"
                      onClick={() => filePickerRef.current.click()}
                    >
                      Add an image to your post
                    </button>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={getImage}
                    />

                    {/** Post Button*/}
                    <button
                      className="border rounded-md px-4 py-3 font-bold max-w-md w-full items-center"
                      onClick={uploadPost}
                    >
                      Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
