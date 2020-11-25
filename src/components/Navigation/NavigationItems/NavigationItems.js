import React from 'react';
import { connect } from "react-redux";

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" >Burger Builder</NavigationItem>
        {props.isAthenticated ?<NavigationItem link="/orders">Order  </NavigationItem>:null}
        {props.isAthenticated ? 
          <NavigationItem link="/logout">LogOut  </NavigationItem>:
          <NavigationItem link="/auth">Athentication  </NavigationItem>
        }
      
    </ul>
)

const mapStateToProps = (state) => {
      return {
        isAthenticated :state.auth.token !== null
    };
  }; 

export default connect(mapStateToProps)(NavigationItems); 