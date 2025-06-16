import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonControl } from '../ButtonControl';
import { ButtonControlViewModel } from '../ButtonControlViewModel';

describe('ButtonControl', () => {
    let viewModel: ButtonControlViewModel;

    beforeEach(() => {
        viewModel = new ButtonControlViewModel();
    });

    it('should render with empty value', () => {
        render(<ButtonControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('');
    });

    it('should update value on input change', async () => {
        render(<ButtonControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test value');
        
        expect(viewModel.value).toBe('test value');
    });

    it('should render left buttons', () => {
        const leftButtons = [{ text: 'Left Button', onClick: jest.fn() }];
        viewModel = new ButtonControlViewModel(leftButtons, []);
        
        render(<ButtonControl viewModel={viewModel} />);
        
        expect(screen.getByText('Left Button')).toBeInTheDocument();
    });

    it('should render right buttons', () => {
        const rightButtons = [{ text: 'Right Button', onClick: jest.fn() }];
        viewModel = new ButtonControlViewModel([], rightButtons);
        
        render(<ButtonControl viewModel={viewModel} />);
        
        expect(screen.getByText('Right Button')).toBeInTheDocument();
    });

    it('should call button onClick handler', () => {
        const onClick = jest.fn();
        const buttons = [{ text: 'Test Button', onClick }];
        viewModel = new ButtonControlViewModel(buttons, []);
        
        render(<ButtonControl viewModel={viewModel} />);
        
        fireEvent.click(screen.getByText('Test Button'));
        expect(onClick).toHaveBeenCalled();
    });

    it('should apply custom className', () => {
        render(<ButtonControl viewModel={viewModel} className="custom-class" />);
        const container = screen.getByRole('textbox').parentElement;
        expect(container).toHaveClass('custom-class');
    });
}); 