export interface UserI {
    email: string,
    passwordNonEncrypt: string,
    accountType: string
}

export interface UserIPassword extends UserI {
    id: string;
    correctPassword(inputPassword: string): Promise<boolean>;
}