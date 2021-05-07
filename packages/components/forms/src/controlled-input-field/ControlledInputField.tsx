import React, { EventHandler, ChangeEvent, ReactNode } from 'react';
import { cx } from 'emotion';
import { ValidationMessage } from '@contentful/f36-validation-message';

import { FormLabel } from '@contentful/f36-components';
import { ControlledInput } from '@contentful/f36-inputs';
import { HelpText } from '@contentful/f36-helptext';
import type { ControlledInputProps } from '@contentful/f36-inputs';
import { styles } from './ControlledInputField.styles';
import { Box, CommonProps } from '@contentful/f36-core';

export interface ControlledInputFieldProps extends CommonProps {
  id: string;
  label: string;
  isLabelLight?: boolean;
  isRequired?: boolean;
  helpText?: string;
  formLabelProps?: object;
  isDisabled?: boolean;
  helpTextProps?: object;
  validationMessage?: string;
  value?: string;
  name?: string;
  isChecked?: boolean;
  inputProps?: ControlledInputProps;
  inputType?: 'radio' | 'checkbox';
  onChange?: EventHandler<ChangeEvent<HTMLInputElement>>;
  className?: string;
  testId?: string;
  children?: ReactNode;
}

export const _ControlledInputField = (
  {
    id,
    isLabelLight = false,
    testId = 'cf-ui-controlled-input-field',
    isRequired,
    helpText,
    isDisabled,
    label,
    helpTextProps,
    formLabelProps,
    className,
    isChecked = false,
    value,
    validationMessage,
    onChange,
    children,
    inputType = 'checkbox',
    inputProps,
    name,
    ...otherProps
  }: ControlledInputFieldProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const rootClassNames = cx(
    {
      [styles.rootOrLabelDisabled]: isDisabled,
    },
    className,
  );
  const inputClassNames = cx(styles.input, inputProps?.className);
  const labelClassNames = cx(styles.label, {
    [styles.labelLight]: isLabelLight,
    [styles.rootOrLabelDisabled]: isDisabled,
  });

  return (
    <Box
      as="div"
      display="inline-flex"
      ref={ref}
      testId={testId}
      {...otherProps}
      className={rootClassNames}
    >
      <ControlledInput
        id={id}
        label={label}
        type={inputType}
        name={name}
        isRequired={isRequired}
        isChecked={isChecked}
        isDisabled={isDisabled}
        value={value}
        onChange={onChange}
        {...inputProps}
        className={inputClassNames}
      />
      <div>
        <FormLabel
          className={labelClassNames}
          required={isRequired}
          htmlFor={id}
          {...formLabelProps}
        >
          {label}
        </FormLabel>
        {validationMessage && (
          <ValidationMessage>{validationMessage}</ValidationMessage>
        )}
        {helpText && <HelpText {...helpTextProps}>{helpText}</HelpText>}
      </div>
    </Box>
  );
};

export const ControlledInputField = React.forwardRef(_ControlledInputField);
