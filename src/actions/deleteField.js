import Firebase from "firebase/app";
import ReactGA from "react-ga";

const deleteField = (field) => {
  ReactGA.event({
    category: "Field",
    action: "Delete field",
  });

  return Firebase.firestore()
    .collection("fields")
    .doc(field.id)
    .delete()
    .catch((error) => {
      alert(`Whoops, couldn't delete the field: ${error.message}`);
    });
};

export default deleteField;
