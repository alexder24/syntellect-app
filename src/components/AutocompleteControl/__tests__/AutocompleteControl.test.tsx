import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteControl } from '../AutocompleteControl';
import { AutocompleteControlViewModel } from '../AutocompleteControlViewModel';
import { getCountryByName } from '../../../services/apiService';

jest.mock('../../../services/apiService');

describe('AutocompleteControl', () => {
    let viewModel: AutocompleteControlViewModel;
    const mockGetCountryByName = getCountryByName as jest.MockedFunction<typeof getCountryByName>;

    beforeEach(() => {
        viewModel = new AutocompleteControlViewModel(3);
        jest.clearAllMocks();
    });

    it('should render with empty value', () => {
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('');
    });

    it('should update value on input change', async () => {
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        
        expect(viewModel.value).toBe('test');
    });

    it('should show loading state', async () => {
        mockGetCountryByName.mockImplementation(() => new Promise(() => {}));
        
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display suggestions', async () => {
        const mockSuggestions = [
            { name: 'Test', fullName: 'Test Country', flag: '🏳️' }
        ];
        mockGetCountryByName.mockResolvedValue(mockSuggestions);
        
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        
        await waitFor(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
            expect(screen.getByText('(Test Country)')).toBeInTheDocument();
            expect(screen.getByText('🏳️')).toBeInTheDocument();
        });
    });

    it('should select suggestion on click', async () => {
        const mockSuggestions = [
            { name: 'Test', fullName: 'Test Country', flag: '🏳️' }
        ];
        mockGetCountryByName.mockResolvedValue(mockSuggestions);
        
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        
        await waitFor(() => {
            const suggestion = screen.getByText('Test');
            fireEvent.click(suggestion);
        });
        
        expect(viewModel.value).toBe('Test');
        expect(viewModel.suggestions).toEqual([]);
    });

    it('should not show suggestions when input is empty', async () => {
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        await userEvent.clear(input);
        
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should apply custom className', () => {
        render(<AutocompleteControl viewModel={viewModel} className="custom-class" />);
        const container = screen.getByRole('textbox').parentElement;
        expect(container).toHaveClass('custom-class');
    });

    it('should handle API errors gracefully', async () => {
        mockGetCountryByName.mockRejectedValue(new Error('API Error'));
        
        render(<AutocompleteControl viewModel={viewModel} />);
        const input = screen.getByRole('textbox');
        
        await userEvent.type(input, 'test');
        
        await waitFor(() => {
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
    });
}); 