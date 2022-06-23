import createLogger from "./utils/logger";
import delay from "./utils/delay";
import { getAppointments } from "./managers/appointment.manager";

const Logger = createLogger("EventTrigger");

const checkDates = async (dates: any[]) => {
    dates.forEach(date => {
        const newDate = new Date(date.date);
        const dateYear = newDate.getFullYear();
        
        if (dateYear < 2024) {
            Logger.log(`🚨 🚨 🚨  Appointments available: ${date.date}  🚨 🚨 🚨`);
            Logger.log(`📆  Month ${newDate.getMonth()}`);
        }
    });

    Logger.warn("Looking for new appointments...");
    await delay(getDates, 15000);

}

const getDates = async () => {
    try {
        const dates = await getAppointments();

        Logger.log(`${dates.length} appointment availables...`);
        Logger.info(dates);
        checkDates(dates);
    } catch(e: any) {
        Logger.error(`${e.message}: ${e.code}`);
        return;
    }
}

getDates();