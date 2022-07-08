import axios from "axios";
import dotenv from "dotenv";
import createLogger from "../utils/logger";
import headers from "../utils/headers";

dotenv.config();

const { USERID } = process.env;

const Logger = createLogger("EventTrigger");

const APPOINTMENT_URL = `https://ais.usvisa-info.com/es-co/niv/schedule/${USERID}/appointment/days/25.json?appointments[expedite]=false`;

const getUrlForTimes = (date: string) => `https://ais.usvisa-info.com/es-co/niv/schedule/${USERID}/appointment/times/25.json?date=${date}&appointments[expedite]=false`;

const MAX_COUNTER = 10;
let counter = 0;

const getAppointments = async () => {
    counter += 1;

    if (counter > MAX_COUNTER) {
        counter = 0;
        throw {
            message: 'Try it again in a few minutes',
            code: 429,
        };
    } else {
        Logger.info(`[${counter}] - Retrieving available dates from ais.usvisa-info.com`);
    }

    try {
        const { data } = await axios.get(APPOINTMENT_URL, {
            headers,
        });
        return data;
    } catch(e) {
       throw e;
    }
}

const getTimes = async (date: string) => {
    try {
        const { data } = await axios.get(getUrlForTimes(date), {
            headers,
        });
        return data.available_times;
    } catch(e) {
       throw e;
    }
};

export {
    getAppointments,
    getTimes
}