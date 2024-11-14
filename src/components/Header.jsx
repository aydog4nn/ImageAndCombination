import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {BsTruck} from "react-icons/bs";
import {BsBag} from "react-icons/bs";
import {RiAccountBoxLine} from "react-icons/ri";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const UnderlinedText = styled.span`
        position: relative;
        color: #000;
        text-decoration: none;
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -7px;
            width: 0;
            height: 2px;
            background-color: #000;
            transition: width 0.3s ease, left 0.3s ease;
        }

        &:hover::after {
            width: 100%;
            left: 0;
        }
    `;


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <div style={{
                height: "50px",
                backgroundColor: "#376642",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Geist Mono', monospace"
            }}>
                <BsTruck style={{
                    fontSize: "30px",
                    color: "#f7e7d4",
                    marginRight: "10px",
                }}/>
                <h6 style={{
                    color: "#f7e7d4",
                    margin: 0,
                }}>
                    800 TL ve üzeri alışverişlerinizde kargo ücretsiz!
                </h6>
            </div>
            <div className="bg-light d-flex justify-content-around align-items-center">

                <div className="bg-light d-flex justify-content-start align-items-center"
                     style={{
                         height: "70px",
                         gap: "20px",
                         fontFamily: "'Geist Mono', monospace",
                     }}>
                    <Button style={{
                        color: "#000",
                        fontSize: "15px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        padding: "5px 25px"
                    }} onClick={toggleDrawer(true)}>MENU</Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <UnderlinedText><h6 style={{margin: 0}}>Erkek</h6></UnderlinedText>
                    <UnderlinedText><h6 style={{margin: 0,}}>Kadın</h6></UnderlinedText>
                </div>

                <div>
                    <Typography sx={{
                        fontWeight: "bold",
                        letterSpacing: "0.15em",
                        textTransform:"uppercase"
                    }} variant="h5">Diggy&mia</Typography>
                </div>

                <div className="d-flex justify-content-around gap-3 align-items-center fs-5">
                    <div><TextField id="outlined-basic" size="small" color="success" label="Outlined"
                                    variant="outlined"/></div>
                    <div><BsBag/></div>
                    <div style={{
                        fontSize: "25px"
                    }}><RiAccountBoxLine/></div>
                </div>
            </div>
        </div>
    );
}

export default Header;
