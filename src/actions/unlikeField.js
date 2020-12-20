import Firebase from "firebase/app";
import ReactGA from "react-ga";

const unlikeField = (userLike) => {
  ReactGA.event({
    category: "Field",
    action: "Unlike field",
  });

  return Firebase.firestore()
    .collection("fieldLikes")
    .doc(userLike.id)
    .delete();
};

export default unlikeField;
