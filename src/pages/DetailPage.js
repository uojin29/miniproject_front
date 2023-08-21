import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import '../styles/Detail.css';
import { useParams } from "react-router-dom";
import {renderToString} from "react-dom/server";
import {PDFDownloadLink} from '@react-pdf/renderer'
import myFont from '../fonts/NanumMyeongjo.otf';

import Pdf from "./Pdf";

const handlePdfView = (name, studentId, department, campName, startDate, finishDate) => {
    console.log("View PDF:", name);

    const pdfBlob = <Pdf
        name={name}
        studentId={studentId}
        department={department}
        campName={campName}
        startDate={startDate}
        finishDate={finishDate}
    />;

    const pdfContent = renderToString(pdfBlob);

    const newWindow = window.open("", name);
    newWindow.document.write(pdfContent);
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
        renderCell: (params) => (
            <Button
                variant="outlined"
                // onClick={handlePdfView}
                onClick={() => handlePdfView(params.row.name, params.row.studentId, params.row.department, params.row.campName, params.row.startDate, params.row.finishDate)}
                sx={{ color: 'lightgrey', border: 'none', background: 'grey' }}
            >
                PDF 미리보기
            </Button>
        ),
    },
    {
        field: "pdfDownload",
        headerName: "pdf 다운로드",
        sortable: false,
        width: 150,
        renderCell: (params) => (
            <PDFDownloadLink
                document={<Pdf name={params.row.name}
                               studentId={params.row.studentId}
                               department={params.row.department}
                               campName={params.row.campName}
                               startDate={params.row.startDate}
                               finishDate={params.row.finishDate}
                               font={myFont}/>}
                fileName={`${params.row.campName}_${params.row.studentId}_${params.row.name}.pdf`}
            >
                {({ loading }) => (
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'lightgrey',
                            border: 'none',
                            background: 'grey',
                            '&:hover': {
                                background: 'darkgrey', // 변경 가능한 부분
                            },
                        }}
                    >
                        {loading ? '로딩 중...' : 'PDF 다운로드'}
                    </Button>
                )}
            </PDFDownloadLink>
        ),
    },
];
columns.forEach(column => {
    column.align = 'center';
    column.headerAlign = 'center';
});
const originalRows = [
    { id: 1, name: 'JangYujin', studentId: 22000000, department: '전산전자공학부', campName: 'A', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 2, name: 'Choi', studentId: 22000001, department: '기계제어공학부', campName: 'A', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 3, name: 'Im', studentId: 22000002, department: '콘텐츠융합디자인학부', campName: 'B', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 4, name: 'Chae', studentId: 22000003, department: '창의융합교육원', campName: 'B', startDate: '2023-08-09', finishDate: '2023-09-09'},
    { id: 5, name: 'Son', studentId: 22000004, department: '전산전자공학부', campName: 'B', startDate: '2023-08-09', finishDate: '2023-09-09'},
];

function DetailPage() {
    const { camp } = useParams();
    const filteredRows = originalRows.filter(row => row.campName === camp);

    return (
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: '100%', marginTop: '100px'}}>
                <DataGrid
                    rows={filteredRows} // 필터링된 rows 사용
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

export default DetailPage;
