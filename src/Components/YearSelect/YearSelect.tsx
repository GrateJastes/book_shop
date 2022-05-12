import './YearSelect.scss';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/DateRangePicker';
import cfg from '../../config';

export interface YearSelectProps {
    onChange: (value: DateRange) => void;
}

export function YearSelect(props: YearSelectProps) {
    return (
        <DateRangePicker
            className="year-select"
            onOk={(value) => props.onChange(value)}
        />
    );
}
