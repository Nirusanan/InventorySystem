import React from 'react';
import SPAS from './SPAS';
import NavAdmin from '../NavBar/navAdmin';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';

function adminPage() {
    return (
        <div>
            <NavAdmin />
            <SPAS />
            <Box pt={3} style={{ backgroundColor: "rgb(211,211,211)" }}>
                <Copyright/>
            </Box>
            

        </div> 
    );
}

export default adminPage;
