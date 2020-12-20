import React from "react";
import { FirestoreCollection } from "react-firestore";

import Error from "../misc/Error";
import deleteField from "../../actions/deleteField";
import updateField from "../../actions/updateField";
import FieldForm from "./FieldForm";
import { Page } from "../../styles/layout";

const FieldEdit = ({ match, history }) => (
  <Page>
    <FirestoreCollection
      path={"fields"}
      filter={["slug", "==", match.params.slug]}
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <Error />;
        }

        const field = data[0];

        return (
          <div>
            <FieldForm
              field={field}
              onSubmit={(values) =>
                updateField(field.id, values).then(() =>
                  history.push(`/${field.slug}`)
                )
              }
            />
            <br />
            <button
              onClick={() => deleteField(field).then(() => history.push(`/`))}
            >
              Delete field
            </button>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default FieldEdit;
