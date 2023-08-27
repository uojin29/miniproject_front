import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function StudentAdd({ setModalOpen, campName }) {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [department, setDepartment] = useState("");

    const handleSave = async (event) => {
        event.preventDefault();
        await save();
        setModalOpen(false);
    };

    async function save() {
        try {
            await axios.post(`/student`, {
                name: name,
                studentId: studentId,
                department: department,
                campName: campName,
            });

            alert("새로운 학생이 추가되었습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error adding new student:", error);
            alert("새로운 학생 추가 중 오류가 발생했습니다.");
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
            <DialogTitle>새로운 학생 추가</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSave}>
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="name"
                        placeholder="이름"
                        onChange={(event) => setName(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="studentId"
                        placeholder="학번"
                        onChange={(event) => setStudentId(event.target.value)}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Input
                        color="neutral"
                        size="md"
                        variant="outlined"
                        name="department"
                        placeholder="학부"
                        onChange={(event) => setDepartment(event.target.value)}
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

export default StudentAdd;
