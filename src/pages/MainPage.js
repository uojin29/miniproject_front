import React, { useState } from "react";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";


function MainPage() {
    const navigate = useNavigate();

    function moveCamp(camp) {
        navigate(`/camp/${camp}`);
    }
    return (
        <div>
            <Button onClick={() => moveCamp("A")}>2023-1 A camp</Button>
            <Button onClick={() => moveCamp("B")}>2023-1 B camp</Button>
        </div>
    );
}

export default MainPage;
