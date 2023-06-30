import { Box, Typography } from "@mui/material";

interface BankItemViewProps {
    value: number | string;
    isActive?: boolean;
    isSummary?: boolean;
}

export const BankItemView = ({ value, isActive, isSummary }: BankItemViewProps) => {
    const activeColor =
        "linear-gradient(175deg, rgba(255,255,255,1) 0%, rgba(231,13,13,1) 35%, rgba(110,12,12,1) 100%)";
    const nonActiveColor =
        "linear-gradient(175deg, rgba(255,255,255,1) 0%, rgba(0,0,255,1) 35%, rgba(16,19,92,1) 100%)";

    const color = isSummary
        ? "linear-gradient(175deg, rgba(255,255,255,1) 0%, rgba(110,110,110,1) 35%, rgba(30,30,30,1) 100%)"
        : isActive
            ? activeColor
            : nonActiveColor;

    return (
        <Box
            sx={{
                height: isSummary ? "5em" : "3em",
                width: isSummary ? "18em" : "12em",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                background: color,
                borderRadius: "24px",
            }}
        >
            <Typography color="white" variant={isSummary ? "h4" : "h5"}>
                {value}
            </Typography>
        </Box>
    );
};