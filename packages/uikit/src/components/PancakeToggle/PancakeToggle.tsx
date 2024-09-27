import Image from "next/image";
import React from "react";
import { PancakeInput, PancakeLabel, PancakeStack } from "./StyledPancakeToggle";
import { PancakeToggleProps, scales } from "./types";

const PancakeToggle: React.FC<React.PropsWithChildren<PancakeToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <PancakeStack scale={scale}>
    <PancakeInput id={props.id || "pancake-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <PancakeLabel scale={scale} checked={checked} htmlFor={props.id || "pancake-toggle"}>
      <div className="pancakes">
        <Image src="/images/coin.png" className="pancake" height={37} width={37} alt="IncaSwap" />
      </div>
    </PancakeLabel>
  </PancakeStack>
);

export default PancakeToggle;
