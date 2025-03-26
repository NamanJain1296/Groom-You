import React ,{useState, useEffect} from "react";
import { displayClients } from "../services/user";
import axios from "axios";

function AllClients(){
    const [clients, setClients] = useState([])
    const fetchClients = async()=>{
        try{
            const response = await displayClients();
            setClients(response.data);
        }catch(error){
            console.error("Error fetching clients:", error.message);
        }
    };
    useEffect(()=>{
        fetchClients();
    },[]);

    const blockClient = async (clientId) =>{
        try{
            await axios.put('');
            fetchClients();
        }catch(error){
            console.error('Error blocking client:', error.message);
        }
    };

    const removeClient = async (clientId) => {
        try {
          await axios.delete(`/api/clients/${clientId}`); // Replace with your actual API endpoint
          fetchClients(); // Refresh client data after removing
        } catch (error) {
          console.error('Error removing client:', error.message);
        }
    };

    return(
        <center>
            <h2>Clients</h2>
            <ul>
                {clients.map((client) =>(
                    <li key={client._id}>
                        <p>Email: {client.email}</p>
                        <button onClick={() => blockClient(client._id)}>Block</button>
                        <button onClick={() => removeClient(client._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </center>
    )
}

export default AllClients;