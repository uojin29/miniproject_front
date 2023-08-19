import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
// import '../styles/Detail.css';


function MainPage() {
    const navigate = useNavigate();

    function moveCamp(camp) {
        navigate(`/${camp}`);
    }
    return (
        <div>
            {/*<Link to="/A">*/}
                <Button onClick={() => moveCamp("A")}>2023-1 A camp</Button>
            {/*</Link>*/}
            {/*<Link to="/B">*/}
                <Button onClick={() => moveCamp("B")}>2023-1 B camp</Button>
            {/*</Link>*/}
        </div>
    );
}

export default MainPage;
