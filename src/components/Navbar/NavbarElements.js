import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #ffb3ff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;
  
export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;


            // <Nav>
            //     <NavMenu>
            //         <NavLink to="/signup">
            //             Sign Up
            //         </NavLink>
            //         <NavLink to="/">
            //             Home
            //         </NavLink>

            //         {/* {
            //             sessionActive ? (
            //                 <div> */}
            //             <NavLink to="/logout">
            //                 Log Out
            //             </NavLink>
            //             <NavLink to="/dashboard">
            //                 Dashboard
            //             </NavLink>
            //             <NavLink to="/restaurants">
            //                 Restaurants
            //             </NavLink>
            //             {/* </div>
            //             ): ( */}
            //             <NavLink to="/login">
            //                 Log In
            //             </NavLink>       
            //              {/* )
            //          }  */}
            //     </NavMenu>
            // </Nav>



            // if(response.data) {
            
            //   console.log("UserPanel data");
            //   console.log(data);

            //   if(response.data.roleName === "owner"){
            //       console.log("is owner")

            //       console.log("signing in owner, rerouting to user dashboard");
            //       // alert("signing in owner, rerouting to user dashboard");

            //       setTimeout(() => {
            //           console.log("1");
            //           navigate("/dashboard");
            //       }, 3000);

            //       console.log("2");
            //       console.log("3");

            //       // console.log("cleared timeout");
            //       // clearTimeout(timeout);



            //   } else {
            //       console.log("is not owner");

            //       console.log("Something went wrong. Sending to sign up.");
            //       // alert("Something went wrong. Sending to sign up.");
                  
            //       setTimeout(() => {
            //           console.log("1");
            //           navigate("/signup");
            //       }, 3000);


            //       console.log("2");
            //       console.log("3");

            //       // clearTimeout(timeout);



            //   }