import { Box, Card, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Holder from "../../Components/Wrappers/Holder";

const Category = () => {
    const {catId} = useParams();

    console.log(catId);
    const image = 'https://images.unsplash.com/photo-1714668105771-b41382a58aa5?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap:2,
            px:1
        }}
        >

        <Card
        elevation={1}
        className="categoryCard"
        style={{background: `url(${image}` }}
        sx={{my:1, p:2, mx:1, minWidth: '82%'}}
        >
            <Stack sx={{mx: 2}}>
                <Typography variant="h6" sx={{color: '#fff'}}> Hello </Typography>
            </Stack>
        </Card>
        <Holder>
 
        <Box/>
        </Holder>
        </Box>

    )
}

export default Category;