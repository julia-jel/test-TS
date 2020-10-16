import React from 'react';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import _ from 'lodash';
import classnames from 'classnames';
import styles from './styles.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const incomeModelDictionary = {
    incomePerMonth: 'Оклад за месяц',
    minimalWage: 'МРОТ',
    incomePerDay: 'Оплата за день',
    incomePerHour: 'Оплата за час'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface RadioGroupFormProps {
    incomeModel: string;
    setIncomeModel(value: string): void;
    showTooltip: boolean;
    setShowTooltip(value: boolean): void;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RadioGroupForm({incomeModel, setIncomeModel, showTooltip, setShowTooltip}: RadioGroupFormProps) {
    return <FormControl>
        <FormLabel className={styles.label}>Сумма</FormLabel>
        <RadioGroup>
            {
                _.map(incomeModelDictionary, (model: string, key: string) =>
                    <FormControlLabel key={key} className={styles.formCheck}
                        control={<Radio className={styles.customRadioInput}/>}
                        value={key} checked={incomeModel === key}
                        onChange={() => setIncomeModel(key)}
                        label={
                            <div className={styles.radioLabel}>
                                <span>{model}</span>
                                {
                                    key === 'minimalWage' && <span
                                        className={
                                            classnames(styles.tooltipIcon, {
                                                [styles.tooltipIconWithHover]: !showTooltip
                                            })
                                        }
                                        onClick={
                                            event => {
                                                event.preventDefault();
                                                setShowTooltip(!showTooltip);
                                            }
                                        }>
                                        {
                                            showTooltip ?
                                                <HighlightOffIcon style={{color: 'silver'}}/> :
                                                <InfoOutlinedIcon style={{color: 'silver'}}/>
                                        }

                                        <div className={
                                            classnames(styles.tooltip, {
                                                [styles.tooltipShow]: showTooltip
                                            })
                                        }>
                                            <div className={styles.tooltipAngle}/>
                                                МРОТ - минимальный размер оплаты труды.
                                                Разный для всех регионов.
                                        </div>
                                    </span>
                                }
                            </div>
                        }/>)
            }
        </RadioGroup>
    </FormControl>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default RadioGroupForm;
