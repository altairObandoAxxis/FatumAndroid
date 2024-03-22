import { View, ImageBackground } from 'react-native';
import { Icon, Text, lightColors } from '@rneui/themed'

export const CardText=( props )=>(
<Text style={{ color: 'white',fontSize: 18 }} {...props}>
    { props.children }
</Text>
)
export const CardRow=(props)=>(
<View style={{ display: 'flex', flexDirection:'row', flex: 1, justifyContent:'space-between', padding: 10}} {...props}>
    { props.children }
</View>)
export const CardContainer=(props)=>(
    <View style={{ display: 'flex', flexDirection:'column', flex: 1, justifyContent:'space-between', gap:70 }} {...props}>
        { props.children }
    </View>
)

const dateDiffDays=({ date1, date2 })=>{
    // Calcular la diferencia en milisegundos
    const diferencia_ms = date1.getTime() - date2.getTime();
    // Convertir la diferencia de milisegundos a días
    const diferencia_dias = Math.floor(diferencia_ms / (1000 * 60 * 60 * 24));
    return diferencia_dias
}

const getForegroundColor =( endDate )=>{
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
const getIconName=( endDate )=>{
    if( !endDate || endDate == '')
        return 'shield-check-outline';
    let diff = dateDiffDays({ date1: new Date(endDate), date2: new Date() });
    if (diff > 30) {
        return 'shield-check-outline' ;
    }
    return 'calendar-clock-outline'
}


export const PolicyCard =({ item })=>(
<ImageBackground 
    source={require('../assets/cardBackground.png')}
    style={{  resizeMode:'contain', width:280, height: 160 }}
    imageStyle={{ borderRadius: 6 }}>
    <CardContainer>
        <CardRow>
            <CardText> { item?.code ?? '' }</CardText> 
            <CardText> { item && <Icon 
                size={32} 
                type='material-community' 
                name={ getIconName(item.end) }
                color={ getForegroundColor(item.end) } /> 
            } </CardText> 
        </CardRow>
        <CardRow>
            <CardText> { item ? (item.currency + ' ' +Number(item.insuredSum).toLocaleString()) : '' } </CardText>
            <CardText> { item ? (item.active ? 'ACTIVE' : 'INACTIVE') : '' } </CardText>
        </CardRow>
    </CardContainer>
</ImageBackground>
)