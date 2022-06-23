import axios from "axios";
import createLogger from "../utils/logger";
import headers from "../utils/headers";

const Logger = createLogger("EventTrigger");
const URL = "https://ais.usvisa-info.com/es-co/niv/schedule/32089721/appointment/days/25.json?appointments[expedite]=false";

const getAppointments = async () => {
    Logger.info("Retrieving available dates from ais.usvisa-info.com");
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