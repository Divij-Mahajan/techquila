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
    const [age, setage] = useState(0);
    const [triage_vital_hr, settriage_vital_hr] = useState(0);
    const [triage_vital_sbp, settriage_vital_sbp] = useState(0);
    const [triage_vital_dbp, settriage_vital_dbp] = useState(0);
    const [triage_vital_rr, settriage_vital_rr] = useState(0);
    const [triage_vital_o2, settriage_vital_o2] = useState(0);
    const [triage_vital_temp, settriage_vital_temp] = useState(0);





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
                <button className='insert' onClick={() => {
                    if (insertMode == false) {
                        setInsertMode(true);
                    } else {
                        let result = [age,
                            triage_vital_hr,
                            triage_vital_sbp,
                            triage_vital_dbp,
                            triage_vital_rr,
                            triage_vital_o2,
                            triage_vital_temp]
                        let esi = 1;
                        //result can be pushed
                        setTData(() => { return [...tData, [esi, ...result]] })
                        setData(() => { return tData })
                        setFilter(0)
                        setInsertMode(false);
                    }

                }}>Insert</button>
            </div>
            {insertMode && <div className='insertblock'>
                <div >
                    <div><label>age :</label>
                        <input value={age} onChange={(e) => { setage(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_hr :</label>
                        <input value={triage_vital_hr} onChange={(e) => { settriage_vital_hr(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_sbp :</label>
                        <input value={triage_vital_sbp} onChange={(e) => { settriage_vital_sbp(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_dbp :</label>
                        <input value={triage_vital_dbp} onChange={(e) => { settriage_vital_dbp(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_rr :</label>
                        <input value={triage_vital_rr} onChange={(e) => { settriage_vital_rr(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_o2 :</label>
                        <input value={triage_vital_o2} onChange={(e) => { settriage_vital_o2(e.target.value) }} />
                    </div>
                    <div><label>triage_vital_temp :</label>
                        <input value={triage_vital_temp} onChange={(e) => { settriage_vital_temp(e.target.value) }} />
                    </div>
                </div>


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