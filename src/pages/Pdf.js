import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font , Image} from '@react-pdf/renderer';

const Pdf = ({ name, studentId, department, campName, startDate, finishDate, font }) => {
    Font.register({ family: "MyFont", src: font });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            fontFamily: 'MyFont', // 폰트 적용
        },
        section: {
            position: 'absolute',
            margin: 10,
            padding: 10,

        },
        text: {
            fontSize: 18,
        },
        image: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1
        },
        contentWrapper: {
            position: 'relative',
            flex: 1,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
        },
        sectionRight: {
            position: 'absolute',
            margin: 10,
            padding: 10,
            right: '100px', // 가로 기준 오른쪽 정렬
            top: '250px',
        },
        detail: {
            top: '180px',
            // margin: '20px',
            padding: '20px',
            // right: '50px',
            marginRight: '50px',
            marginLeft: '50px',
            position: 'absolute',
            justifyContent: 'center', // 가운데 정렬 추가
            alignItems: 'center', // 수직 가운데 정렬 추가
            width: '80%',
            height: '80%',
            lineHeight: '1.6',
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.contentWrapper}>
                    <Image
                        // src='https://blog.kakaocdn.net/dn/uo2yZ/btr0w2EPaZn/kMGQT5ANP5hCiPJyt6wvx0/img.jpg'
                        src='./img/Certificates.png'
                        style={styles.image} />
                    <View style={{ position: 'absolute', left: '80px', top: '80px'}}>
                        <Text style={{fontSize: 15}}>
                            제 2023-363호
                        </Text>
                    </View>
                    <View style={styles.sectionRight}>
                        <Text style={styles.text}>
                            학      부 : {department}{'\n'}
                            학      번 : {studentId}{'\n'}
                            성      명 : {name}{'\n'}
                        </Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={{fontSize: 15}}>
                             위 학생은 한동대학교 SW중심대학에서 진행한 "{campName} Camp" 에 참가하여 소정의 과정을 이수하였기에 이 증서를 수여합니다.{'\n'}
                            - 이수기간  :  {startDate}  ~  {finishDate}{'\n'}
                            - 이수과정  :  {campName} Camp{'\n'}
                            {'\n'}
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Text>
                            2023년 8월 4일{'\n'}{'\n'}
                        </Text>
                        <Text style={{fontSize: 20}}>
                            한동대학교 전산전자공학부 황  성  수{'\n'}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default Pdf;
