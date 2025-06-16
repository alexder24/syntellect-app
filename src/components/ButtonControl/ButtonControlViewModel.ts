import { makeAutoObservable } from 'mobx';

export interface ButtonConfig {
    text: string;
    onClick: () => void;
}

export class ButtonControlViewModel {
    value: string = '';
    leftButtons: ButtonConfig[] = [];
    rightButtons: ButtonConfig[] = [];

    constructor(leftButtons: ButtonConfig[] = [], rightButtons: ButtonConfig[] = []) {
        makeAutoObservable(this);
        this.leftButtons = leftButtons;
        this.rightButtons = rightButtons;
    }

    setValue(value: string) {
        this.value = value;
    }

    clearValue() {
        this.value = '';
    }

    setHelloWorld() {
        this.value = 'Hello world!';
    }
} 