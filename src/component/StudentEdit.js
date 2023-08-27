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

function StudentEdit({ setModalOpen, campName, rowSelectionModel }) {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        if (rowSelectionModel.length === 1) {
            const selectedId = rowSelectionModel[0];
            axios
                .get(`/student/${selectedId}`)
                .then((response) => {
                    const selectedStudent = response.data;
                    setName(selectedStudent.name);
                    setStudentId(selectedStudent.studentId);
                    setDepartment(selectedStudent.department);
                })
                .catch((error) => {
                    console.error("Error fetching student data:", error);
                });
        }
    }, [rowSelectionModel]);

    const handleSave = async () => {
        await save();
        setModalOpen(false);
    };

    async function save() {
        try {
            await axios.patch(`/student/${rowSelectionModel}`, {
                name: name,
                studentId: studentId,
                department: department,
                campName: campName,
            });

            alert("학생 정보 수정이 완료되었습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating student data:", error);
            alert("학생 정보 수정 중 오류가 발생했습니다.");
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
            <DialogTitle>학생 정보 수정</DialogTitle>
            <DialogContent>
                <Typography>이름</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>학번</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)}
                    sx={{ marginBottom: "10px" }}
                />
                <Typography>학과</Typography>
                <Input
                    color="neutral"
                    size="md"
                    variant="outlined"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
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

export default StudentEdit;
