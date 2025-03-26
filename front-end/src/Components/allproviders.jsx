import React, {useState, useEffect} from "react";
import rstyle from "./comp2.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AllProviders(){
    return(
        <div>
            <h1>All Providers</h1>
        </div>
    )
}

export default AllProviders;