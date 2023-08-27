import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CampAdd from "../component/CampAdd";
import CampEdit from "../component/CampEdit";

function MainPage() {
    const [campList, setCampList] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null); // 선택된 캠프 정보 상태 추가

    const loadData = async () => {
        const response = await axios.post(`/camp/list`);
        setCampList(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const navigate = useNavigate();

    function moveCamp(campName) {
        navigate(`/${campName}`);
    }

    const showAddModal = () => {
        setAddModalOpen(true);
    };

    const showEditModal = (id) => { // 수정 모달 열기 함수 수정
        setSelectedCamp(id); // 선택된 캠프 정보 설정
        setEditModalOpen(true);
    };
    async function deleteCamp(id) {
        try {
            console.log("id: ", id);
            await axios.delete(`/camp/${id}`);

            alert("선택한 캠프를 삭제하셨습니다!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting menu:", error);
            alert("캠프 삭제 중 오류가 발생했습니다.");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{width: '70%'}}>
                <div style={{ marginTop: '100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {campList.map(camp => (
                        <Card key={camp.id}>
                            <CardContent>
                                <Typography variant="h6">
                                    {camp.campName} 캠프
                                </Typography>
                                <Typography>
                                    - 등록비: {camp.fee}
                                </Typography>
                                <Typography>
                                    - 담당 교수: {camp.profName}
                                </Typography>
                                <Typography>
                                    - 기간: {camp.startDate} - {camp.finishDate}
                                </Typography>
                            </CardContent>
                            <CardActions style={{justifyContent: 'flex-end', display: 'flex'}}>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                                    onClick={() => moveCamp(camp.campName)}>
                                    상세보기
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                                    onClick={() => showEditModal(camp.id)} // 수정 버튼 클릭 시 수정 모달 열기 함수 호출
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                                    onClick={() => deleteCamp(camp.id)}
                                >
                                    삭제
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
                <div style={{justifyContent: 'flex-end', display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button
                        variant="outlined"
                        sx={{ color: 'lightgrey', border: 'none', background: 'grey'}}
                        onClick={showAddModal}
                    >
                        추가
                    </Button>
                </div>
                {addModalOpen && <div className={"modal"}> <CampAdd setModalOpen={setAddModalOpen} /></div>}
                {editModalOpen && (
                    <div className={"modal"}>
                        <CampEdit
                            setModalOpen={setEditModalOpen}
                            selectedCamp={selectedCamp} // 선택된 캠프 정보 전달
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainPage;
