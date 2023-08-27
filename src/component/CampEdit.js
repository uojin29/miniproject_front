import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";

function CampEdit({ setModalOpen, selectedCamp }) {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [campName, setCampName] = useState("");
    const [fee, setFee] = useState("");
    const [profName, setProfName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    useEffect(() => {
        if (selectedCamp) {
            axios
                .get(`/camp/${selectedCamp}`)
                .then((response) => {
                    const selectedCampData = response.data;
                    setCampName(selectedCampData.campName);
                    setFee(selectedCampData.fee);
                    setProfName(selectedCampData.profName);
                    setStartDate(selectedCampData.startDate);
                    setFinishDate(selectedCampData.finishDate);
                })
                .catch((error) => {
                    console.error("Error fetching camp data:", error);
                });
        }
    }, [selectedCamp]);

    const handleSave = async () => {
        await save();
        setModalOpen(false);
    };

    async function save() {
        try {
            await axios.patch(`/camp/${selectedCamp}`, {
                campName: campName,
                fee: fee,
                profName: profName,
                startDate: startDate,
                finishDate: finishDate,
            });

            alert("캠프 정보 수정이 완료되었습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating camp data:", error);
            alert("캠프 정보 수정 중 오류가 발생했습니다.");
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
            <DialogTitle>캠프 정보 수정</DialogTitle>
            <DialogContent>
                <Typography>캠프 이름</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={campName}
                    onChange={(event) => setCampName(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>등록비</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={fee}
                    onChange={(event) => setFee(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>담당 교수</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={profName}
                    onChange={(event) => setProfName(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>시작일</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>종료일</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={finishDate}
                    onChange={(event) => setFinishDate(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
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

export default CampEdit;
