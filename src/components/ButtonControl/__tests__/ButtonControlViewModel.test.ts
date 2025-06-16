import { ButtonControlViewModel } from '../ButtonControlViewModel';

describe('ButtonControlViewModel', () => {
    let viewModel: ButtonControlViewModel;

    beforeEach(() => {
        viewModel = new ButtonControlViewModel();
    });

    it('should initialize with empty value', () => {
        expect(viewModel.value).toBe('');
    });

    it('should set value correctly', () => {
        viewModel.setValue('test value');
        expect(viewModel.value).toBe('test value');
    });

    it('should clear value', () => {
        viewModel.setValue('test value');
        viewModel.clearValue();
        expect(viewModel.value).toBe('');
    });

    it('should set hello world value', () => {
        viewModel.setHelloWorld();
        expect(viewModel.value).toBe('Hello world!');
    });

    it('should initialize with provided buttons', () => {
        const leftButtons = [{ text: 'Left', onClick: () => {} }];
        const rightButtons = [{ text: 'Right', onClick: () => {} }];
        
        const vm = new ButtonControlViewModel(leftButtons, rightButtons);
        
        expect(vm.leftButtons.map(b => b.text)).toEqual(leftButtons.map(b => b.text));
        expect(vm.rightButtons.map(b => b.text)).toEqual(rightButtons.map(b => b.text));
        expect(typeof vm.leftButtons[0].onClick).toBe('function');
        expect(typeof vm.rightButtons[0].onClick).toBe('function');
    });
}); 