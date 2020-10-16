import _ from 'lodash';
import moment from 'moment';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatPrice(price: number): string {
    return (_.ceil(price / 100, 2) + '').replace('.', ',');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const dateFormatString = 'DD.MM.YYYY';
const dateTimeFormatStringNoSeconds = 'DD.MM.YYYY HH:mm';
const dateTimeFormatString = 'DD.MM.YYYY HH:mm:ss';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatDate(date: string | Date | moment.Moment): string {
    if(!date) return '';
    const value = _.isString(date) ? moment(date, 'YYYY-MM-DD') : moment(date);
    return value.format(dateFormatString);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatDateTime(dateTime: string | Date | moment.Moment, {hasSeconds}: {hasSeconds?: boolean} = {}): string {
    if(!dateTime) return '';
    const value = moment(dateTime);
    return value.format(hasSeconds ? dateTimeFormatString : dateTimeFormatStringNoSeconds);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {
    formatPrice,
    formatDate,
    formatDateTime,
    dateFormatString,
    dateTimeFormatString
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////