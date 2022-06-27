import createLogger from "./utils/logger";
import delay from "./utils/delay";
import { getAppointments } from "./managers/appointment.manager";

const Logger = createLogger("EventTrigger");
const CURRENT_SELECTED_DATE = new Date('2024-02-14');

const checkDates = async (dates: any[]) => {
    dates.forEach(date => {
        const newDate = new Date(date.date);
        
        if (newDate < CURRENT_SELECTED_DATE) {
            Logger.log(`🚨 🚨 🚨  Appointments available: ${date.date}  🚨 🚨 🚨`);
        }
    });

    Logger.warn("Not maches. Looking for new appointments...");
    await delay(getDates, 15000);

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