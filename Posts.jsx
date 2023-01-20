import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState();

  console.log("HELLO");

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log("posts:", posts);

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          image={post.data().image}
          text={post.data().text}
          timeStamp={post.data().timeStamp}
          userImg={post.data().userImg}
          userName={post.data().userName}
        />
      ))}
    </>
  );
}

export default Posts;
