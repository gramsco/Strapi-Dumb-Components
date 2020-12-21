# POC: Simple(r) Components for Strapi
(TLDR available below)

![Strapi on the left, Next on the right](/fullpoc.png?raw=true)


[Strapi](https://strapi.io/) is a great, highly customizable headless CMS.

I use it on various projects. One of the features I found can be powerful but also tricky are the "Components" and "Dynamic Zones" ([see](https://strapi.io/blog/release-beta-18-dynamic-zones)).

Don't get me wrong, Strapi components ***are*** great. Especially for non-developers. In a current project, we're handling historical dates for specific locations. The historian I'm working with was able to easily add dates to build a decent chronology that I could fetch in the project (using NextJS).

The model of the component was pretty simple: 

- A title (string)
- A description (string)
- A historical date (string)

![Two instances of the same Strapi Component](/chronology.png?raw=true)

But if you're prototyping, it can easily be a mess. What if you want to change the type of the inputs really quick? 

You'd have to:

- launch a local strapi server
- edit the content file
- check it works with curl/postman, etc.
- push your changes
- wait for the server to restart

Whereas, with a little hack, you can just do:

```html
<date>
 <title>
    Canut revolts
</title>
 <description>
    Decreased wages made Lyon bois pretty angry
</description>
 <historicaldate>
    1831, 1834, 1848
 </historicaldate>
</date>
```

Or, as in this repo:

```html
<coords>
    <title>Easter Island</title>
    <lat>-27.104671</lat>
    <lng>-109.360481</lng>
</coords>
```

This one makes a map appear : *Magic* ! (and Leaflet) 

## (TLDR) How it works

You have to install a jsx parser, I need to test others but it works niiiiceely with [mardown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) at least. (And again, this is for now just a sort of POC).

so:

```javascript
npm i markdown-to-jsx
```

Define a coords component that will extract what you want (the children : title, lat, lng) from a specific custom tag. 

```javascript
import Map from './Map'

function Coords({ children }) {
 
  const [title, lat, lng] = children.map((e) => e.props.children[0]);

  return (
    <div className="whatever">

        <!-- Whatever map component -->
        <Map title={title} coords={[lat, lng]} />
    </div>
  );
}
```

... that you have to put in your Markdown-to-jsx provider

```javascript
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
        <!-- The MD body of the article -->
        {article.body}
      </Markdown>
    </main>
  );
}
```

and VOILÀ!

Please note that this is not optimized yet as the main goal of the repo was just a POC that you can create custom components on the fly in Markdown with Strapi.
