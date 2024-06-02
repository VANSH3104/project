import { useState , useEffect} from "react";
import axios from "axios";
export function Balance(){
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                });
                setBalance(response.data.balance); 
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, [balance]);
    return <div className="flex h-6 pt-7 pl-8">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-normal ml-4 text-lg">
            Rs {parseFloat(balance).toFixed(3)}
        </div>
    </div>
}