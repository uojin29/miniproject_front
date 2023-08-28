import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import '../styles/Detail.css';
import '../styles/Button.css';
import {useLocation, useParams} from "react-router-dom";
import {PDFDownloadLink} from '@react-pdf/renderer'
import myFont from '../fonts/NotoSerifKR-Medium.otf';
import Pdf from "./Pdf";
import axios from "axios";
import StudentAdd from "../component/StudentAdd";
import StudentEdit from "../component/StudentEdit";
import Typography from "@mui/material/Typography";
import { PDFViewer } from '@react-pdf/renderer';

function DetailPage() {
    const { campName } = useParams();
    const [pdfVisible, setPdfVisible] = useState(false);
    const [pdfData, setPdfData] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const location = useLocation();
    const startDate = location.state.startDate;
    const finishDate = location.state.finishDate;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = currentDate.getDate();

    const columns = [
        { field: 'name', headerName: '이름'},
        { field: 'studentId', headerName: '학번'},
        { field: 'department', headerName: '학부'},
        { field: 'campName', headerName: '캠프이름'},
        {
            field: "pdfView",
            headerName: "수료증 미리보기",
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    onClick={() => handlePdfView(params.row.name, params.row.studentId, params.row.department, params.row.campName)}
                    sx={{
                        color: 'lightgrey',
                        border: 'none',
                        background: 'grey',
                        '&:hover': {
                            background: 'lightgrey',
                            border: 'none',
                            color: 'grey'// 변경 가능한 부분
                        },
                    }}
                >
                    수료증 미리보기
                </Button>
            ),
        },
        {
            field: "pdfDownload",
            headerName: "수료증 다운로드",
            sortable: false,
            renderCell: (params) => (
                <PDFDownloadLink
                    document={<Pdf name={params.row.name}
                                   studentId={params.row.studentId}
                                   department={params.row.department}
                                   campName={params.row.campName}
                                   startDate={startDate}
                                   finishDate={finishDate}
                                   font={myFont}
                                   year={year}
                                   month={month}
                                   day={day}/>}
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
                                    background: 'lightgrey',
                                    border: 'none',
                                    color: 'grey'// 변경 가능한 부분
                                },
                            }}
                            onClick={() => handleDownloadClick(params.row.campName, params.row.studentId, params.row.name)}
                        >
                            {loading ? '로딩 중...' : '수료증 다운로드'}
                        </Button>
                    )}
                </PDFDownloadLink>
            ),
        },
    ];
    columns.forEach(column => {
        column.align = 'center';
        column.headerAlign = 'center';
        column.flex = 1; // flex 속성 설정
    });


    const handlePdfView = (name, studentId, department, campName) => {
        console.log("View PDF:", name);

        setPdfVisible(true);
        const pdfData = {
            name: name,
            studentId: studentId,
            department: department,
            campName: campName,
            year: year,
            month: month,
            day: day,
        };
        setPdfData(pdfData);
    };

    const handleClosePdfView = () => {
        setPdfVisible(false);
    };

    const handleDownloadClick = (name, campName, studentId) => {
        const currentTime = new Date().toLocaleString();
        console.log(currentTime, name, campName, studentId, "다운로드 됨");
    };

    const showAddModal = () => {
        setAddModalOpen(true);
    };

    const showEditModal = () => {
        if (rowSelectionModel.length === 1) {
            setEditModalOpen(true);
        } else {
            alert("하나의 항목만 선택해주세요."); // 선택된 데이터가 1개가 아닐 때 알림 메시지
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/student/${campName}`);
                // console.log("campName:", campName);
                // console.log("Response data:", response.data);
                const data = response.data;
                setFilteredRows(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [campName]);

    async function deleteStudent(ids) {
        try {
            for (const id of ids) {
                console.log("id: ", id);
                await axios.delete(`/student/${id}`);
            }
            alert("선택한 학생 정보를 삭제하셨습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting menu:", error);
            alert("학생 정보 삭제 중 오류가 발생했습니다.");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{width: '70%'}}>
                <div style={{ marginTop: '100px' }}>
                    <Typography variant="h6" style={{marginBottom: '10px'}}>
                        {campName} 캠프 수강생 명단
                    </Typography>
                    <Typography>
                        캠프 기간: {startDate} - {finishDate} {/* startDate와 finishDate를 보여주기 */}
                    </Typography>
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
                <div style={{justifyContent: 'flex-end', display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'lightgrey',
                            border: 'none',
                            background: 'grey',
                            '&:hover': {
                                background: 'lightgrey',
                                border: 'none',
                                color: 'grey'// 변경 가능한 부분
                            },
                        }}
                        onClick={showAddModal}
                    >
                        추가
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'lightgrey',
                            border: 'none',
                            background: 'grey',
                            '&:hover': {
                                background: 'lightgrey',
                                border: 'none',
                                color: 'grey'// 변경 가능한 부분
                            },
                        }}
                        onClick={showEditModal}
                    >
                        수정
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'lightgrey',
                            border: 'none',
                            background: 'grey',
                            '&:hover': {
                                background: 'lightgrey',
                                border: 'none',
                                color: 'grey'// 변경 가능한 부분
                            },
                        }}
                        onClick={() => deleteStudent([...rowSelectionModel])}
                    >
                        삭제
                    </Button>
                </div>
                {addModalOpen && <div className={"modal"}> <StudentAdd setModalOpen={setAddModalOpen} campName={campName}/></div>}
                {editModalOpen && <div className={"modal"}> <StudentEdit setModalOpen={setEditModalOpen} campName={campName} rowSelectionModel={rowSelectionModel}/></div>}
                {pdfVisible && (
                    <div>
                        <PDFViewer style={{ width: '100%', height: '500px' , marginTop: '10px'}}>
                            <Pdf
                                name={pdfData.name}
                                studentId={pdfData.studentId}
                                department={pdfData.department}
                                campName={pdfData.campName}
                                year={pdfData.year}
                                month={pdfData.month}
                                day={pdfData.day}
                            />
                        </PDFViewer>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <Button
                                variant="outlined"
                                onClick={handleClosePdfView}
                                sx={{
                                    color: 'lightgrey',
                                    border: 'none',
                                    background: 'grey',
                                    '&:hover': {
                                        background: 'lightgrey',
                                        border: 'none',
                                        color: 'grey'// 변경 가능한 부분
                                    },
                                }}
                            >
                                미리보기 닫기
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default DetailPage;