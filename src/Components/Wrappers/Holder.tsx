import {IHolder} from "../../interfaces/holder.interface.ts";
import {Box, Container, CssBaseline} from "@mui/material";
import React from "react";

const Holder : React.FC<IHolder> = ({children}) => {
    
    return (
        <>
        <Container component="main" maxWidth="xl">
            <CssBaseline/>
            
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center'
            }}
            >
            {children}
            </Box>
        </Container>
        </>
    )
    
}

export default Holder;