import createLogger from "./utils/logger";
import delay from "./utils/delay";
import { getAppointments } from "./managers/appointment.manager";

const Logger = createLogger("EventTrigger");
const CURRENT_SELECTED_DATE = new Date('2023-01-11');

const checkDates = async (dates: any[]) => {
    dates.forEach(date => {
        const newDate = new Date(date.date);
        
        if (newDate < CURRENT_SELECTED_DATE) {
            Logger.log(`🚨 🚨 🚨  Appointments available: ${date.date}  🚨 🚨 🚨`);
        }
    });

    Logger.warn("Not maches. Looking for new appointments...");
    const waitSeconds = (Math.random() * (10 - 5) + 5) * 1000;
    await delay(getDates, Math.floor(waitSeconds));
}

const getDates = async () => {
    try {
        const dates = await getAppointments();
        Logger.log(`${dates.length} appointment availables...`);
        checkDates(dates);
    } catch(e: any) {
        Logger.error(`${e.message}: ${e.code}`);
        return;
    }
}

getDates();