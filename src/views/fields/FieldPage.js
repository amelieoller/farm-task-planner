import React, { useState, useCallback } from "react";
import { FirestoreCollection } from "react-firestore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Error from "../misc/Error";
import FirebaseAuth from "../misc/FirebaseAuth";
import { InternalLink } from "../../styles/links";
import { Page } from "../../styles/layout";
import Task from "./Task";
import Field from "./Field";

const FieldPage = ({ match }) => {
  return (
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

              <DndProvider backend={HTML5Backend}>
                <Field field={field} />
              </DndProvider>

              <FirebaseAuth>
                {({ auth }) =>
                  auth ? (
                    <InternalLink to={`/${field.slug}/edit`}>
                      Edit Field
                    </InternalLink>
                  ) : null
                }
              </FirebaseAuth>
            </div>
          );
        }}
      </FirestoreCollection>
    </Page>
  );
};

export default FieldPage;
