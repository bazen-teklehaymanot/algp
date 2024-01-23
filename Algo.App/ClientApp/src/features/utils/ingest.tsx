import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { generateCompanies } from "../companies/company-service";
import { addCompanies } from "../companies/company-slice";


export function usePeriodicIngest() {
    const [timer, setTimer] = useState<NodeJS.Timer>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        periodicIngest();
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, []);

    const interval_mins = 5 * 60;
    const batch_size = 10;

    function periodicIngest() {
        const interval = setInterval(() => {
            const companies = generateCompanies(batch_size);
            dispatch(addCompanies(companies));
        }, interval_mins * 1000);

        setTimer(interval);
    }
}