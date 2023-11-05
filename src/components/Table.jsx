import React, { useEffect, useState } from 'react';
import "./view.css";
import d from "../assets/triage"
import { FaTrash } from 'react-icons/fa';

function Table() {
    const [filter, setFilter] = useState(0);
    const [input, setInput] = useState("")
    const [data, setData] = useState(d);
    const [tData, setTData] = useState(d);
    const [insertMode, setInsertMode] = useState(false);
    const [insertValues, setInsertValues] = useState([]);
    const triage = ["Red", "Yellow", "Green"];
    return (
        <>
            <div className='above'>
                <div className='searchbox'>
                    {filter != 0 && <div className='filter' onClick={() => { setFilter(0); setData(() => { return tData }) }}>{(filter >= 1 && filter <= 3) ? triage[filter - 1] : ""}</div>}
                    <input className='searchinput' value={input} onChange={(e) => { setInput(e.target.value) }} />
                </div>
                <button className='search' onClick={() => {
                    let d = [];
                    let inp = input;

                    if (input.toLowerCase() == "red") inp = 1;
                    if (input.toLowerCase() == "yellow") inp = 2;
                    if (input.toLowerCase() == "green") inp = 3;

                    if (inp >= 1 && inp <= 3) {
                        setFilter(inp)
                    } else {
                        setData(() => { return tData })
                        setInput("")
                        return;
                    }
                    tData.forEach((row, i) => {
                        let b = false;
                        row.forEach((cell) => {
                            if (cell == inp) {
                                b = true;
                            }
                        })
                        if (b || i === 0 || inp == 0) {
                            d.push(row)
                        }
                    })
                    setData(() => { return d });
                    setInput("")
                }}>Search</button>
                <button className='insert' onClick={() => { setInsertMode(true) }}>Insert</button>
            </div>
            {insertMode && <div className='insertblock'>
                {data[0].map((d, i) => {
                    return <div key={i}>
                        <label>{d} :</label>
                        <input value={insertValues[i]} onChange={(e) => { return [...insertValues.slice(0, i), e.target.value, ...insertValues(i + 1)] }} />
                    </div>
                })}

            </div>}
            <table>
                <thead>
                    <tr>
                        {data[0].map((d, i) => {
                            return <th key={i}>{d}</th>
                        })}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => {
                        if (i != 0) {


                            return <tr key={i}>
                                {row.map((r, j) => {
                                    return <td key={j} className={(j == 0) ? triage[r - 1] : ""}>{(j == 0) ? triage[r - 1] : r}</td>
                                })}
                                <td onClick={() => {
                                    let x = tData;
                                    x.splice(i, 1);
                                    setData(() => { return x })
                                    setTData(() => { return x })
                                }}><FaTrash /></td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;