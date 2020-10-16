import React from 'react';
import {FormLabel} from '@material-ui/core';
import classnames from 'classnames';
import styles from './styles.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface SliderFormProps {
    withTaxes: boolean;
    setWithTaxes(value: boolean): void;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SliderForm({withTaxes, setWithTaxes}: SliderFormProps) {
    return <div className={styles.formSlider}>
        <FormLabel className={
            classnames(styles.label, {
                [styles.labelActive]: withTaxes
            })
        }>
            Указать с НДФЛ
        </FormLabel>
        <div className={
            classnames(styles.slider, {
                [styles.sliderOff]: withTaxes
            })
        } id='ndfl' onClick={() => setWithTaxes(!withTaxes)}>
            <div className={styles.sliderSwitch}/>
        </div>
        <FormLabel className={
            classnames(styles.label, {
                [styles.labelActive]: !withTaxes
            })
        }>
            Указать без НДФЛ
        </FormLabel>
    </div>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default SliderForm;
