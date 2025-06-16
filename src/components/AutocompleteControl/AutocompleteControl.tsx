import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutocompleteControlViewModel } from './AutocompleteControlViewModel';
import { Country } from '../../services/apiService';

interface AutocompleteControlProps {
    viewModel: AutocompleteControlViewModel;
    className?: string;
}

export const AutocompleteControl: React.FC<AutocompleteControlProps> = observer(({ viewModel, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={viewModel.value}
                onChange={(e) => viewModel.setValue(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
                placeholder="Type to search..."
            />

            {viewModel.suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {viewModel.suggestions.map((country, index) => (
                        <SuggestionItem
                            key={`${country.name}-${index}`}
                            country={country}
                            onClick={() => viewModel.selectSuggestion(country)}
                        />
                    ))}
                </div>
            )}

            {viewModel.isLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    Loading...
                </div>
            )}
        </div>
    );
});

interface SuggestionItemProps {
    country: Country;
    onClick: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ country, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span className="font-medium">{country.name}</span>
                <span className="text-gray-500 text-sm">({country.fullName})</span>
            </div>
        </div>
    );
}; 