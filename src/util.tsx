// 이메일 유효성 검사 함수
export const validateEmail = (email: string): boolean => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

// 공백 제거 함수
export const removeWhitespace = (text: string): string => {
    const regex = /\s/g;
    return text.replace(regex, '');
}

export const validatePassword = (password: string): boolean => {
    // 길이 검사: 8자 이상 15자 이하
    if (password.length < 8 || password.length > 15) {
        return false;
    }

    // 정규식 패턴: 영문, 숫자, 특수기호 각각의 그룹
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // 영문, 숫자, 특수기호 중 2개 이상 포함하는지 검사
    const validConditions = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length;

    return validConditions >= 2;
}