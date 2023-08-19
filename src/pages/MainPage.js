import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import '../styles/MainPage.css';

const handlePdfView = (pdfName) => {
    console.log("View PDF:", pdfName);
};

const handlePdfDownload = (pdfName) => {
    console.log("Downloading PDF:", pdfName);
};

const columns = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'studentId', headerName: '학번', width: 150 },
    { field: 'department', headerName: '학부', width: 150 },
    { field: 'campName', headerName: '캠프이름', width: 150 },
    { field: 'startDate', headerName: '시작일', width: 150 },
    { field: 'finishDate', headerName: '마감일', width: 150 },
    {
        field: "pdfView",
        headerName: "pdf 미리보기",
        sortable: false,
        width: 150,
        renderCell: (params) => {
            return (
                <Button
                    variant="outlined"
                    onClick={() => handlePdfView(params.row.name)}
                    sx={{color: 'lightgrey', border: 'none', background: 'grey'}}
                >
                    PDF 미리보기
                </Button>
            );
        },
    },
    {
        field: "pdfDownload",
        headerName: "pdf 다운로드",
        sortable: false,
        width: 150,
        renderCell: (params) => {
            return (
                <Button
                    variant="outlined"
                    onClick={() => handlePdfDownload(params.row.name)}
                    sx={{color: 'lightgrey', border: 'none', background: 'grey'}}
                >
                   PDF 다운로드
                </Button>
            );
        },
    },
];
columns.forEach(column => {
    column.align = 'center';
    column.headerAlign = 'center';
});
const rows = [
    { id: 1, name: 'JangYujin', studentId: 22000000, department: '전산전자공학부', campName: 'A캠프', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 2, name: 'Choi', studentId: 22000001, department: '기계제어공학부', campName: 'A캠프', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 3, name: 'Im', studentId: 22000002, department: '콘텐츠융합디자인학부', campName: 'B캠프', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 4, name: 'Chae', studentId: 22000003, department: '창의융합교육원', campName: 'B캠프', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 5, name: 'Son', studentId: 22000004, department: '전산전자공학부', campName: 'B캠프', startDate: '2023-08-09', finishDate: '2023-09-09'},
];

function MainPage() {
    return (
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: '100%', marginTop: '100px'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    className="custom-data-grid"
                    hideFooter
                />
            </div>
            <Button
                variant="outlined"
                sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
            >
                수정
            </Button>
        </div>
    );
}

export default MainPage;