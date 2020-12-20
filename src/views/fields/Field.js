import React from "react";
import { FirestoreCollection } from "react-firestore";

import Error from "../misc/Error";
import FirebaseAuth from "../misc/FirebaseAuth";
import LikeButton from "./LikeButton";
import { InternalLink } from "../../styles/links";
import { Page } from "../../styles/layout";

const Field = ({ match }) => (
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
            <h1>{field.title}</h1>
            other stuff
            <FirebaseAuth>
              {({ auth }) =>
                auth ? (
                  <InternalLink to={`/${field.slug}/edit`}>Edit</InternalLink>
                ) : null
              }
            </FirebaseAuth>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default Field;
