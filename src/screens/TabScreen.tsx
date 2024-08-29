import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

export const Calendar: React.FC = () => {
    return (
        <Container>
            <StyledText>Calendar</StyledText>
        </Container>
    );
};

export const EditDiary: React.FC = () => {
    return (
        <Container>
            <StyledText>EditDiary</StyledText>
        </Container>
    );
};

export const MyPage: React.FC = () => {
    return (
        <Container>
            <StyledText>MyPage</StyledText>
        </Container>
    );
};
