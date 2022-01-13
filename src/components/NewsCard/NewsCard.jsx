import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useState, useEffect } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export default function NewsCard(props) {
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
              parsed_items.push({ title: elem.title, link: elem.guid, date: new Date(elem.pubDate) });
            }
          });
          setArticles(parsed_items);
        });
    };
    loadArticles();
    //console.log(articles);
  }, []);

  const listArticles = articles.map((elem, key) => 
  {
    let actualdate = <h5/>
    if (key != 0 && articles[key].date.toLocaleDateString("fi-FI") != articles[key-1].date.toLocaleDateString("fi-FI")){
        actualdate = <h5>{elem.date.toLocaleDateString("fi-FI")}</h5>
    } else if (key == 0){
      actualdate = <h5>{elem.date.toLocaleDateString("fi-FI")}</h5>
    }
    return(
    <div>
      {actualdate}
        <a className="news-link" href={elem.link}>
          <li className="news-item" key={key}>
            <h4 className="news-header">{elem.title}</h4>
          </li>
        </a>
    </div>
  );})

  return (
    <div className="newsBox" style={props.styleObj}>
      <h1>Yle Uutiset</h1>
      <div className="newsCard">
        <ul className="news-list">{listArticles}</ul>
      </div>
    </div>
  );
}
