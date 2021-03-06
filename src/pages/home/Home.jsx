import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {CreateRoomGame} from '../../_utils/api/queries';
import apiVar from '../../_utils/api/apiVar';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {store} from "react-notifications-component";

export default function Album(props) {
    const classes = useStyles();
    const [name, setRoomName] = useState("")
    const [goRoom, setGoRoom] = useState(false)
    const [user, changeUser] = useState({})
    const [goPlay, changeGoPlay] = useState(false)
    const [dataSocket, setDataSocket] = useState({})
    const [allRooms, setAllRooms] = useState([]);
    const [Rooms, setRooms] = useState({})
    const [first, setFirst] = useState(true)

    useEffect(() => {
        getRooms();
    }, [first])

    const getRooms = async () => {
        await axios.get(apiVar.rooms).then(res => {
            setAllRooms([...allRooms, res.data])
        })
    };

    const isLogged = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            changeUser(JSON.parse(localStorage.getItem('user')))
        } else {
            changeUser(false)
        }
    }

    const redirectTo = (url, data) => {
        return (
            <Redirect push to={{
                pathname: url,
                state: data
            }}/>
        )
    }

    const sendNewRoom = async (name) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            await axios.get(apiVar.rooms).then(res => {
                let room = res.data.find(room => room.Name === name)
                console.log(room)
                if (room) {
                    store.addNotification({
                        title: "Nom du salon deja pris!",
                        message: "Veuillez changer le nom",
                        type: "warning",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                } else {
                    CreateRoomGame(apiVar.createRoom, {
                        Admin: apiVar.user.name,
                        Name: name,
                    }).then(res => {
                        goToRoom(name)
                    }).catch(error => {
                        throw new Error(error)
                    })
                }
            })
        } else {
            props.history.push('/connexion')
        }
    };

    const goToRoom = (id) => {
        if (apiVar.user) {
            localStorage.setItem('roomName', id)
            props.history.push('/salon/' + id + '/' + apiVar.user.name)
        } else {
            props.history.push('/connexion')
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            {/* Hero unit */}
            <div className="container" style={{display: 'flex', flexDirection: 'row'}}>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Créer votre Salon
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Jouer avec vos amis
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Roomname"
                                    label="Room Name"
                                    name="roomname"
                                    autoComplete="Roomname"
                                    autoFocus
                                    onChange={e => setRoomName(e.target.value)}
                                />
                                <Grid item>
                                    <Button onClick={() => sendNewRoom(name)} variant="contained" color="primary">
                                        Creer une nouvel Partie
                                    </Button>
                                </Grid>

                            </Grid>
                        </div>
                    </Container>
                </div>

                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Rejoindre un ami
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Rejoindre une partie accessible
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Roomname"
                                    label=" Room Name "
                                    name="roomname"
                                    autoComplete="Roomname"
                                    autoFocus
                                    onChange={e => setRoomName(e.target.value)}
                                />
                                <Grid item>
                                    <Button onClick={sendNewRoom} variant="contained" color="primary">
                                        Rejoindre le salon
                                    </Button>
                                </Grid>

                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {console.log(allRooms)}
                    {allRooms ?
                        allRooms.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title={"Image title "}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.Name} {card.Admin}
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => goToRoom(card.Name)}>
                                            Rejoindre
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )) : null}
                </Grid>
            </Container>
        </React.Fragment>
    );
}


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        marginTop: 20,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
