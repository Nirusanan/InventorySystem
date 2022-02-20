import React from 'react';
// import NavBar from './navBar';
import SPAS from './SPAS';
import NavAdmin from '../NavBar/navAdmin';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';

function adminPage() {
    return (
        <div>
            <NavAdmin />
            <SPAS />
            <Box pt={5}>
                <Copyright/>
            </Box>
            

        </div> 
    );
}

export default adminPage;
