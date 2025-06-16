import React from 'react';
import { observer } from 'mobx-react-lite';
import { ButtonControlViewModel } from './ButtonControlViewModel';
import { Button } from '../common/Button';

interface ButtonControlProps {
    viewModel: ButtonControlViewModel;
    className?: string;
}

export const ButtonControl: React.FC<ButtonControlProps> = observer(({ viewModel, className = '' }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex gap-1">
                {viewModel.leftButtons.map((button, index) => (
                    <Button
                        key={`left-${index}`}
                        text={button.text}
                        onClick={button.onClick}
                    />
                ))}
            </div>

            <input
                type="text"
                value={viewModel.value}
                onChange={(e) => viewModel.setValue(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded flex-grow"
            />

            <div className="flex gap-1">
                {viewModel.rightButtons.map((button, index) => (
                    <Button
                        key={`right-${index}`}
                        text={button.text}
                        onClick={button.onClick}
                    />
                ))}
            </div>
        </div>
    );
}); 