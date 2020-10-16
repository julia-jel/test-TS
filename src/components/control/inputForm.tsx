/* eslint-disable header/header */

import React from 'react';
import {Input} from '@material-ui/core';
import _ from 'lodash';
import styles from './styles.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface InputFormProps {
    incomeModel: string;
    amount: number;
    setAmount(value: number): void;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function InputForm({amount, setAmount, incomeModel}: InputFormProps) {
    return <form>
        <Input type='text' className={styles.formInput}
            inputProps={{className: styles.input}}
            disableUnderline
            error={!_.isFinite(amount)}
            value={amount || undefined}
            placeholder='Введите сумму' required={true}
            aria-label='Введите сумму' aria-describedby='addon1'
            onChange={event => setAmount(_.toNumber(event.target.value))}/>

        <div className={styles.inputAppend}>&#8381;</div>
        {
            incomeModel === 'incomePerDay' && <div className={styles.inputAppend}>
                &nbsp;в день
            </div>
        }
        {
            incomeModel === 'incomePerHour' && <div className={styles.inputAppend}>
                &nbsp;в час
            </div>
        }
    </form>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default InputForm;
