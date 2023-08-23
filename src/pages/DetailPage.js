import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import '../styles/Detail.css';
import { useParams } from "react-router-dom";
import {renderToString} from "react-dom/server";
import {PDFDownloadLink} from '@react-pdf/renderer'
import myFont from '../fonts/NanumMyeongjo.otf';
import Pdf from "./Pdf";
import axios from "axios";

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
    { field: 'name', headerName: '이름'},
    { field: 'studentId', headerName: '학번'},
    { field: 'department', headerName: '학부'},
    { field: 'campName', headerName: '캠프이름' },
    { field: 'startDate', headerName: '시작일'},
    { field: 'finishDate', headerName: '마감일' },
    {
        field: "pdfView",
        headerName: "pdf 미리보기",
        sortable: false,
        width: 150,
        renderCell: (params) => (
            <Button
                variant="outlined"
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

function DetailPage() {
    const { camp } = useParams();
    const [filteredRows, setFilteredRows] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/camp/${camp}`);
                console.log("Response data:", response.data);
                const data = response.data;
                setFilteredRows(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [camp]);

    async function deleteMenu(ids) {
        try {
            for (const id of ids) {
                console.log("id: ", id);
                await axios.delete(`http://localhost:8080/camp/${id}`);
            }
            alert("선택한 메뉴를 삭제하셨습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting menu:", error);
            alert("메뉴 삭제 중 오류가 발생했습니다.");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '70%', marginTop: '100px' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    checkboxSelection
                    className="custom-data-grid"
                    hideFooter
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                        console.log("select row: ", newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </div>
            <div style={{justifyContent: 'flex-end'}}>
                <Button
                    variant="outlined"
                    sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                >
                    수정
                </Button>
                <Button
                    variant="outlined"
                    sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                    onClick={() => deleteMenu([...rowSelectionModel])}
                >
                    삭제
                </Button>
            </div>
        </div>
    );
}

export default DetailPage;
