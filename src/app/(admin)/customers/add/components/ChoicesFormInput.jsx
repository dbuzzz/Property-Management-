import React, { useEffect, useRef } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

const ChoicesFormInput = ({ 
  children, 
  className = '', 
  id,
  defaultValue,
  onChange,
  placeholder,
  ...props 
}) => {
  const selectRef = useRef(null);
  const choicesRef = useRef(null);

  useEffect(() => {
    if (selectRef.current && !choicesRef.current) {
      // Initialize Choices.js
      choicesRef.current = new Choices(selectRef.current, {
        searchEnabled: true,
        itemSelectText: '',
        shouldSort: false,
        position: 'bottom',
        placeholder: true,
        placeholderValue: placeholder || props['data-placeholder'] || 'Select an option',
        removeItemButton: false,
        allowHTML: true, // ✅ Important for emoji support
      });

      // Set default value if provided
      if (defaultValue) {
        setTimeout(() => {
          choicesRef.current?.setChoiceByValue(defaultValue);
        }, 100);
      }

      // Handle change event
      selectRef.current.addEventListener('change', (e) => {
        if (onChange) {
          onChange(e);
        }
      });
    }

    // Cleanup
    return () => {
      if (choicesRef.current) {
        choicesRef.current.destroy();
        choicesRef.current = null;
      }
    };
  }, []);

  // Update value when defaultValue changes
  useEffect(() => {
    if (choicesRef.current && defaultValue) {
      choicesRef.current.setChoiceByValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <select
      ref={selectRef}
      className={className}
      id={id}
      defaultValue={defaultValue}
      {...props}
    >
      {children}
    </select>
  );
};

export default ChoicesFormInput;