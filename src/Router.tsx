import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  JavascriptPage,
  JSAsync,
  JSCallback,
  JSFunctions,
  JSObjects,
  JSPromises,
} from "./javascript";
import ReduxCount from "./redux/reduxCount";
import { Flexbox } from "./cssExamples/flexbox";
import { HTML } from "./html";

const routerJS = [
  {
    path: "",
    element: <JSObjects />,
  },
  {
    path: "objects",
    element: <JSObjects />,
  },
  {
    path: "async",
    element: <JSAsync />,
  },
  {
    path: "callback",
    element: <JSCallback />,
  },
  {
    path: "promise",
    element: <JSPromises />,
  },
  {
    path: "functions",
    element: <JSFunctions />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "javascript",
        element: <JavascriptPage />,
        children: routerJS,
      },
      {
        path: "redux",
        element: <ReduxCount />,
      },
      {
        path: "react",
        element: <JSFunctions />,
      },
      {
        path: "css",
        element: <Flexbox />,
      },
      {
        path: "html",
        element: <HTML />,
      },
    ],
  },
]);
