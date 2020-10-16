import React, {useState} from 'react';
import _ from 'lodash';
import {Box} from '@material-ui/core';
import RadioGroupForm from './radioGroupForm';
import SliderForm from './sliderForm';
import InputForm from './inputForm';
import styles from './styles.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatNumber(number: number) {
    const str = number + '';
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Control() {
    const [withTaxes, setWithTaxes] = useState(false);
    const [incomeModel, setIncomeModel] = useState('incomePerMonth');
    const [amount, setAmount] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    const netto = formatNumber(_.floor(withTaxes ? amount * 0.87 : amount));
    const ndfl = formatNumber(_.floor(withTaxes ? amount * 0.13 : amount * 0.13 / 0.87));
    const brutto = formatNumber(_.floor(withTaxes ? amount : amount / 0.87));

    return <Box className={styles.control}>
        <div>
            <RadioGroupForm incomeModel={incomeModel} setIncomeModel={setIncomeModel}
                showTooltip={showTooltip} setShowTooltip={setShowTooltip}/>

            <SliderForm withTaxes={withTaxes} setWithTaxes={setWithTaxes}/>

            <InputForm amount={amount} setAmount={setAmount} incomeModel={incomeModel}/>
        </div>

        {
            incomeModel === 'incomePerMonth' && amount > 0 && <div className={styles.infoPanel}>
                <div>
                    <b>{netto + ' '}&#8381;</b> сотрудник будет получать на руки
                </div>
                <div>
                    <b>{ndfl + ' '}&#8381;</b> НДФЛ, 13% от оклада
                </div>
                <div>
                    <b>{brutto + ' '}&#8381;</b> за сотрудника в месяц
                </div>
            </div>
        }
    </Box>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default Control;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
