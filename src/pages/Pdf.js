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
            fontSize: 20,
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
            display: 'flex',
            justifyContent: 'center',
        },
        sectionRight: {
            position: 'absolute',
            margin: 10,
            padding: 10,
            right: '50px', // 가로 기준 오른쪽 정렬
            top: '250px',
        },
        detail: {
            position: 'absolute',
            justifyContent: 'center', // 가운데 정렬 추가
            alignItems: 'center', // 수직 가운데 정렬 추가
            width: '100%',
            height: '100%',
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
                    <View style={styles.sectionRight}>
                        <Text style={styles.text}>
                            이름: {name}{'\n'}
                            학번: {studentId}{'\n'}
                            학부: {department}{'\n'}
                            캠프이름: {campName}{'\n'}
                        </Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={{fontSize: 15}}>
                            위 사람은 {campName}를 수료하였으므로 이 상장을 수여함.
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default Pdf;
