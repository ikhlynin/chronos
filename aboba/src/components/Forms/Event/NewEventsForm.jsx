import React, { useState, useEffect } from 'react';


import clock from "../../../assets/calendar/FormEvent/clock.png"
import location from "../../../assets/calendar/FormEvent/location.png"
import remind from "../../../assets/calendar/FormEvent/remind.png"
import calendar from "../../..//assets/calendar/calendar.png"
import type1 from "../../../assets/calendar/FormEvent/task.png"
import type2 from "../../../assets/calendar/FormEvent/arrangement.png"
import type3 from "../../../assets/calendar/FormEvent/event.png"
import ArrowDown from "../../Button/Arrows/ArrowDown"

import './NewEventFormStyle.css'

const NewEventsForm = () => {
    const [startsArray, setStartsArray] = useState([]);
    const [endsArray, setEndsArray] = useState([]);

    const [typeEventImg, setTypeEventImg] = useState(type1)// константа где  меняется картинка в зависимости от типа 

    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [isDropdownShown2, setIsDropdownShown2] = useState(false);
    const [isDropdownShown3, setIsDropdownShown3] = useState(false);

    const [isSelectActive, setIsSelectActive] = useState(false);

    const [start, setStart] = useState('00:00');
    const [end, setEnd] = useState('00:00');

    const [remindValue, setRemindValue] = useState('5m');
    const remindArray = [
        '5m',
        '15m',
        '30m',
        '1h',
        '3h'
    ]

    const showDropdown = event => {
        if (!isSelectActive) {
            if (isDropdownShown)
                setIsDropdownShown(false);
            else {
                setIsDropdownShown(true);
            }
        }
    }

    const showDropdown2 = event => {
        if (!isSelectActive) {
            if (isDropdownShown2)
                setIsDropdownShown2(false);
            else {
                setIsDropdownShown2(true);
            }
        }
    }

    const showDropdown3 = event => {
        if (isDropdownShown3)
            setIsDropdownShown3(false);
        else {
            setIsDropdownShown3(true);
        }
    }

    const isSelectActiveChange = event => {
        if (isSelectActive) {
            setIsSelectActive(false);
        }
        else {
            setIsSelectActive(true);
            setStart('00:00');
            setEnd('00:00');
        }
    }

    function chooseStart(val) {
        setStart(val);

        let i = 0;
        while (startsArray[i] !== val) {
            i++;
        }
        setEnd(startsArray[i + 1]);
        setEndsArray(startsArray.slice(i + 1));
    }

    useEffect(() => {
        let array = ['00:00'],
            h1 = 0,
            h2 = 0,
            mm = '00';

        while (h1 !== 2 || h2 !== 4) {
            if (mm === '30') {
                mm = '00';
                if (h2 === 9) {
                    h2 = 0;
                    h1 += 1;
                }
                else {
                    h2 += 1;
                }
            }
            else {
                mm = '30';
            }

            array.push(`${h1}${h2}:${mm}`);
        }

        setStartsArray(array);
        setEndsArray(array);
    }, [])

    return (
        <div className='aaaa' >
            <form >
                <div className='header_esf'>
                    <button>Delete</button>
                    <button>Save</button>
                    <div className='column_ef remind_esf'>
                        <img src={remind} alt="ima" className='image_evf' />
                        <p className='fonts fonts_evs'>Remind me:</p>

                        <div className='column_ef time_box_enterval_ef' onClick={showDropdown3}>
                            <input type=" text" className='date_input_evf' value={remindValue} disabled /><ArrowDown />
                            <div className={isDropdownShown3 ? 'remind event_form_dropdown shown' : 'remind event_form_dropdown hidden'}>
                                {remindArray.map(remindItem =>
                                    <div className='event_form_time' key={remindItem} onClick={() => setRemindValue(remindItem)}><p>{remindItem}</p></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <input id="trigger" type="checkbox" />
                    <label for="trigger" class="checker"></label>
                </div>
                <h2 className='inf_esf'>INFO</h2>
                <div className='input_row_box_ef'>

                    <div className='input_box_esf'>
                        <div className='column_ef cal_and_type'>
                            <img src={calendar} alt="avatar" className='image_esf' />
                            <div className="arrow_esf column_ef">
                                <label className='lable_cal_esf'>Calendar:</label>
                                <input type=" text" className='date_input_evf' disabled /><ArrowDown />
                            </div>
                            <div className="arrow_esf column_ef">
                                <label className='lable_type_esf'>Type Event:</label>
                                <input type=" text" className='date_input_evf' disabled /><ArrowDown />
                            </div>

                        </div>
                        <div className='column_ef'>
                            <img src={typeEventImg} alt="avatar" className='image_ef' />
                            <input placeholder='Name of the event' />

                        </div>
                        <div className='column_ef'>
                            <img src={location} alt="avatar" className='image_ef' />
                            <input type="text" placeholder='Description' />
                        </div>
                        <div className='column_ef'>
                            <img src={location} alt="avatar" className='image_ef' />
                            <input type="text" placeholder='Place' />
                        </div>
                        <div className='column_ef'>
                            <img src={clock} alt="avatar" className='image_ef' />
                            <div>
                                <div className='column_ef'>
                                    <div className='column_ef data_esf'>
                                        <label htmlFor="" className='text_data_esf'>Start:</label>
                                        <input type="date" />
                                    </div>

                                    <div className='column_ef time_box_enterval_ef' onClick={showDropdown}>
                                        <input type="text" className='date_input_ef' value={start} onChange={e => setStart(e.target.value)} disabled={isSelectActive ? true : false} /><ArrowDown />
                                        <div className={isDropdownShown ? 'event_form_dropdown shown' : 'event_form_dropdown hidden'}>
                                            {startsArray.map(timeItem =>
                                                <div className='event_form_time' key={timeItem} onClick={() => chooseStart(timeItem)}><p>{timeItem}</p></div>
                                            )}
                                        </div>
                                    </div>
                                    <input type='checkbox' onChange={isSelectActiveChange} className='all_day_esf' />
                                    <p className='fonts'>All day</p>
                                </div>
                                <div className='column_ef'>
                                    <div className='column_ef data_esf'>
                                        <label htmlFor="" className='text_data_esf'>End:</label>
                                        <input type="date" />
                                    </div>

                                    <div className='column_ef time_box_enterval_ef' onClick={showDropdown2}>
                                        <input type=" text" className='date_input_ef' pattern='[0-9]{2}:[0-9]{2}' value={end} onChange={e => setEnd(e.target.value)} disabled={isSelectActive ? true : false} /><ArrowDown />
                                        <div className={isDropdownShown2 ? 'event_form_dropdown shown' : 'event_form_dropdown hidden'}>
                                            {endsArray.map(timeItem =>
                                                <div className='event_form_time' key={timeItem} onClick={() => setEnd(timeItem)}><p>{timeItem}</p></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div>
                        <p>People</p>
                        <div>
                            kfoefkekfpef<br />
                            fekfpekf<br />
                            fkpekfpf<br />
                        </div>
                        <div>
                            <button>Share an event</button>
                        </div>
                    </div>





                </div>
            </form >
        </div >
    )
}
export default NewEventsForm