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
  const [uploadingPost, setUploadingPost] = useState(false);

  const uploadPost = async () => {
    if (textRef.current.value === "") return;

    if (uploadingPost) return;

    setUploadingPost(true);

    // Add the post data to the "posts" collection in Firebase
    const docRef = await addDoc(collection(db, "posts"), {
      userName: session.user.name,
      userImg: session.user.image,
      userId: session.user.id,
      text: textRef.current.value,
      timeStamp: serverTimestamp(),
    });

    console.log("\t### Modal -- uploadPost ###\nDOC ADDED WITH ID:", docRef.id);

    const imageRef = ref(storage, `posts/$docRef.id}/image`);

    // Add the image to the post only if it is avaliable
    if (selectedImage) {
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        // Snapshot
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });

      console.log(
        "\t### Modal -- uploadPost ###\nIMAGE ADDED TO DOC, WITH ID:",
        docRef.id
      );
    }

    closeModal();
    setUploadingPost(false);
    setSelectedImage(null);
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
                {/** ### CONTENT ### */}
                <Dialog.Panel
                  className="flex flex-col max-w-lg p-4 
                  transform overflow-hidden rounded-lg w-full
                bg-white shadow-2xl transition-all items-center space-y-4"
                >
                  {/** Header */}
                  <h1 className="font-bold text-2xl">Create post</h1>
                  <button
                    className="absolute right-0 top-0 m-4 rounded-full bg-gray-300 p-1 hover:bg-gray-400 active:scale-90"
                    onClick={closeModal}
                  >
                    <XIcon className="h-7 text-gray-600" />
                  </button>
                  <div className="border-b w-screen" />

                  {/** User */}
                  <div className="flex w-full items-start px-4 max-w-md">
                    <img
                      className="rounded-full h-12 mr-2"
                      src={session.user.image}
                      alt=""
                    />
                    <h1 className="font-bold">{session.user.name}</h1>
                  </div>

                  {/** Text Area */}
                  <textarea
                    className={`text-2xl font-medium p-3 outline-none h-40 ${selectedImage && "h-15 w-full max-w-md"
                      }`}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder={`What's on your mind, ${firstName}?`}
                    ref={textRef}
                  ></textarea>

                  {selectedImage && (
                    <div className="rounded-lg border p-2 bg-white relative max-w-md w-full">
                      <img
                        className="rounded-lg object-contain"
                        src={selectedImage}
                        alt=""
                      />
                      <button
                        className="absolute right-0 top-0 rounded-full bg-gray-100 p-1 
                          hover:bg-gray-200 active:scale-90 m-4"
                        onClick={() => setSelectedImage(null)}
                      >
                        <XIcon className="h-5 text-gray-600" />
                      </button>
                    </div>
                  )}

                  {/** Add Image Button */}
                  <button
                    className="shadow-sm border rounded-md px-4 py-3 font-bold max-w-md w-full items-center"
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
                    className={
                      "rounded-md px-4 py-3 font-bold max-w-md w-full items-center " +
                      "bg-blue-600 cursor-pointer text-white " +
                      "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                    }
                    onClick={uploadPost}
                    disabled={uploadingPost}
                  >
                    {uploadingPost ? "Uploading Post" : "Post"}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
