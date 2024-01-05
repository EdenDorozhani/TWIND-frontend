import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { customStyles } from "./styles";
import FlexBox from "../../FlexBox";
import SimpleText from "../../SimpleText";
import { Controller } from "react-hook-form";
import ErrorText from "../../ErrorText";

const AsyncInputPicker = ({
  onChangeAction,
  name,
  inputValue,
  errors,
  control,
  backendErrors,
  mandatory,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  return (
    <FlexBox direction={"column"} gap="small">
      {mandatory ? (
        <>
          <SimpleText content={name} color={!!errors && "danger"} />
          {!!errors && <ErrorText content={errors.message} />}
          {!!backendErrors && <ErrorText content={backendErrors} />}
        </>
      ) : (
        ""
      )}
      <Controller
        name="country"
        control={control}
        defaultValue={inputValue}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            styles={customStyles(errors)}
            value={
              options.find((c) => c.label === value) ||
              options.find((c) => c.label === inputValue)
            }
            onChange={(val) => {
              onChange(val.label);
              onChangeAction(name, val.label);
            }}
            maxMenuHeight={120}
          />
        )}
      />
    </FlexBox>
  );
};

export default AsyncInputPicker;
