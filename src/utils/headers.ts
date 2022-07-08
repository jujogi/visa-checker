import dotenv from "dotenv";
dotenv.config();

const { COOKIE, TOKEN, USERID } = process.env;

export default {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,gl;q=0.7,fr;q=0.6',
    'Connection': 'keep-alive',
    'Cookie': `_yatri_session=${COOKIE}; path=/; HttpOnly; Secure; SameSite=None`,
    'Referer': `https://ais.usvisa-info.com/es-co/niv/schedule/${USERID}/appointment`,
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'X-CSRF-Token': `${TOKEN}`,
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}