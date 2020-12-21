import Markdown from "markdown-to-jsx";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Leafletmap"), { ssr: false });

export async function getStaticProps() {
  let article = await axios
    .get("http://localhost:1337/articles/1")
    .then((res) => res.data);
  return {
    props: {
      article,
    },
  };
}

function Coords({ children }) {
  const [title, lat, lng] = children.map((e) => e.props.children[0]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Map title={title} coords={[lat, lng]} />
      </div>
    </div>
  );
}

export default function Home({ article }) {
  return (
    <main style={{ padding: "2%" }}>
      <h1>{article.title}</h1>
      <Markdown
        options={{
          overrides: {
            coords: {
              component: Coords,
            },
          },
        }}
      >
        {article.body}
      </Markdown>
    </main>
  );
}
