import * as React from "react";
import $ from "jquery";
import { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Button, Card,Input, Modal, ModalClose, Sheet, Stack, Step, StepIndicator, Stepper, Typography } from "@mui/joy";
import { LevenshteinPath, levenshteinDistance } from "../../core/levenshtein-distance";


function loop<T>(i: number, callback: (i: number) => T): T[] {
    return Array.apply(null, new Array(i)).map((e: any, i: number) =>
        callback(i)
    );
}


interface HeaderProps {
    str1?: string;
    str2?: string;
    onCalculate: (firstWord: string, secondWord: string) => void;
}

function Header(props: HeaderProps) {
    const [firstWord, setFirstWord] = useState(props.str1 || '');
    const [secondWord, setSecondWord] = useState(props.str2 || '');

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            spacing={2}
        >
            <Input
                value={firstWord}
                placeholder="First word…"
                variant="outlined"
                color="primary"
                onChange={(event) => setFirstWord(event.target.value)}
            />
            <Input
                placeholder="Second word..."
                variant="outlined"
                color="success"
                value={secondWord}
                onChange={(event) => setSecondWord(event.target.value)}
            />
            <Button
                color="primary"
                onClick={() => props.onCalculate(firstWord, secondWord)}
            >
                Calculate
            </Button>
        </Stack>
    );
}

interface VisualCalculationProps {
    matrix: number[][];
    levenpath: LevenshteinPath;
    showTrivial?: boolean;
    str1: string;
    str2: string;
}

function VisualCalculation(props: VisualCalculationProps) {
    const { matrix, levenpath } = props;
    const tableRef = React.useRef<HTMLTableElement>(null);
    const resultTextRef = React.useRef<HTMLDivElement>(null);
    const [highlight, setHighlight] = useState({ i: -1, j: -1 });

    const steps = useMemo(() => {
        const { str1, str2, showTrivial, levenpath } = props;
        let l = levenpath;
        if (showTrivial) l = l.slice(1);
        else l = l.filter(x => !!x.type);
        return l.map((cur, i) => {
            let className = "";
            const fragment = (() => {
                switch (cur.type) {
                    case "replace":
                        return (
                            <span>
                                <Typography color="primary">{str1.charAt(cur.i - 1)}</Typography> with{" "}
                                <Typography color="primary">{str2.charAt(cur.j - 1)}</Typography>
                            </span>
                        );
                    case "insert":
                        return <Typography color="primary">{str2.charAt(cur.j - 1)}</Typography>;
                    case "delete":
                        return <Typography color="primary">{str1.charAt(cur.i - 1)}</Typography>;
                    default:
                        className += " grayed";
                        return (
                            <span className="grayed">
                                don't change{" "}
                                <Typography color="primary">{str1.charAt(cur.i - 1)}</Typography>
                            </span>
                        );
                }
            })();
            return (
                <Step
                    key={cur.i + "," + cur.j}
                    onMouseEnter={() => setHighlight({ i: cur.i, j: cur.j })}
                    onMouseLeave={() => setHighlight({ i: -1, j: -1 })}
                    className={`${className} steps`}
                    indicator={<StepIndicator variant={'solid'} color="primary">{i + 1}</StepIndicator>}>
                    <Typography className={'steps'}>
                        {str2.substr(0, cur.j - 1)}
                        <Typography color="success">
                            {str2[cur.j - 1]}
                        </Typography>
                        {str1.substr(cur.i)}
                        : {cur.type} {fragment} at position {" "}
                        <Typography color="primary" noWrap>
                            {cur.i}
                        </Typography>
                        .
                    </Typography>
                </Step>
            );
        });
    }, [props]);

    useEffect(() => {
        const { str1, str2 } = props;
        for (let i = 0; i <= str1.length; i++)
            for (let j = 0; j <= str2.length; j++) {
                $(getTableCell(i, j))
                    .css({ opacity: 0 })
                    .delay(Math.max(i, j) * 200)
                    .animate({ opacity: 1 }, 400);
            }
        $(resultTextRef.current!)
            .css("opacity", 0)
            .delay(
                Math.max(str1.length, str2.length) *
                200
            )
            .animate({ opacity: 1 }, 400);

    }, [props]);

    function getTableCell(i: number, j: number) {
        return tableRef
            .current!
            .tBodies[0]
            .children[i]
            .children[j + 1];
    }

    return (
        <div id="result">
            <Stack
                direction="column" spacing={2} alignItems="center">
                <table style={{ borderRadius: '10px' }} ref={tableRef}>
                    <thead>
                        <tr>
                            <th />
                            <th />
                            {props.str2
                                .split("")
                                .map((c, i) => <th key={i}>{c}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loop(props.str1.length + 1, i => (
                            <tr key={i}>
                                <th>{i > 0 ? props.str1.charAt(i - 1) : ""}</th>

                                {loop(props.str2.length + 1, j => (
                                    <td
                                        key={j}
                                        style={{ opacity: 0 }}
                                        className={
                                            (highlight.i === i && highlight.j === j ? "highlighted" : "") + " " +
                                            (levenpath.some(p => p.i === i && p.j === j) ? "onpath" : "")
                                        }
                                        onMouseEnter={evt => setHighlight({ i, j })}
                                        onMouseLeave={evt => setHighlight({ i: -1, j: -1 })}
                                    >
                                        {matrix[i][j]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Stack>
            <div ref={resultTextRef}>
                <p>
                    The Levenshtein distance is{" "}
                    <strong>{matrix[props.str1.length][props.str2.length]}</strong>:
                </p>
                <AccordionGroup
                    size="sm"
                    color="neutral"
                    variant="soft"
                >
                    <Accordion>
                        <AccordionSummary>Steps</AccordionSummary>
                        <AccordionDetails>
                            <Stepper size="sm" orientation="vertical">
                                {steps}
                            </Stepper>
                        </AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </div>
        </div >
    );
}


interface LevenshteinVisualizationProps {
    title?: ReactNode;
    firstWord?: string;
    secondWord?: string;
}

export function LevenshteinVisualization(props: LevenshteinVisualizationProps) {
    const [state, setState] = useState({
        str1: props.firstWord || "",
        str2: props.secondWord || "",
        highlight: { i: -1, j: -1 },
        showTrivial: true
    });
    const [matrix, setMatrix] = useState<number[][]>();
    const [levenshteinPath, setLevenshteinPath] = useState<LevenshteinPath>();

    useLayoutEffect(() => {
        if (state.str1 && state.str2) {
            const ret = levenshteinDistance(state.str1, state.str2);
            setLevenshteinPath(ret.levenshteinPath);
            setMatrix(ret.matrix);
        }
    }, [state.str1, state.str2]);

    function handleCalculate(firstWord: string, secondWord: string) {
        setState({ ...state, str1: firstWord, str2: secondWord });
    }

    return (
        <Card>
            <Stack
                direction="column"
                justifyContent="center"
                alignContent={'center'}
                spacing={2}
            >
                {props.title}
                <Header
                    str1={state.str1}
                    str2={state.str2}
                    onCalculate={handleCalculate}
                />
                {
                    matrix && levenshteinPath &&
                    <VisualCalculation
                        matrix={matrix}
                        levenpath={levenshteinPath}
                        showTrivial={state.showTrivial}
                        str1={state.str1}
                        str2={state.str2}
                    />
                }
            </Stack>
        </Card>
    )
}

interface LevenshteinVisualizationModalProps {
    title?: string;
    firstWord?: string;
    secondWord?: string;
    onClose?: () => void;
}

export function LevenshteinVisualizationModal(props: LevenshteinVisualizationModalProps) {

    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <Button 
                variant="plain" 
                onClick={() => setOpen(true)}>
                View
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: 'md',
                        boxShadow: 'lg',
                        overflow: 'auto',
                        minWidth: '40vw',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        {props.title || "Levenshtein Distance"}
                    </Typography>
                    <LevenshteinVisualization 
                        firstWord={props.firstWord}
                        secondWord={props.secondWord}
                    />
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}