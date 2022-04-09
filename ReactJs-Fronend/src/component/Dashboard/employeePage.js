import React from 'react';
import NavEmployee from '../NavBar/navEmployee';
import SPAS from './SPAS';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';

function employeePage(props) {

    return (
        <div>
            <NavEmployee />
            <div style={{ marginTop: "110px" }}>
                <SPAS />
            </div>
            <div style={{ backgroundColor: "rgb(211,211,211)" }}>
                <Box pt={4} >
                    <Copyright />
                </Box>
            </div>
        </div>
    );
}

export default employeePage;