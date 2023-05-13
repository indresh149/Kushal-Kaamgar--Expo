import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Custom_Dropdown = () => {
    const [options, setOptions] = useState([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
        { label: 'Option 5', value: 'option5' },
    ]);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        const updatedOptions = options.filter((item) => item.value !== option.value);
        setOptions(updatedOptions);
    };

    return (
        <View>
            <Text>Select an option:</Text>
            <DropDownPicker
                items={options}
                placeholder="Select an option"
                value={selectedOption}
                onChangeItem={(item) => handleOptionSelect(item)}
                zIndex={5000} // Add this line to fix the dropdown not appearing issue
            />
        </View>
    );
};

export default Custom_Dropdown;
