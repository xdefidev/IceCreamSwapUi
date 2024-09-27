import { useCallback, useMemo } from "react";
import CountUp from "react-countup";
import { Text, TextProps } from "../Text";

interface BalanceProps extends TextProps {
  value: number;
  decimals?: number;
  unit?: string;
  isDisabled?: boolean;
  prefix?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  strikeThrough?: boolean;
  startFromValue?: boolean;
}

const formatNumber = new Intl.NumberFormat("en", { notation: "compact", minimumFractionDigits: 1 }).format;

const formatStringNumber = (value: string | number) => {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return String(formatNumber(number));
};
const Balance: React.FC<React.PropsWithChildren<BalanceProps>> = ({
  value,
  color = "text",
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  strikeThrough,
  startFromValue = false,
  ...props
}) => {
  const prefixProp = useMemo(() => (prefix ? { prefix } : {}), [prefix]);
  const suffixProp = useMemo(() => (unit ? { suffix: unit } : {}), [unit]);
  const formattingFn = useCallback(
    (val: number) => (prefixProp.prefix ?? "") + formatStringNumber(val) + (suffixProp.suffix ?? ""),
    [prefixProp.prefix, suffixProp.suffix]
  );

  return (
    <CountUp
      start={startFromValue ? value : 0}
      preserveValue
      delay={0}
      end={value}
      {...prefixProp}
      {...suffixProp}
      decimals={decimals}
      duration={1}
      separator=","
      formattingFn={formattingFn}
    >
      {({ countUpRef }) => (
        <Text
          color={isDisabled ? "textDisabled" : color}
          style={{ textDecoration: strikeThrough ? "line-through" : "none" }}
          onClick={onClick}
          {...props}
        >
          <span ref={countUpRef} />
        </Text>
      )}
    </CountUp>
  );
};

export default Balance;
