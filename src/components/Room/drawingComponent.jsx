import React, {useEffect, useState, useRef}  from "react";
import CanvasDraw from "react-canvas-draw";
import Canvas from "./Canvas";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
/*import {socket} from "../../_utils/socket/socketManager";*/


const useStyles = makeStyles(theme => ({
    formControl: {
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Drawing(props) {
    const classes = useStyles();
    const [colour, setColour] = useState('');
    const [data, setData] = useState('');
    const [turn, setTurn] = useState(false);
    const [saveableCanvas, setSaveableCanvas] = useState('');
    const [loadableCanvas, setLoadableCanvas] = useState('');
    const [brush, setBrush] = useState(10);

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(100);
        broadcastDraw()
    }, []);

    const handleChange = event => {
        setColour(event.target.value);
    };

    const broadcastDraw = async () => {
        if (saveableCanvas) {
            await loadableCanvas.loadSaveData(saveableCanvas.getSaveData())
        }
    }

    return (
        <div className="App">
            {!turn ?
                <div>
                    <CanvasDraw
                        ref={async canvasDraw => (setSaveableCanvas(canvasDraw))}
                        loadTimeOffset={1}
                        disabled={turn}
                        brushColor={colour}
                        brushRadius={brush}
                        onMouseDown={broadcastDraw}
                        style={{
                            marginTop: 10,
                            width: '37vw',
                            height: '65vh',
                            border: '1px solid lightgrey',
                            borderRadius: 5,
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                    />
                    <div style={{marginTop: 10, margin: 10}}>
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
                                <MenuItem value={'lightgreen'}>Vert Clair</MenuItem>
                                <MenuItem value={'green'}>Vert</MenuItem>
                                <MenuItem value={'lightblue'}>Bleu Clair</MenuItem>
                                <MenuItem value={'blue'}>Bleu</MenuItem>
                                <MenuItem value={'yellow'}>Jaune</MenuItem>
                                <MenuItem value={'lightyellow'}>Jaune Clair</MenuItem>
                                <MenuItem value={'purple'}>Violet</MenuItem>
                                <MenuItem value={'lightpink'}>Rose Clair</MenuItem>
                                <MenuItem value={'pink'}>Rose</MenuItem>
                                <MenuItem value={'brown'}>Marron</MenuItem>
                                <MenuItem value={'white'}>Blanc</MenuItem>
                            </Select>
                        </FormControl>

                        <span>taille mine: {brush}</span>
                        <input type="range" min="1" max="100" placeholder={'taille mine: ' + brush} value={brush}
                               onChange={(e) => setBrush(e.target.value)}
                               className="slider" id="myRange"/>

                        <Button onClick={() => {
                            saveableCanvas.getSaveData()
                            console.log(saveableCanvas)
                        }} style={{marginRight: 10}}>Valider le dessin</Button>

                        <Button onClick={() => {
                            saveableCanvas.clear()
                        }} style={{marginRight: 10}}>Remettre a zéro</Button>
                        <Button onClick={async () => {
                            await localStorage.setItem("savedDrawing", saveableCanvas.getSaveData());
                        }}> Saved </Button>
                    </div>
                </div> : null}
            {!turn ?
                <div>
                    <CanvasDraw
                        ref={async canvasDraw => (setLoadableCanvas(canvasDraw))}
                        immediateLoading={false}
                        saveData={localStorage.getItem("savedDrawing")}
                        disabled={!turn}
                        brushColor={colour}
                        brushRadius={brush}
                        style={{
                            marginTop: 10,
                            width: '37vw',
                            height: '71.5vh',
                            border: '1px solid lightgrey',
                            borderRadius: 5,
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                    />
                    <form action="">
                        <Input type="text" placeholder={'réponse'} style={{marginRight: 10}}/>
                        <Button onClick={() => {
                            loadableCanvas.loadSaveData(saveableCanvas.getSaveData())
                        }}>Recevoir la réponse</Button>
                    </form>
                </div> : null}
        </div>
    );
}

export default Drawing
