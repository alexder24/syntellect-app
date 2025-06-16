import { makeAutoObservable, runInAction } from 'mobx';
import { Country, getCountryByName } from '../../services/apiService';

export class AutocompleteControlViewModel {
    value: string = '';
    suggestions: Country[] = [];
    maxSuggestions: number;
    isLoading: boolean = false;

    constructor(maxSuggestions: number = 10) {
        makeAutoObservable(this);
        this.maxSuggestions = maxSuggestions;
    }

    async setValue(value: string) {
        this.value = value;
        await this.loadSuggestions(value);
    }

    private async loadSuggestions(searchText: string) {
        if (!searchText.trim()) {
            this.suggestions = [];
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        try {
            const suggestions = await getCountryByName(searchText);
            this.suggestions = suggestions.slice(0, this.maxSuggestions);
        } catch (error) {
            this.suggestions = [];
        } finally {
            this.isLoading = false;
        }
    }

    selectSuggestion(country: Country) {
        this.value = country.name;
        this.suggestions = [];
    }
} 