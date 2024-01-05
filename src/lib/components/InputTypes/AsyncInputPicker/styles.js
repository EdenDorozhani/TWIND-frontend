export const customStyles = (errors) => {
  return {
    control: (provided, state) => ({
      ...provided,
      padding: "none",
      border: "none",
      borderRadius: "none",
      borderBottom: `1px solid  `,
      background: "none",
      color: "white",
      boxShadow: "none",
      borderBottomColor: !!errors ? "#f32013" : "rgb(9, 121, 84)",
      cursor: state.isFocused ? "text" : "pointer",
      fontFamily: "Times New Roman",
      "&:hover": {
        borderBottomColor: !!errors ? "#f32013" : "rgb(9, 121, 84)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "none",
      color: !!errors ? "#f32013" : "rgb(9, 121, 84)",
      "&:hover": {
        color: !!errors ? "#f32013" : "rgb(9, 121, 84)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "rgb(9, 121, 84)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgb(9, 121, 84)",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "none",
      color: !!errors ? "#f32013" : "rgb(9, 121, 84)",
    }),
    singleValue: (provided) => ({
      ...provided,

      color: "rgb(9, 121, 84)",
    }),
  };
};
