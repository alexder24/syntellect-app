import { AutocompleteControlViewModel } from '../AutocompleteControlViewModel';
import { getCountryByName } from '../../../services/apiService';

jest.mock('../../../services/apiService');

describe('AutocompleteControlViewModel', () => {
    let viewModel: AutocompleteControlViewModel;
    const mockGetCountryByName = getCountryByName as jest.MockedFunction<typeof getCountryByName>;

    beforeEach(() => {
        viewModel = new AutocompleteControlViewModel(3);
        jest.clearAllMocks();
    });

    it('should initialize with empty value and suggestions', () => {
        expect(viewModel.value).toBe('');
        expect(viewModel.suggestions).toEqual([]);
        expect(viewModel.isLoading).toBe(false);
    });

    it('should set value correctly', () => {
        viewModel.setValue('test');
        expect(viewModel.value).toBe('test');
    });

    it('should clear suggestions when empty value is set', async () => {
        await viewModel.setValue('');
        expect(viewModel.suggestions).toEqual([]);
        expect(viewModel.isLoading).toBe(false);
    });

    it('should load suggestions when value is set', async () => {
        const mockSuggestions = [
            { name: 'Test', fullName: 'Test Country', flag: '🏳️' }
        ];
        mockGetCountryByName.mockResolvedValue(mockSuggestions);

        await viewModel.setValue('test');
        
        expect(mockGetCountryByName).toHaveBeenCalledWith('test');
        expect(viewModel.suggestions).toEqual(mockSuggestions);
        expect(viewModel.isLoading).toBe(false);
    });

    it('should limit suggestions to maxSuggestions', async () => {
        const mockSuggestions = [
            { name: 'Test1', fullName: 'Test Country 1', flag: '🏳️' },
            { name: 'Test2', fullName: 'Test Country 2', flag: '🏳️' },
            { name: 'Test3', fullName: 'Test Country 3', flag: '🏳️' },
            { name: 'Test4', fullName: 'Test Country 4', flag: '🏳️' }
        ];
        mockGetCountryByName.mockResolvedValue(mockSuggestions);

        await viewModel.setValue('test');
        
        expect(viewModel.suggestions).toHaveLength(3);
    });

    it('should handle API errors gracefully', async () => {
        mockGetCountryByName.mockRejectedValue(new Error('API Error'));

        await viewModel.setValue('test');
        
        expect(viewModel.suggestions).toEqual([]);
        expect(viewModel.isLoading).toBe(false);
    });

    it('should select suggestion correctly', () => {
        const country = { name: 'Test', fullName: 'Test Country', flag: '🏳️' };
        viewModel.suggestions = [country];

        viewModel.selectSuggestion(country);
        
        expect(viewModel.value).toBe(country.name);
        expect(viewModel.suggestions).toEqual([]);
    });
}); 