import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const Pdf = ({ name, studentId, department, campName, startDate, finishDate, font }) => {
    Font.register({ family: "MyFont", src: font });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            fontFamily: 'MyFont', // 폰트 적용
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        text: {
            fontSize: 12,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        이름: {name}{'\n'}
                        학번: {studentId}{'\n'}
                        학부: {department}{'\n'}
                        캠프이름: {campName}{'\n'}
                        시작일: {startDate}{'\n'}
                        마감일: {finishDate}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default Pdf;
