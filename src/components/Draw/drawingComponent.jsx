import React from "react";
import CanvasDraw from "react-canvas-draw";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Drawing(props) {
    const classes = useStyles();
    const [colour, setColour] = React.useState('');
    const [data, setData] = React.useState('');
    const [turn, setTurn] = React.useState(false);
    const [saveableCanvas, setSaveableCanvas] = React.useState('');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(100);
    }, []);

    const handleChange = event => {
        setColour(event.target.value);
    };

    const handleData = event => {
        console.log(data)
    };

    return (
        <div className="App">
            {/*<h1>React-Canvas-Draw</h1>
            <h3>A simple yet powerful canvas-drawing component for React</h3>*/}
            <CanvasDraw
                ref={canvasDraw => (setSaveableCanvas(canvasDraw))}
                loadTimeOffset={10}
                disabled={turn}
                brushColor={colour}
                style={{
                    marginTop: 10,
                    width: '37vw',
                    height: '71.5vh',
                    border: '1px solid lightgrey',
                    borderRadius: 5,
                    boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                }}
            />
            <div style={{marginTop: 10, margin: 10}}>
                <Button onClick={() => {
                    saveableCanvas.getSaveData()
                    console.log(saveableCanvas)
                }}>Valider le dessin</Button>
                <Button onClick={() => {
                    saveableCanvas.clear()
                    console.log(saveableCanvas)
                }}>Remettre a zéro</Button>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Couleurs</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={colour}
                        onChange={handleChange}
                    >
                        <MenuItem value={'black'}>Noir</MenuItem>
                        <MenuItem value={'red'}>Rouge</MenuItem>
                        <MenuItem value={'green'}>Vert</MenuItem>
                        <MenuItem value={'blue'}>Bleu</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Drawing
