import { dateDiffDays } from './DateUtils'
import { lightColors } from '@rneui/base';
export const getForegroundColorList=({ endDate, theme})=>{
    if( !endDate || endDate == '')
        return theme.colors.primary;
    let diff = dateDiffDays({ date1: new Date(endDate), date2: new Date() });
    if (diff > 30) {
        return theme.colors.primary;
    }
    if (diff < 30 && diff > 0){
        return theme.colors.warning
    }
    return theme.colors.error
}
export const getForegroundColor =( endDate )=>{
    if( !endDate || endDate == '')
        return lightColors.white;
    let diff = dateDiffDays({ date1: new Date(endDate), date2: new Date() });
    if (diff > 30) {
        return lightColors.white;
    }
    if (diff < 30 && diff > 0){
        return lightColors.warning
    }
    return lightColors.error
}
export const getIconName=( endDate )=>{
    if( !endDate || endDate == '')
        return 'shield-check-outline';
    let diff = dateDiffDays({ date1: new Date(endDate), date2: new Date() });
    if (diff > 30) {
        return 'shield-check-outline' ;
    }
    return 'calendar-clock-outline'
}