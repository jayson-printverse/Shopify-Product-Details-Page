import { Box, BlockStack, InlineStack, Text, Tooltip } from "@shopify/polaris";
import React, { useState } from "react";

interface ColorSwatchProps {
  colors: { id: string; name: string; pms: string; hex: string; hsl: string }[];
  onSelectColor?: (color: { id: string; name: string; pms: string }) => void;
  size?: string | number;
  selectedColorId?: string | null; // Allow passing in the selected color ID from outside
}

const adjustLightness = (hsl: string, percentage: number): string => {
  const hslParts = hsl.match(/\d+/g);
  const [hue, saturation, lightness] = hslParts!.map(Number);

  const newLightness = Math.max(0, lightness - percentage);

  return `(${hue}, ${saturation}%, ${newLightness}%)`;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colors,
  onSelectColor,
  size = "var(--p-width-600)",
  selectedColorId,
}) => {
  return (
    <InlineStack gap="200">
      {colors.map((color) => {
        const darkerBorderColor = `hsl${adjustLightness(color.hsl, 15)}`;
        const isSelected = color.id === selectedColorId;

        return (
          <Tooltip
            key={color.id}
            preferredPosition="below"
            content={
              <Box>
                <BlockStack gap="100">
                  <Text
                    as="span"
                    variant="bodySm"
                    fontWeight="bold"
                    tone="base"
                  >
                    {color.name}
                  </Text>
                  <InlineStack gap="0">
                    <Text
                      as="span"
                      variant="bodySm"
                      fontWeight="regular"
                      tone="base"
                    >
                      Pantone®
                    </Text>
                    <Text
                      as="span"
                      variant="bodySm"
                      fontWeight="bold"
                      tone="base"
                    >
                      {color.pms}
                    </Text>
                  </InlineStack>
                </BlockStack>
              </Box>
            }
          >
            <div
              onClick={() =>
                onSelectColor?.({
                  id: color.id,
                  name: color.name,
                  pms: color.pms,
                })
              }
              style={{
                width: size, // Use the size prop for width
                height: size, // Use the size prop for height
                backgroundColor: `hsl${color.hsl}`, // Use the HSL value for the background
                borderRadius: "var(--p-border-radius-full)",
                border: `1px solid ${darkerBorderColor}`, // Use the darker border color
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 0 2px rgba(0, 0, 0, 0.5)"
                  : `inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.25)`,
                // backgroundImage: `
                //   linear-gradient(to bottom left, white 50%, transparent 50%),
                //   linear-gradient(to top right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 50%)
                // `,
                position: "relative",
              }}
            />
          </Tooltip>
        );
      })}
    </InlineStack>
  );
};

export default ColorSwatch;
