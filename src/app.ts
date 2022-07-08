import createLogger from "./utils/logger";
import delay from "./utils/delay";
import { getAppointments, getTimes } from "./managers/appointment.manager";

const Logger = createLogger("EventTrigger");
const CURRENT_SELECTED_DATE = new Date('2023-01-18');

const checkDates = async (dates: {
    date: string
}[]) => {

    for (let index = 0; index < dates.length; index++) {
        const date = dates[index];
        const newDate = new Date(date.date);
        
        if (newDate < CURRENT_SELECTED_DATE) {
            Logger.log(`🚨 🚨 🚨  Appointment available: ${date.date}  🚨 🚨 🚨`);
            const availableTimes = await getTimes(date.date);
            Logger.log(availableTimes);
            return;
        }
        
    }
    
    Logger.warn("No matches. Looking for new appointments...");
    const waitSeconds = (Math.random() * (20 - 10) + 10) * 1000;
    await delay(getDates, Math.floor(waitSeconds));
}

const getDates = async () => {
    try {
        const dates = await getAppointments();
        Logger.log(`${dates.length} appointment availables...`);
        
        checkDates(dates);

    } catch(e: any) {
        Logger.error(`${e.message}: ${e.code}`);

        if (e.code === 429) {
            console.log('\x1b[36m%s\x1b[0m', 'Waiting for 5 minutes before starting again...');
            await delay(getDates, 300000);
        }
    }
}

getDates();
