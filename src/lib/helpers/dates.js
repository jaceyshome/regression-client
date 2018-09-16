import moment from 'moment';
import _ from 'lodash';
import DataService from "../../components/service/data-service";

/**
 *
 * The main purpose for this Dates class is to make sure the corporate website has the standard date format across the whole site.
 *
 * TODO mocha Test
 */
class Dates {

    static getDateUTCFormat(candidate) {
        return moment.utc(candidate)._f;
    }

    /**
     * Get current year
     * return {number} - current year, e.g. 2017
     */
    static getCurrentYear() {
        return new Date().getFullYear();
    }


    /**
     * Get in a day, e.g. 10am, 5pm
     * @param candidate {Date} - date
     * @returns {string} hour in a day, e.g. 10am, 5pm
     */
    static getHour(candidate) {
        if(_.includes(this.getDateUTCFormat(candidate), 'HH') ) {
            return moment(candidate).format('ha');
        } else {
            return '';
        }
    }

    /**
     * Get in a day, e.g. 10:45am, 5:32pm
     * Note: 9:00am will be 9am
     * @param candidate {Date} - date
     * @returns {string} minute in a day, e.g. 10am, 5pm
     */
    static getHourMinute(candidate) {
        if(_.includes(this.getDateUTCFormat(candidate), 'HH:mm')) {
            return moment(candidate).format('h.mma').replace('.00', '');
        } else {
            return '';
        }
    }

    /**
     * Get corporate website standard date, e.g. 14 November 2016, time format will be YYYY-MM-DDTHH:mm:ss
     * @param candidate {Date} - date
     * @returns {string} - date string e.g. 12 November 2016
     */
    static getDate(candidate) {
        return `${moment(candidate).format('D')} ${moment(candidate).format('MMMM')} ${moment(candidate).format('YYYY')}` ;
    }

    static getDateTime(candidate) {
        let date = Dates.getDate(candidate);
        let hours = Dates.getHourMinute(candidate);
        return `${hours}, ${date}`;
    }

    /**
     * Get hour and date
     * @param candidate {Date} - date
     * @returns {string} - date string e.g. 10am, 14 November 2016
     */
    static getHourAndDate(candidate) {
        if( _.isEmpty(this.getHour(candidate)) ){
            return this.getDate(candidate);
        }
        return `${this.getHour(candidate)}, ${this.getDate(candidate)}`;
    }

    /**
     * Get hour, minutes and date
     * @param candidate {Date} - date
     * @returns {string} - date string e.g. 10:45am, 14 November 2016
     */
    static getHourMinuteAndDate(candidate) {
        if( _.isEmpty(this.getHour(candidate)) ){
            return this.getDate(candidate);
        }
        return `${this.getHourMinute(candidate)}, ${this.getDate(candidate)}`;
    }
}

export {Dates};
