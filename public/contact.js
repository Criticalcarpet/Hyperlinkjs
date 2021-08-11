import { render, source } from 'https://unpkg.com/@lcf.vs/dom-engine/lib/frontend.js'

const section = {
  [source]: `
  <section>
  <img src={image} width="100%"></img>
    <h1>{site}</h1>
    <p>{title}</p>
    <p>{description}</p>
  </section>
  `
}

const links = document.getElementsByTagName("a");
const card = document.querySelector(".card");

const onMouseOver = async ({ currentTarget }) => {
  onMouseOut({ currentTarget })
  
  const { href } = currentTarget;
  const url = new URL("/api", document.location);

  url.searchParams.set("href", href);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  
  const { title: { og } } = await response.json();
  const { site_name: site, title, description, image } = og

  card.append(render({
    ...section,
    site,
    title,
    description,
    image,
  }))
};

const onMouseOut = ({ currentTarget }) => {
  card.querySelector('section')?.remove()
}

for (const link of links) {
  link.addEventListener("mouseover", onMouseOver, { passive: true });
  link.addEventListener("mouseout", onMouseOut, { passive: true });
}
