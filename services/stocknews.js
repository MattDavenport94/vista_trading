import apisauce from 'apisauce'
import config from './config'
import { articles_url, section, items, token } from '../config/rest_config'

export async function getArticles() {

    try {
        let articles = await fetch(`${articles_url}?section=${section}&items=${items}`, {
            headers: {
                'TOKEN': token
            }
        });

        let result = await articles.json();
        articles = null;

        return result.data;
    }
}