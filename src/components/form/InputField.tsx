import React, { ReactNode } from "react";
import HtmlTooltip from "../ui/HTMLTooltip";
import HelpIcon from "@mui/icons-material/Help";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

interface InputFieldProps {
  id: string;
  label: string;
  error?: string;
  tooltip?: ReactNode;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  error,
  tooltip,
  value = "",
  onChange,
}) => {
  const renderTooltip = () => {
    if (!tooltip) return;

    return (
      <InputAdornment position="end">
        <HtmlTooltip arrow placement="top" title={tooltip}>
          <HelpIcon />
        </HtmlTooltip>
      </InputAdornment>
    );
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={id} error={error ? true : false}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        endAdornment={renderTooltip()}
        label={label}
        value={value}
        onChange={onChange}
        error={error ? true : false}
      />
      {error && (
        <FormHelperText error={true} id="accountId-error">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
