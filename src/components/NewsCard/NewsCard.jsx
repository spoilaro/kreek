import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useState, useEffect } from "react";

export default function NewsCard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const parser = new XMLParser();

      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-35138",
          { headers: { Accept: "application/json" } }
        )
        .then((res) => parser.parse(res.data))
        .then((data) => {
          const parsed_items = [];
          const items = data.rss.channel.item;
          items.forEach((elem) => {
            //elem.category.includes("koronavirus");
            if (elem.category.includes("koronavirus")) {
              parsed_items.push({ title: elem.title, link: elem.guid });
            }
          });
          setArticles(parsed_items);
        });
    };
    loadArticles();
    //console.log(articles);
  }, []);

  const listArticles = articles.map((elem, key) => (
    <li className="news-item" key={key}>
      <h4 className="news-header">{elem.title}</h4>
      <a className="news-link" href={elem.link}>
        Avaa uutinen
      </a>
    </li>
  ));

  return (
    <div className="newsCard">
      <h1>Uutiset</h1>
      <ul className="news-list">{listArticles}</ul>
    </div>
  );
}
