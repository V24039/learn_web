import { Lists, MainHeading } from "../../components";

export const Flexbox = () => {
  return (
    <>
      <MainHeading heading="FlexBox" reference="" />
      <Lists
        listName=""
        points={[
          "Flexbox offers a more efficient way to layout, align and distribute space among items in a container, even when their size is unkown or dynamic",
          "A flex container expands items to fill available free space or shrinks them to prevent overflow",
          "Most appropriate for small-scale layouts",
        ]}
      />
      <Lists 
        listName={"Key Concepts"} 
        points={[
          "Flex Container: The parent element that holds flex items. Created by setting display: flex or display: inline-flex",
          "Flex Items: Direct children of a flex container",
          "Main Axis: Primary axis along which flex items are laid out (horizontal by default)",
          "Cross Axis: Perpendicular to the main axis",
          "flex-direction: Controls the direction of the main axis (row, column, row-reverse, column-reverse)",
          "flex-wrap: Determines if items should wrap to new lines when there's not enough space"
        ]}
      />
      <Lists 
        listName={"Container Properties"} 
        points={[
          "justify-content: Aligns items along the main axis (flex-start, flex-end, center, space-between, space-around)",
          "align-items: Aligns items along the cross axis (stretch, flex-start, flex-end, center, baseline)",
          "align-content: Controls space between flex lines when there's wrapping",
          "gap: Controls spacing between flex items (can use row-gap and column-gap separately)"
        ]}
      />
      <Lists 
        listName={"Item Properties"} 
        points={[
          "flex-grow: Determines how much an item can grow relative to other items",
          "flex-shrink: Controls how much an item can shrink relative to others",
          "flex-basis: Sets the initial main size of an item",
          "flex: Shorthand for flex-grow, flex-shrink, and flex-basis",
          "align-self: Overrides the container's align-items for specific items",
          "order: Controls the order of items in the container"
        ]}
      />
      <Lists 
        listName={"Best Practices"} 
        points={[
          "Use flex: 1 for equal distribution of space",
          "Prefer flex containers for one-dimensional layouts (either row or column)",
          "Use CSS Grid for two-dimensional layouts instead",
          "Consider flex-wrap for responsive designs",
          "Use gap property instead of margins for spacing between items"
        ]}
      />
    </>
  );
};
