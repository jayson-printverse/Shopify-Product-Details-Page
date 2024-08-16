import {
  Layout,
  Badge,
  Page,
  Grid,
  Card,
  Box,
  Bleed,
  Image,
  BlockStack,
  InlineStack,
  InlineGrid,
  Divider,
  SkeletonBodyText,
  Button,
  Text,
  List,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";

import "./styles.css";

import ColorSwatch from "./components/ColorSwatch"; // Adjust the import path
import { colors } from "./data/colors";

function GridExample() {
  // Product information
  const productInformation = [
    {
      id: "product01",
      name: "White Ceramic Mug with Handle and Color Inside",
      images: {
        path: "https://shop.printversepro.com/cdn/shop/files/21108-8_WhiteCoffeeMug_Item2_Side1-1866_1080x1080.webp",
        alt: "Alt text",
      },
      colorIds: [
        "Black",
        "Blue",
        "CambridgeBlue",
        "LightBlue",
        "LightGreen",
        "Green",
        "Yellow",
        "GoldenYellow",
        "Orange",
        "Red",
        "Pink",
        "Maroon",
      ],
      featured: true,
    },
  ];

  // Product Iamges array
  const productImages = [
    {
      source:
        "https://s3.us-west-1.amazonaws.com/assets.printverse/webp/Color-Accent-Mugs-21132_11oz-InnerHandle_Black.webp",
      alt: "White Ceramic Mug with Black Inner Handle",
    },
    {
      source:
        "https://s3.us-west-1.amazonaws.com/assets.printverse/webp/Color-Accent-Mugs-21133_11oz-InnerHandle_Blue.webp",
      alt: "White Ceramic Mug with Blue Inner Handle",
    },
    {
      source:
        "https://s3.us-west-1.amazonaws.com/assets.printverse/webp/Color-Accent-Mugs-21134_11oz-InnerHandle_Maroon.webp",
      alt: "White Ceramic Mug with Maroon Inner Handle",
    },
    {
      source:
        "https://s3.us-west-1.amazonaws.com/assets.printverse/webp/Color-Accent-Mugs-21135_11oz-InnerHandle_Green.webp",
      alt: "White Ceramic Mug with Green Inner Handle",
    },
  ];

  // Product card acts as App based fixed position
  const [isXS, setIsXS] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is "xs" (below the small breakpoint)
    const checkScreenSize = () => {
      const isXSSize = window.innerWidth < 576; // Assuming "xs" is below 576px
      setIsXS(isXSSize);
    };

    // Check screen size on component mount
    checkScreenSize();

    // Add event listener to check on window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Get Product Colors
  const getProductColors = (colorIds: string[]) => {
    return colors.filter((color) => colorIds.includes(color.id));
  };

  const [selectedColor, setSelectedColor] = useState<{
    id: string;
    name: string;
    pms: string;
  } | null>(null);

  useEffect(() => {
    const availableColors = getProductColors(productInformation[0].colorIds); // Access first product's colorIds

    if (availableColors.length > 0) {
      setSelectedColor({
        id: availableColors[0].id,
        name: availableColors[0].name,
        pms: availableColors[0].pms,
      });
    }
  }, []); // Empty dependency array to run only on mount

  const handleColorSelect = (color: {
    id: string;
    name: string;
    pms: string;
  }) => {
    setSelectedColor(color);
  };

  return (
    <Page
      title="Product Details"
      subtitle="Product Subtitle?"
      titleMetadata={<Badge tone="success">Customized</Badge>}
    >
      <Layout>
        <Layout.Section>
          <Grid columns={{ sm: 3 }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 2, lg: 8, xl: 8 }}>
              <BlockStack>
                <Card>
                  <BlockStack gap="400">
                    <InlineGrid columns="1fr auto">
                      <Text as="h2" variant="headingMd">
                        Product Information
                      </Text>
                    </InlineGrid>
                    <Grid columns={{ sm: 1 }}>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 4, md: 6, lg: 10, xl: 10 }}
                      >
                        <Box
                          borderRadius="200"
                          background="bg-surface-secondary-active"
                        >
                          <Bleed marginInline="0" marginBlock="0">
                            <Image
                              style={{
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                              source="https://shop.printversepro.com/cdn/shop/files/21108-8_WhiteCoffeeMug_Item2_Side1-1866_1080x1080.webp"
                              alt="a sheet with purple and orange stripes"
                            />
                          </Bleed>
                        </Box>
                      </Grid.Cell>

                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 2, md: 2, lg: 2, xl: 2 }}
                      >
                        <Grid columns={{ lg: 1 }}>
                          {productImages.map((placeholder, index) => (
                            <Placeholder
                              key={index}
                              height="100%"
                              width="100%"
                              source={placeholder.source}
                              alt={placeholder.alt}
                            />
                          ))}
                        </Grid>
                      </Grid.Cell>
                    </Grid>

                    <BlockStack gap="200">
                      <Box paddingBlockStart="0">
                        <BlockStack gap="200">
                          <InlineGrid columns="1fr auto">
                            <Text as="h2" variant="headingMd">
                              Description
                            </Text>
                          </InlineGrid>
                          <BlockStack gap="400">
                            <Text as="p" variant="bodyMd">
                              Warm-up with a nice cuppa out of this customized
                              ceramic coffee mug. Personalize it with cool
                              designs, photos or logos to make that "aaahhh!"
                              moment even better. It's BPA and Lead-free,
                              microwave & dishwasher-safe, and made of white,
                              durable ceramic in 11-ounce and 15-ounce sizes.
                              Thanks to the advanced printing tech, your designs
                              come to life with incredibly vivid colors – the
                              perfect gift for coffee, tea, and chocolate
                              lovers.
                            </Text>
                            <List type="bullet">
                              <List.Item>
                                These mugs are made with durable white ceramic
                                so that your prints can stand out.
                              </List.Item>
                              <List.Item>
                                Available in two sizes: 11oz (0.33 l) and 15oz
                                (0.44 l)
                              </List.Item>
                              <List.Item>
                                All mugs feature a comfortable C-handle and a
                                shiny finish so that they're both easy to use
                                and great to look at.
                              </List.Item>
                            </List>
                          </BlockStack>
                        </BlockStack>
                      </Box>
                    </BlockStack>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Grid.Cell>
            {/* Right Sidebar */}
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 1, lg: 4, xl: 4 }}>
              <BlockStack gap={{ xs: "400", md: "400" }}>
                <div
                  style={{
                    position: isXS ? "fixed" : "inherit", // Adjust padding based on screen size
                    bottom: isXS ? 0 : "inherit",
                    left: isXS ? 0 : "inherit",
                    // bottom: 0,
                    zIndex: isXS ? 10000 : "inherit",
                    width: isXS ? "100%" : "inherit",
                    // width: "100%",
                    // padding: isXS ? "10px" : "400px", // Adjust padding based on screen size
                  }}
                  // style={{
                  //   position: "fixed",
                  //   bottom: 0,
                  //   zIndex: 1000,
                  //   width: "100%",
                  //   backgroundColor: "white", // Optional
                  // }}
                >
                  <Card>
                    <BlockStack gap="400">
                      <InlineGrid columns="1fr auto">
                        <Text as="h2" variant="headingMd">
                          White Ceramic Mug with Accent Color Handle & Inside
                        </Text>
                      </InlineGrid>
                      <Box>
                        <Bleed marginInline={{ xs: "400", sm: "500" }}>
                          <Divider />
                        </Bleed>
                      </Box>
                      <Text variant="bodyMd" as="h4">
                        Color
                      </Text>
                      <InlineStack gap="400" blockAlign="stretch">
                        <ColorSwatch
                          colors={getProductColors(
                            productInformation[0].colorIds
                          )}
                          size="var(--p-width-600)"
                          onSelectColor={handleColorSelect}
                          selectedColorId={selectedColor?.id || null}
                        />
                      </InlineStack>

                      {selectedColor && (
                        <Text variant="bodyMd" as="p">
                          {selectedColor.name} (Pantone {selectedColor.pms})
                        </Text>
                      )}
                      <Divider />
                      <Button fullWidth variant="primary" size="large">
                        Start designing
                      </Button>
                      {/* <SkeletonBodyText /> */}
                    </BlockStack>
                  </Card>
                </div>

                {/* Fulfillment shipping */}
                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text as="h2" variant="headingMd">
                        Fulfillment shipping
                      </Text>
                    </InlineStack>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          Location:
                        </Text>
                        <Text variant="bodyMd" as="p">
                          Fremont, California
                        </Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          Delivery time:
                        </Text>
                        <Text variant="bodyMd" as="p">
                          3-5 Business days
                        </Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          First item:
                        </Text>
                        <Text variant="bodyMd" as="p">
                          $6.49
                        </Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          Next item:
                        </Text>
                        <Text variant="bodyMd" as="p">
                          $3.50
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text as="h2" variant="headingSm">
                        File guidelines
                      </Text>
                    </InlineStack>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          Print file size
                        </Text>
                        <Text variant="bodyMd" as="p">
                          9" x 3.5"
                        </Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" as="p">
                          Imprint dimensions
                        </Text>
                        <Text variant="bodyMd" as="p">
                          2084px x 1088px
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Grid.Cell>
          </Grid>
          <Box border="divider" minHeight="20rem" />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

const Placeholder = ({
  height = "auto",
  width = "auto",
  source,
  alt,
}: {
  height?: string;
  width?: string;
  source: string;
  alt: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        height: height,
        width: width,
        cursor: "pointer",
        filter: isHovered ? "brightness(0.9)" : "none",
        transition: "filter 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box borderRadius="200" background="bg-surface-secondary-active">
        <Bleed marginInline="0" marginBlock="0">
          <Image
            style={{
              width: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
            source={source}
            alt={alt}
          />
        </Bleed>
      </Box>
    </div>
  );
};

export default GridExample;
