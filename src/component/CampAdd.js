import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

function CampAdd({ setModalOpen }) {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [campName, setCampName] = useState("");
    const [fee, setFee] = useState("");
    const [profName, setProfName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    const handleSave = async (event) => {
        event.preventDefault();
        await save();
        setModalOpen(false);
    };

    async function save() {
        try {
            await axios.post(`/camp`, {
                campName: campName,
                fee: fee,
                profName: profName,
                startDate: startDate,
                finishDate: finishDate,
            });

            alert("새로운 캠프가 추가되었습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error adding new camp:", error);
            alert("새로운 캠프 추가 중 오류가 발생했습니다.");
        }
    }

    return (
        <Dialog open={true}
                onClose={closeModal}
                PaperProps={{
                    style: {
                        width: "350px",
                        maxWidth: "100%",
                    },
                }}>
            <DialogTitle>새로운 캠프 추가</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSave}>
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="campName"
                        placeholder="캠프 이름"
                        onChange={(event) => setCampName(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="fee"
                        placeholder="등록비"
                        onChange={(event) => setFee(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="profName"
                        placeholder="담당 교수님"
                        onChange={(event) => setProfName(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="startDate"
                        placeholder="시작일"
                        onChange={(event) => setStartDate(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="finishDate"
                        placeholder="마감일"
                        onChange={(event) => setFinishDate(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button size="small"
                        onClick={handleSave}
                        sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}>
                    저장하기
                </Button>
                <Button size="small"
                        onClick={closeModal}
                        sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}>
                    취소
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CampAdd;
