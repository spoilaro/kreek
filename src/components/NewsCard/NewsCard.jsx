import "./newsCard.css";
import axios from "axios";
import {XMLParser} from "fast-xml-parser"
const func = async() => {
    let newsList = [];
    const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-35138",
        {
            responseType: "buffer",
            resolveBodyOnly: true,
            timeOut: 5000,
            retry: 5,
        }
    );

    const parser = new XMLParser();
    let jObj = await parser.parse(res.data);

    const items = jObj.rss.channel.item;
    

    items.forEach((elem) => {
        const category_list = elem.category;
        if (category_list.includes("koronavirus")) {
            newsList.push(elem);
        }
    });
    
    return newsList;
}
export default function NewsCard() {
    let newsList = async() => {await func()};
    console.log(newsList[0])
    const test = {title: "asdf"}
    return (
        <div className='newsCard'>
            <h1>Uutiset</h1>
            <ul className='list'>
                
                    
            
            </ul>
        </div>
    )
}
