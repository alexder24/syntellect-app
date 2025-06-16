import React from 'react';
import { ButtonControl } from './components/ButtonControl/ButtonControl';
import { ButtonControlViewModel } from './components/ButtonControl/ButtonControlViewModel';
import { AutocompleteControl } from './components/AutocompleteControl/AutocompleteControl';
import { AutocompleteControlViewModel } from './components/AutocompleteControl/AutocompleteControlViewModel';

function App() {
    // First ButtonControl - 2 buttons on the right
    const firstButtonControlVM: ButtonControlViewModel = new ButtonControlViewModel(
        [], // no left buttons
        [
            { text: 'Clear', onClick: (): void => firstButtonControlVM.clearValue() },
            { text: 'Hello', onClick: (): void => firstButtonControlVM.setHelloWorld() }
        ]
    );

    // Second ButtonControl - 1 button on each side
    const secondButtonControlVM: ButtonControlViewModel = new ButtonControlViewModel(
        [
            {
                text: 'Check Number',
                onClick: (): void => {
                    const value = secondButtonControlVM.value;
                    if (!isNaN(Number(value))) {
                        alert(value);
                    }
                }
            }
        ],
        [
            {
                text: 'Show Text',
                onClick: (): void => alert(secondButtonControlVM.value)
            }
        ]
    );

    // Autocomplete controls with different max suggestions
    const autocompleteVM1: AutocompleteControlViewModel = new AutocompleteControlViewModel(3);
    const autocompleteVM2: AutocompleteControlViewModel = new AutocompleteControlViewModel(10);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Button Controls</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Control with 2 buttons on the right
                            </h3>
                            <ButtonControl viewModel={firstButtonControlVM} />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Control with 1 button on each side
                            </h3>
                            <ButtonControl viewModel={secondButtonControlVM} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Autocomplete Controls</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Max 3 suggestions
                            </h3>
                            <AutocompleteControl viewModel={autocompleteVM1} />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Max 10 suggestions
                            </h3>
                            <AutocompleteControl viewModel={autocompleteVM2} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
