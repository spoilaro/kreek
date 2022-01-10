import "./newsCard.css";
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
    <li key={key}>{`Title: ${elem.title} and link: ${elem.link}`}</li>
  ));

  return (
    <div className="newsCard">
      <h1>Uutiset</h1>
      <ul className="list">{listArticles}</ul>
    </div>
  );
}
