import axios from "axios";
import createLogger from "../utils/logger";
import headers from "../utils/headers";

const Logger = createLogger("EventTrigger");
const URL = "https://ais.usvisa-info.com/es-co/niv/schedule/32089721/appointment/days/25.json?appointments[expedite]=false";

const MAX_COUNTER = 10;
let counter = 0;

const getAppointments = async () => {
    counter += 1;
        
    if (counter > MAX_COUNTER) {
        throw {
            message: 'Try it again in a few minutes',
            code: "😢",
        };
    } else {
        Logger.info(`[${counter}] - Retrieving available dates from ais.usvisa-info.com`);
    }

    try {
        const { data } = await axios.get(URL, {
            headers,
        });
        return data;
    } catch(e) {
       throw e;
    }
}
export {
    getAppointments
}