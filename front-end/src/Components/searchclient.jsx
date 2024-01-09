import React, {useState, useEffect} from "react";
import { dataProv2, distinctCategories2, distinctCities2 } from "../services/user";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import rstyle from "./comp2.module.css";

function SearchCl(){
    const [jsonCate, setCategories] = useState([]);
    const [jsonCity, setCities] = useState([]);
    const [selCat, setSelCat] = useState("");
    const [selCity, setSelCity] = useState("");
    const [client, setClient] = useState([]);
 
    useEffect(() => {
        console.log("Use Effect Called");
        doFetchCategories();
        doFetchCities();
       },[]);

    const doFetchCategories = async() =>{
        try {
            const res = await distinctCategories2();
            setCategories(res.data.user);
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert("Error fetching categories");
        }
    };

    const doFetchCities = async() =>{
        try {
            const res = await distinctCities2();
            setCities(res.data.user);
        } catch (error) {
            console.error("Error fetching cities:", error);
            alert("Error fetching cities");
        }
    }

    const handleSearch = async () => {
        if(selCat === ""|| selCity === ""){
            alert("Please select all the fields");
        }else{
            try{
                const res = await dataProv2({cat: selCat, loc: selCity});
                setClient(res.data);
            }catch(error){
                console.error("Error fetching service providers:",error);
                alert("Error fetching service providers");
            }
        }
      };
    return(
        <Container>
        <div className={rstyle.container}>
            <center>
                <h2>Find Your Client</h2>
            </center>
            <Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Label>Category</Form.Label>
                        <select 
                        name="cat" 
                        id="cat" 
                        value={selCat}
                        className="form-control"
                        onChange={(e)=>setSelCat(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {jsonCate.map((str) => (
                                <option key={str} value={str}>
                                    {str}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col md={6}>
                        <Form.Label>City</Form.Label>
                        <select 
                        name="loc" 
                        id="loc"
                        value={selCity}
                        className="form-control"
                        onChange={(e)=>setSelCity(e.target.value)}
                        >
                            <option value="">Select City</option>
                            {jsonCity.map((str) => (
                                <option key={str} value={str}>
                                    {str}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <div className="text-center">
                <button onClick={handleSearch} className={rstyle.ib} style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#5dfa5d', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>Search</button>
                </div>
            </Form.Group>

            {/* Display the cards of providers */}
            {client.length > 0 && (
                <Row>
                {client.map((cl) => (
                    <Col key={cl.id} md={4}>
                        <Card>
                            <Card.Body>
                                <center><Card.Img src="images/add-user.png" style={{maxWidth:'150px', border: '0.5px solid', borderRadius:'50%'}}/></center>
                                <br></br>
                                <Card.Title>{cl.email}</Card.Title>
                                <Card.Text style={{ fontSize: '1.1rem', color: '#666', }}>Contact Number: {cl.mobile}</Card.Text>
                                <Card.Text style={{ fontSize: '1.1rem', color: '#666', }}>Location: {cl.loc}</Card.Text>
                                <Card.Text style={{ fontSize: '1.1rem', color: '#666', }}>Problem: {cl.task}</Card.Text>
                                <Card.Text style={{ fontSize: '1.1rem', color: '#666', }}>Want Service By-Date: {cl.utd}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            )}
        </div>
    </Container>
    );
}

export default SearchCl;