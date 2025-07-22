// src/components/SectionTitle.jsx
import React from "react";
import { Typography } from "@mui/material";

// Function to convert title to Camel Case (First Letter Capital)
const toCamelCase = (text) =>
    text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

const SectionTitle = ({ title }) => {
    return (
        <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{
                fontWeight: "bold",
                color: "#2a7b8bff",
                paddingBottom: "20px",
                textTransform: "none", 
            }}
        >
            {toCamelCase(title)}
        </Typography>
    );
};

export default SectionTitle;
