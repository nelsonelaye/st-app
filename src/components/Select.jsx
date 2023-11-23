import { forwardRef } from 'react';
import SelectPrimitive from 'react-select';

const Select = forwardRef((props, ref) => {
  return (
    <SelectPrimitive
      key={`select_key__${props.value}`}
      ref={ref}
      {...props}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          'boxShadow': state.isFocused ? '0px 0px 2px #ff9f43' : 'none',
          '&:hover': {
            border: '1px solid #ff9f43',
            boxShadow: '0px 0px 2px #ff9f43',
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused && '#ff9f43',
          color: state.isFocused ? 'white' : 'black',
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          minWidth: '300px',
          zIndex: 200,
        }),
      }}
      className={props.className}
    />
  );
});

Select.displayName = 'Select';

export default Select;
